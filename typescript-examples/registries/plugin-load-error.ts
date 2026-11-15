import { Config, LocalRegistry, PluginLoadError } from "xcl-lang";

const local = new LocalRegistry();
local.registerExternalPlugin("./bin/xcl-plugin-docker");

await using config = new Config({ registries: [local] });

// #region show
try {
  await config.apply("./config");
} catch (err) {
  if (err instanceof PluginLoadError) {
    console.log(err.message);
  }
}
// #endregion
