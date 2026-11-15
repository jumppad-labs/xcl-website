// A required attribute: a field with no initializer.
import { Attribute, Entity, Label, LocalRegistry } from "xcl-lang";

// #region show
@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
