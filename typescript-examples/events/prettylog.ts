import { Config, EventDataLevel, prettylog } from "xcl-lang";

await using config = new Config({
  onEvent: prettylog.handler({ out: process.stderr, level: prettylog.levelFromEnv() }),
  eventData: EventDataLevel.Processed,
});
