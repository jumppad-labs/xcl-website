import { Attribute, Config, Entity, Int, Label, LocalRegistry, Meta } from "xcl-lang";

@Entity("deployment")
class Deployment {
  @Meta()
  meta!: Meta;

  @Attribute(String)
  image!: string;
}

@Entity("service")
class Service {
  @Meta()
  meta!: Meta;

  @Attribute(Int)
  port = 80;
}

@Entity("database", "postgres")
class PostgreSQL {
  @Meta()
  meta!: Meta; // the block's id, file and line, filled by xcl

  @Label()
  engine = ""; // the subtype, "postgres"

  @Label()
  name = ""; // the block's name, "main"

  @Attribute(String)
  location!: string;
}

const local = new LocalRegistry();
local.register(Deployment); // deployment "api" {}
local.register(Service);    // service "api" {}
local.register(PostgreSQL); // database "postgres" "main" {}

await using config = new Config({ registries: [local] });
