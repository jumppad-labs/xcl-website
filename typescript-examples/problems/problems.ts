// Lists every problem a validation finds.
import { Config, ConfigError } from "xcl-lang";

await using config = new Config();

// #region show
try {
  await config.validate("./config");
} catch (err) {
  if (!(err instanceof ConfigError)) {
    throw err;
  }
  for (const problem of err.problems) {
    console.log(problem.file, problem.line, problem.entity, problem.field, problem.summary);
  }
}
// #endregion
