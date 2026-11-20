// Named blocks, collected by their name.
import { Attribute, Entity, Int, Label, LocalRegistry, NamedBlocks } from "xcl-lang";

// #region show
class Listener {
  @Label()
  name = "";

  @Attribute(Int)
  port!: number;

  @Attribute(Boolean)
  tls = false;
}

@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @NamedBlocks(() => Listener)
  listener: Record<string, Listener> = {};
}
// #endregion

const local = new LocalRegistry();
local.register(App);
