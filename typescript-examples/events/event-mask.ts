// Event data with every sensitive value replaced by its keyed hash.
import { Config, EventDataLevel, mask, type Event } from "xcl-lang";

const correlationKey = Buffer.from(process.env.XCL_CORRELATION_KEY ?? "", "base64");

function handler(event: Event): void {
  console.log(event.operation, event.phase);
}

// #region show
const eventMask = mask.hmacSha256(correlationKey);

await using config = new Config({
  onEvent: handler,
  eventData: EventDataLevel.Processed,
  eventMask,
});
// #endregion

await config.apply("main.xcl");
