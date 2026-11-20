// A list of blocks, each of which may carry a name.
import { Attribute, Blocks, Entity, Label, LocalRegistry } from "xcl-lang";

// #region show
class Volume {
  @Label()
  name = "";

  @Attribute(String)
  source!: string;
}

@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Blocks(() => Volume)
  volume: Volume[] = [];
}
// #endregion

const local = new LocalRegistry();
local.register(App);
