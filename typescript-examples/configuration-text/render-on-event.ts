// Box: rendering each entity beneath its create success event, while the
// apply is still running.
import { Config, EventDataLevel, LocalRegistry, type Event } from "xcl-lang";

import { PostgreSQL } from "./database.js";

// #region show
async function onEvent(event: Event): Promise<void> {
  if (event.operation === "create" && event.phase === "success" && event.data !== undefined) {
    console.log(await config.encodeSavedEntity(event.data, { includeComputed: true }));
  }
}
// #endregion

const local = new LocalRegistry();
local.register(PostgreSQL);

await using config = new Config({
  registries: [local],
  statePath: ".xcl",
  eventData: EventDataLevel.Processed,
  onEvent,
});

await config.apply("main.xcl");
