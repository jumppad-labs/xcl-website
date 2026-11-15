// A map attribute: a flat set of keys, each holding a plain value.
import { Attribute, Entity, Label, LocalRegistry } from "xcl-lang";

// #region show
@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Attribute({ map: String })
  labels: Record<string, string> = {};
}
// #endregion

const local = new LocalRegistry();
local.register(App);
