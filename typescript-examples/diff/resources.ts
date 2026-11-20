// Reads every entity and change in a diff.
import { Config } from "xcl-lang";

await using config = new Config({ statePath: ".xcl" });
const d = await config.diff("./config");

// #region show
for (const resource of d.resources) {
  console.log(resource.address, resource.action);

  for (const change of resource.changes) {
    console.log("  ", change.path, change.before, change.after);
  }
}
// #endregion
