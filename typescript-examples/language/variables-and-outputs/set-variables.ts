// Setting a variable from the application when the Config is created.
import { Attribute, Config, Entity, Label, LocalRegistry } from "xcl-lang";

@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;
}

// #region show
const local = new LocalRegistry();
local.register(App);

await using config = new Config({ registries: [local], variables: { region: "us" } });
await config.apply("./config");
// #endregion
