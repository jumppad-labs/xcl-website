// Prints a report with its detail wrapped at 40 columns.
import { Config, printError } from "xcl-lang";

await using config = new Config();

try {
  await config.validate("./config");
} catch (err) {
  // #region show
  printError(err, { width: 40 });
  // #endregion
}
