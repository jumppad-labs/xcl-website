// A diff holding the values of sensitive changes.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });

// #region show
const d = await config.diff("./config", { revealSensitive: true });
// #endregion

console.log(d.changed());
