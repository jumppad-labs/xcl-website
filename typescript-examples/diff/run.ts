// Runs a diff and prints it, unless nothing would change.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });

// #region show
import { printDiff } from "xcl-lang";

const d = await config.diff("./config");

if (d.changed() === 0) {
  console.log("nothing to do");
} else {
  printDiff(d);
}
// #endregion
