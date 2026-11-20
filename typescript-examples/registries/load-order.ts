import { Attribute, Config, Entity, LocalRegistry } from "xcl-lang";

@Entity("settings")
class Settings {
  @Attribute(String)
  region = "eu-west-1";
}

// #region show
const builtin = new LocalRegistry();
builtin.registerExternalPlugin("./bin/xcl-plugin-template"); // plugins are external binaries from TypeScript
builtin.register(Settings);

const user = new LocalRegistry();
user.registerPluginDirectory("~/.xcl/plugins");

await using config = new Config({ registries: [builtin, user] }); // builtin is read and loaded first, then user
// #endregion
