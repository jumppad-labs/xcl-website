// Box: checking a theme for words its styles do not understand.
// #region show
import { defaultTheme, InvalidStyleError, Kind, validateTheme } from "xcl-lang";

const theme = { ...defaultTheme, [Kind.Attribute]: "bold orang" };

try {
  validateTheme(theme);
} catch (err) {
  if (!(err instanceof InvalidStyleError)) {
    throw err;
  }
  console.warn(err.message);
}
// #endregion
