// A sensitive field: printed as (sensitive), read with reveal().
import { Attribute, Entity, Label, LocalRegistry, Sensitive } from "xcl-lang";

// #region show
@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Sensitive(String, { optional: true })
  token?: Sensitive<string>;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
