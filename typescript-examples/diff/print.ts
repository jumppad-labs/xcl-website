// Prints a diff as plain text.
import { Config, printDiff } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });
const d = await config.diff("./config");

// #region show
printDiff(d);
// #endregion
