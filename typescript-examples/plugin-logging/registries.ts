// Registers an external plugin binary and a plugin directory.
import { Config, LocalRegistry } from "xcl-lang";

// #region show
// an in-process plugin has no TypeScript form: TypeScript loads Go plugins as external binaries
const local = new LocalRegistry();
local.registerExternalPlugin("./bin/xcl-plugin-x"); // an external plugin binary
local.registerPluginDirectory("~/.xcl/plugins");    // a directory to search

await using config = new Config({ registries: [local] });
// #endregion

await config.apply("main.xcl");
