// Box: writing a stylesheet for the HTML format's classes from a theme.
// #region show
import { writeFileSync } from "node:fs";

import { css, defaultTheme } from "xcl-lang";

writeFileSync("xcl.css", css(defaultTheme));
// #endregion
