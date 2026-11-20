// An object value: an attribute whose type is a class, written with = and braces.
import { Attribute, Entity, Int, Label, LocalRegistry } from "xcl-lang";

// #region show
class Endpoint {
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

  @Attribute(() => Endpoint, { optional: true })
  defaultEndpoint?: Endpoint;
}
// #endregion

const local = new LocalRegistry();
local.register(App);
