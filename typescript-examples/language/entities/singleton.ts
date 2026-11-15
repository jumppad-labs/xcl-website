// A singleton: a type with no label field and no metadata field.
import { Attribute, Entity, LocalRegistry } from "xcl-lang";

const local = new LocalRegistry();

// #region show
@Entity("runner")
class Runner {
  @Attribute(String)
  server!: string;

  @Attribute(String)
  listen = "";
}

local.register(Runner); // runner {}
// #endregion
