// Types that share fields: a base class holding them, subclassed by each type.
import { Attribute, Entity, Int, Label, LocalRegistry, NamedBlocks } from "xcl-lang";

class Listener {
  @Label()
  name = "";

  @Attribute(Int)
  port!: number;

  @Attribute(Boolean)
  tls = false;
}

const local = new LocalRegistry();

// #region show
class Workload {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Attribute(Int)
  replicas = 2;
}

@Entity("app")
class App extends Workload {
  @NamedBlocks(() => Listener)
  listener: Record<string, Listener> = {};
}

@Entity("job")
class Job extends Workload {
  @Attribute(String)
  schedule!: string;
}

local.register(App);
local.register(Job);
// #endregion
