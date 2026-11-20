// A type with a subtype and a type without one: @Entity names both.
import { Attribute, Entity, LocalRegistry, Meta } from "xcl-lang";

@Entity("database", "postgres")
class PostgreSQL {
  @Attribute(String)
  location!: string;

  @Meta()
  meta!: Meta;
}

@Entity("app")
class App {
  @Attribute(String)
  image!: string;

  @Meta()
  meta!: Meta;
}

const local = new LocalRegistry();
local.register(PostgreSQL); // database "postgres" "main" {}
local.register(App);        // app "web" {}
