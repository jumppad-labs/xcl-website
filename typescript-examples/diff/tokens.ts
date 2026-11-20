// Writes a diff's labelled text in a format of its own.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });
const d = await config.diff("./config");

// #region show
import { Kind, cssClassOf, parentOf } from "xcl-lang";

for (const token of d.tokens) {
  if (parentOf(token.kind) === Kind.Diff) {
    process.stdout.write(`[${cssClassOf(token.kind)}]${token.text}[/]`);
  } else {
    process.stdout.write(token.text);
  }
}
// #endregion
