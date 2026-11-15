// A handler of your own, collecting the error of every failed step.
import { Config, type Event, type XclError } from "xcl-lang";

// #region show
const failures: XclError[] = [];

function handler(event: Event): void {
  if (event.phase === "error" && event.error !== undefined) {
    failures.push(event.error);
  }
}

await using config = new Config({ onEvent: handler });
// #endregion

await config.apply("main.xcl");
console.log(failures.length);
