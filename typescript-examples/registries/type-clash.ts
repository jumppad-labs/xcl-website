import { Attribute, Config, Entity, LocalRegistry, TypeNameClashError } from "xcl-lang";

@Entity("settings")
class Settings {
  @Attribute(String)
  region = "eu-west-1";
}

@Entity("settings")
class SharedSettings {
  @Attribute(String)
  owner = "";
}

const local = new LocalRegistry();
local.register(Settings);

const shared = new LocalRegistry();
shared.register(SharedSettings);

// #region show
await using config = new Config({ registries: [local, shared] });

try {
  await config.setup();
} catch (err) {
  if (err instanceof TypeNameClashError) {
    console.log(err.message);
  }
}
// #endregion
