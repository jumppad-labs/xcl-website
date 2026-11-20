import { Attribute, Config, Entity, Int, LocalRegistry, Meta } from "xcl-lang";

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

// #region show
const local = new LocalRegistry();
local.register(Deployment);
local.register(Service);

await using config = new Config({ registries: [local] });
await config.apply("./config");

const deployments = await config.all(Deployment);
const services = await config.all(Service);
// #endregion

console.log(deployments.length, services.length);
