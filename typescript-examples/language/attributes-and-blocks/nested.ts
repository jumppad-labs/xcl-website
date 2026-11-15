// A nested block: a plain class named by @Block, optional with { optional: true }.
import { Attribute, Block, Entity, Int, Label, LocalRegistry } from "xcl-lang";

// #region show
class Health {
  @Attribute(String)
  path!: string;

  @Attribute(Int)
  interval = 10;
}

@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Block(() => Health, { optional: true })
  health?: Health;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
