// Prints any xcl error for the person who wrote the configuration.
import { Config } from "xcl-lang";

await using config = new Config();

// #region show
import { XclError, printError } from "xcl-lang";

try {
  await config.validate("./config");
} catch (err) {
  if (!(err instanceof XclError)) {
    throw err;
  }
  printError(err);
  process.exitCode = 1;
}
// #endregion
