// A function of the application's own, registered beside its types.
import { Attribute, Config, Entity, Func, Label, LocalRegistry } from "xcl-lang";

@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Attribute(String)
  slug = "";
}

// #region show
class Functions {
  @Func([String], String)
  slugify(title: string): string {
    return title.toLowerCase().replaceAll(" ", "-");
  }
}

const local = new LocalRegistry();
local.register(App);
local.registerFunctions(new Functions());

await using config = new Config({ registries: [local] });
// #endregion

await config.apply("main.xcl");
