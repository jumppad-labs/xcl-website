// Box: an entity's configuration text as labelled text, given to a format
// directly.
import { defaultTheme, styleFor, type Formatter } from "xcl-lang";

import { config, db } from "./setup.js";

// the format the "Writing a format" box writes
const bbcode: Formatter = (out, theme, tokens) => {
  for (const token of tokens) {
    const style = styleFor(theme, token.kind);

    let text = token.text;
    if (style.bold) {
      text = "[b]" + text + "[/b]";
    }
    if (style.italic) {
      text = "[i]" + text + "[/i]";
    }
    if (style.foreground !== "") {
      text = "[color=" + style.foreground + "]" + text + "[/color]";
    }

    out.write(text);
  }
};

// #region show
const tokens = await config.entityTokens(db, { includeComputed: true });

bbcode(process.stdout, defaultTheme, tokens);
// #endregion

await config.close();
