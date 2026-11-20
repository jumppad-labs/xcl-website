// The app type this page builds, every kind of field in one class.
import {
  Attribute,
  Block,
  Blocks,
  Computed,
  Entity,
  Int,
  Label,
  LocalRegistry,
  NamedBlocks,
  Sensitive,
} from "xcl-lang";

class Health {
  @Attribute(String)
  path!: string;

  @Attribute(Int)
  interval = 10;
}

class Volume {
  @Label()
  name = "";

  @Attribute(String)
  source!: string;
}

class Listener {
  @Label()
  name = "";

  @Attribute(Int)
  port!: number;

  @Attribute(Boolean)
  tls = false;
}

class Endpoint {
  @Attribute(Int)
  port!: number;

  @Attribute(Boolean)
  tls = false;
}

// #region show
@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Attribute(Int)
  replicas = 2;

  @Block(() => Health, { optional: true })
  health?: Health;

  @Blocks(() => Volume)
  volume: Volume[] = [];

  @NamedBlocks(() => Listener)
  listener: Record<string, Listener> = {};

  @Attribute({ map: String })
  labels: Record<string, string> = {};

  @Attribute(() => Endpoint, { optional: true })
  defaultEndpoint?: Endpoint;

  @Computed(String)
  endpoint?: string;

  @Sensitive(String, { optional: true })
  token?: Sensitive<string>;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
