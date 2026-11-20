// Registers the template plugin as a separate program.
import { Config, LocalRegistry } from "xcl-lang";

// #region show
// in-process registration has no TypeScript form: TypeScript loads Go plugins as separate programs
const local = new LocalRegistry();
local.registerExternalPlugin("./build/xcl-plugin-template-go"); // a separate program
// #endregion

await using config = new Config({ registries: [local] });
await config.apply("./examples/basic");
