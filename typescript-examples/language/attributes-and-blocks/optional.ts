// An optional attribute: the initializer is the value an omitted attribute gets.
import { Attribute, Entity, Int, Label, LocalRegistry } from "xcl-lang";

// #region show
@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Attribute(Int)
  replicas = 2;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
