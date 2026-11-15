// Box: the entity an event carries, encoded once the operation has finished.
import { Config, EventDataLevel, LocalRegistry, type Event } from "xcl-lang";

import { PostgreSQL } from "./database.js";

const local = new LocalRegistry();
local.register(PostgreSQL);

const created: Event[] = [];

await using config = new Config({
  registries: [local],
  statePath: ".xcl",
  eventData: EventDataLevel.Processed,
  onEvent: (event) => {
    if (event.operation === "create" && event.phase === "success") {
      created.push(event);
    }
  },
});

await config.apply("main.xcl");

for (const event of created) {
  // #region show
  const entity = event.entity();
  if (entity === undefined) {
    continue;
  }

  const text = await config.encodeEntity(entity);
  // #endregion

  console.log(text);
}
