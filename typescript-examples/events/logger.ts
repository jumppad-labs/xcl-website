// Sends every event to a logger with debug, info, warn and error methods.
import { Config, events } from "xcl-lang";

// #region show
// the console takes the message first, as winston does
await using config = new Config({ onEvent: events.toLogger(console, { order: "message-first" }) });
// #endregion

await config.apply("main.xcl");
