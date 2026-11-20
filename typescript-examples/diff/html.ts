// Writes a stylesheet, and a diff as HTML for a page.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });
const d = await config.diff("./config");

// #region show
import { writeFileSync } from "node:fs";

import { css, defaultTheme, html, printDiff } from "xcl-lang";

writeFileSync("static/xcl.css", css(defaultTheme));

let summary = "";
printDiff(d, {
  out: {
    write(chunk: string) {
      summary += chunk;
    },
  },
  formatter: html,
});
// #endregion

console.log(summary.length);
