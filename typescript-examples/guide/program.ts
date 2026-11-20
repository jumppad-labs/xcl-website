import { readFileSync } from "node:fs";

import {
  Attribute,
  CancelledError,
  Config,
  ConfigError,
  Entity,
  EventDataLevel,
  forStream,
  Func,
  GitHubRegistry,
  Int,
  interruptSignal,
  LocalRegistry,
  Meta,
  prettylog,
  printError,
  type Registry,
} from "xcl-lang";

// #region types
@Entity("settings")
class Settings {
  @Attribute(String)
  image!: string;

  @Attribute(Int)
  replicas = 1;

  @Attribute(String)
  greeting = "";

  @Meta()
  meta!: Meta;
}

class Functions {
  @Func([String], String)
  shout(text: string): string {
    return text.toUpperCase();
  }
}
// #endregion

// #region registries
function registries(): Registry[] {
  const local = new LocalRegistry();
  local.register(Settings);
  local.registerFunctions(new Functions());

  const releaseKey = readFileSync("jumppad-labs-releases.asc", "utf8");
  const github = new GitHubRegistry({ trustedKeys: [releaseKey] });
  github.registerPlugin("jumppad-labs/xcl-plugin-docker", "v0.4.1");

  return [local, github];
}
// #endregion

// #region apply
async function apply(): Promise<void> {
  await using config = new Config({
    registries: registries(),
    statePath: ".xcl",
    onEvent: prettylog.handler({ level: prettylog.levelFromEnv() }),
    eventData: EventDataLevel.Processed,
  });

  // #region cancel
  // give up after ten minutes, or when Ctrl-C is pressed
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error("the apply took over ten minutes")), 10 * 60 * 1000);
  const signal = AbortSignal.any([controller.signal, interruptSignal()]);
  // #endregion

  try {
    await config.apply("./infra", { signal });
  } catch (err) {
    if (err instanceof ConfigError || err instanceof CancelledError) {
      printError(err, { formatter: forStream(process.stderr) });
      process.exitCode = 1;
      return;
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }

  console.log(`applied ${await config.entityCount()} entities`);
}
// #endregion

// #region show
async function show(): Promise<void> {
  await using config = new Config({ registries: registries(), statePath: ".xcl" });
  await config.load();

  const settings = await config.find(Settings, "settings.web");
  console.log(settings.image, settings.replicas, settings.greeting);

  const network = await config.find("docker.network.main");
  console.log(network.meta.id, network.attributes.subnet, network.attributes.dockerId);

  for (const container of await config.findByType("docker", "container")) {
    console.log(container.meta.id, container.attributes.ipAddress);
  }

  await config.printEntity(network, { includeComputed: true });
}
// #endregion

// #region destroy
async function destroy(): Promise<void> {
  await using config = new Config({ registries: registries(), statePath: ".xcl" });
  await config.destroy();
  console.log("destroyed");
}
// #endregion

// #region main
const commands: Record<string, () => Promise<void>> = { apply, show, destroy };
const command = commands[process.argv[2] ?? ""];
if (command === undefined) {
  console.error("usage: node build/main.js apply|show|destroy");
  process.exitCode = 2;
} else {
  await command();
}
// #endregion
