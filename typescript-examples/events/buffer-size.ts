// A larger buffer of undelivered events.
import { Config, type Event } from "xcl-lang";

function handler(event: Event): void {
  console.log(event.operation, event.phase);
}

// #region show
await using config = new Config({
  onEvent: handler,
  // hold more undelivered events before emitting waits
  eventBufferSize: 4096,
});
// #endregion

await config.apply("main.xcl");
