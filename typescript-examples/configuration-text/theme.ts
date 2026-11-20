// Box: a copy of the default theme with some kinds styled differently.
import { config, db } from "./setup.js";
// #region show
import { defaultTheme, Kind, terminal } from "xcl-lang";

const theme = {
  ...defaultTheme,
  [Kind.Attribute]: "#ff8800",
  [Kind.Comment]: "italic #6a9955",
  [Kind.String]: "bright-green bg:#202020",
};

await config.printEntity(db, { formatter: terminal, theme });
// #endregion

await config.close();
