// A sensitive value read back through a lookup.
import { Config, Entity, LocalRegistry, Meta, Sensitive } from "xcl-lang";

@Entity("secret")
class Secret {
  @Meta()
  meta!: Meta;

  @Sensitive({ map: String })
  data!: Sensitive<Record<string, string>>;
}

const local = new LocalRegistry();
local.register(Secret);

await using config = new Config({ registries: [local], statePath: ".xcl" });
await config.apply("./config");

// #region show
// A Sensitive read back through a lookup holds no value: it prints as the
// marker, and reveal() returns undefined.
const found = await config.find(Secret, "secret.db");

console.log(found.data);            // (sensitive)
console.log(found.data.reveal());   // undefined
console.log(found.data.isRedacted); // true
// #endregion
