// Box: writing a format of your own, BBCode for a forum post.
import { config, db } from "./setup.js";
// #region show
import { styleFor, type Formatter } from "xcl-lang";

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

await config.printEntity(db, { formatter: bbcode });
// #endregion

await config.close();
