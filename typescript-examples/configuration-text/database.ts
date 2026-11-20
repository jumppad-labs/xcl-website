// The entity types the configuration text page's examples share: the
// `database "postgres"` block its text shows and the `app` block whose
// references it shows as written.
import { Attribute, Block, Computed, Entity, Int, Meta, Sensitive } from "xcl-lang";

export class Timeouts {
  @Attribute(Int)
  connection = 10;

  @Attribute(Int)
  keepAlive = 60;
}

@Entity("database", "postgres")
export class PostgreSQL {
  @Meta()
  meta!: Meta;

  @Attribute(String)
  location!: string;

  @Attribute(Int)
  port = 5432;

  @Sensitive(String, { optional: true })
  password?: Sensitive<string>;

  @Block(() => Timeouts, { optional: true })
  timeouts?: Timeouts;

  @Computed(String)
  connectionString = "";
}

@Entity("app")
export class App {
  @Meta()
  meta!: Meta;

  @Attribute(String)
  dbLocation!: string;

  @Attribute(String)
  url!: string;
}
