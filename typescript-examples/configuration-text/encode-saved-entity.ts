// Box: converting the saved record an event carries into configuration text.
import { Config, EventDataLevel, LocalRegistry, type Event } from "xcl-lang";

import { PostgreSQL } from "./database.js";

async function onEvent(event: Event): Promise<void> {
  if (event.data === undefined) {
    return;
  }

  // #region show
  const text = await config.encodeSavedEntity(event.data);
  // #endregion

  console.log(text);
}

const local = new LocalRegistry();
local.register(PostgreSQL);

await using config = new Config({
  registries: [local],
  statePath: ".xcl",
  eventData: EventDataLevel.Processed,
  onEvent,
});

await config.apply("main.xcl");
