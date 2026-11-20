// Explains a plugin that fails to load.
import { Config, LocalRegistry, PluginLoadError } from "xcl-lang";

const local = new LocalRegistry();
local.registerExternalPlugin("./build/missing");

await using config = new Config({ registries: [local] });
const path = "./config/full";

// #region show
try {
  await config.apply(path);
} catch (err) {
  if (!(err instanceof PluginLoadError)) {
    throw err;
  }
  console.error(`${err.message}, build it with \`make build\` in example/plugin`);
  process.exitCode = 1;
}
// #endregion
