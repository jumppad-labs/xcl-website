// Prints a diff in colour when standard output is a terminal.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });
const d = await config.diff("./config");

// #region show
import { forStream, printDiff } from "xcl-lang";

printDiff(d, { formatter: forStream(process.stdout) });
// #endregion
