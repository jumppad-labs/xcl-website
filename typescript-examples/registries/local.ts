import { Attribute, Config, Entity, LocalRegistry, Meta } from "xcl-lang";

@Entity("deployment")
class Deployment {
  @Meta()
  meta!: Meta;

  @Attribute(String)
  image!: string;
}

// #region show
const local = new LocalRegistry();
local.register(Deployment);                                // a decorated TypeScript class
local.registerExternalPlugin("./bin/xcl-plugin-docker");  // an external plugin binary
local.registerPluginDirectory("~/.xcl/plugins");          // a directory to search

await using config = new Config({ registries: [local], statePath: "./.xcl" });
// #endregion
