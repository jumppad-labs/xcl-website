// Prints a diff with the default theme's diff colours restyled.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });
const d = await config.diff("./config");

// #region show
import { Kind, defaultTheme, printDiff, terminal } from "xcl-lang";

const theme = {
  ...defaultTheme,
  [Kind.Inserted]: "bold green",
  [Kind.Deleted]: "bold red",
};

printDiff(d, { formatter: terminal, theme });
// #endregion
