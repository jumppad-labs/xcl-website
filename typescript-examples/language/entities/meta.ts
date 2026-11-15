// The field that receives an entity's metadata.
import { Attribute, Entity, LocalRegistry, Meta } from "xcl-lang";

// #region show
@Entity("app")
class App {
  @Attribute(String)
  image!: string;

  // id, the entity's address, name, type, subtype, module, file, line,
  // column, and disabled and dependsOn, set in configuration on any block
  @Meta()
  meta!: Meta;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
