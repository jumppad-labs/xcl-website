// The pretty logger as every example sets it up.
import { Config, prettylog } from "xcl-lang";

// #region show
await using config = new Config({
  onEvent: prettylog.handler({ out: process.stderr, level: prettylog.levelFromEnv() }),
});
// #endregion

await config.apply("main.xcl");
