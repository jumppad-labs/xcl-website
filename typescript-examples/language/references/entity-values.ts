// A whole entity as a value: a field typed as the referenced entity's class.
import { Attribute, Entity, Int, Label, LocalRegistry, Meta } from "xcl-lang";

// #region show
@Entity("database", "postgres")
class PostgreSQL {
  @Meta()
  meta!: Meta;

  @Attribute(String)
  location!: string;

  @Attribute(Int)
  port = 5432;
}

@Entity("app")
class App {
  @Label()
  name!: string;

  @Attribute(String)
  image!: string;

  @Attribute(() => PostgreSQL)
  database!: PostgreSQL;

  @Attribute([() => PostgreSQL])
  databases: PostgreSQL[] = [];
}
// #endregion

const local = new LocalRegistry();
local.register(PostgreSQL);
local.register(App);
