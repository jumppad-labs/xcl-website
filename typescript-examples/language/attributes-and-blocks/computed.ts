// A computed field: set by the provider, never in configuration.
import { Attribute, Computed, Entity, Label, LocalRegistry } from "xcl-lang";

// #region show
@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Computed(String)
  endpoint?: string;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
