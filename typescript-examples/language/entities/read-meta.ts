// Reading an entity's metadata back after a lookup.
import { Attribute, Config, Entity, LocalRegistry, Meta } from "xcl-lang";

@Entity("app")
class App {
  @Attribute(String)
  image!: string;

  @Meta()
  meta!: Meta;
}

const local = new LocalRegistry();
local.register(App);

await using config = new Config({ registries: [local] });
await config.apply("main.xcl");

// #region show
const app = await config.find(App, "app.web");

console.log(app.meta.id, app.meta.file, app.meta.line);
console.log(app.meta.dependsOn, app.meta.disabled);
// #endregion
