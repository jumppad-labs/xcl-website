// Prints a report in colour when standard error is a terminal.
import { Config } from "xcl-lang";

await using config = new Config();

let err: unknown;
try {
  await config.validate("./config");
} catch (error) {
  err = error;
}

// #region show
import { forStream, printError } from "xcl-lang";

printError(err, { formatter: forStream(process.stderr) });
// #endregion
