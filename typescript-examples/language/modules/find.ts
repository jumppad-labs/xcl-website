// Finding an entity declared inside a module, by its full address.
import { Attribute, Config, Entity, Int, LocalRegistry, Meta } from "xcl-lang";

@Entity("database", "postgres")
class PostgreSQL {
  @Attribute(String)
  location!: string;

  @Attribute(Int)
  port = 5432;

  @Meta()
  meta!: Meta;
}

const local = new LocalRegistry();
local.register(PostgreSQL);

await using config = new Config({ registries: [local] });
await config.apply("./config");

// #region show
const db = await config.find(PostgreSQL, "module.db.database.postgres.main");
console.log(db.location);
// #endregion
