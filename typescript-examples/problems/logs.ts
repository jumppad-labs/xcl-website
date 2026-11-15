// Logs a configuration error with the console, which shows its report.
import { Config, ConfigError } from "xcl-lang";

await using config = new Config();

// #region show
try {
  await config.validate("./config");
} catch (err) {
  if (!(err instanceof ConfigError)) {
    throw err;
  }
  console.error("validating configuration:", err);
}
// #endregion
