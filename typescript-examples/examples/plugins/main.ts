// xcl-docker, the plugins example's command line tool, applies, plans, lists,
// inspects and destroys a configuration provided by the external Docker
// plugin. Each command is a separate run of the program, and the runs share
// nothing but the saved state.
import { request } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import {
  Config,
  EventDataLevel,
  forStream,
  LocalRegistry,
  NotFoundError,
  PluginLoadError,
  prettylog,
  printDiff,
  printError,
  XclError,
  type Entity,
  type Event,
  type Writer,
} from "xcl-lang";

const usage = `usage: xcl-docker [--plugin <path>] [--state <dir>] <command> [<argument>]

commands:
  apply <path>       apply the configuration at path
  plan <path>        print what applying the configuration at path would change
  status             print what the saved state holds, as a tree
  inspect <address>  print one entity from the saved state as configuration text
  destroy            remove everything in the saved state
`;

type EventHandler = (event: Event) => void | Promise<void>;

// run parses the arguments and runs one command, returning the exit code
async function run(argv: string[], stdout: Writer, stderr: Writer): Promise<number> {
  let values: { plugin: string; state: string };
  let positionals: string[];
  try {
    const parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        // the Docker plugin is found next to this program, where make build puts it
        plugin: { type: "string", default: join(dirname(fileURLToPath(import.meta.url)), "docker-plugin") },
        state: { type: "string", default: "./.xcl-docker" },
      },
    });
    values = { plugin: parsed.values.plugin, state: parsed.values.state };
    positionals = parsed.positionals;
  } catch (err) {
    stderr.write(`${err instanceof Error ? err.message : String(err)}\n\n${usage}`);
    return 2;
  }

  const [command, ...args] = positionals;
  if (command === undefined) {
    stderr.write(usage);
    return 2;
  }

  // #region dispatch
  try {
    switch (command) {
      case "apply":
        if (args.length !== 1) {
          stderr.write(`apply needs the path of the configuration to apply\n\n${usage}`);
          return 2;
        }

        await applyCommand(stderr, args[0], values.plugin, values.state);
        break;
      case "plan":
        if (args.length !== 1) {
          stderr.write(`plan needs the path of the configuration to compare\n\n${usage}`);
          return 2;
        }

        await planCommand(stdout, args[0], values.plugin, values.state);
        break;
      case "status":
        await statusCommand(stdout, values.plugin, values.state);
        break;
      case "inspect":
        if (args.length !== 1) {
          stderr.write(`inspect needs the address of the entity to inspect\n\n${usage}`);
          return 2;
        }

        await inspectCommand(stdout, args[0], values.plugin, values.state);
        break;
      case "destroy":
        await destroyCommand(stderr, values.plugin, values.state);
        break;
      default:
        stderr.write(`unknown command ${JSON.stringify(command)}\n\n${usage}`);
        return 2;
    }
  } catch (err) {
    if (err instanceof PluginLoadError) {
      // a failed operation rejects, the Go version returns the error
      stderr.write(`${explainPluginLoad(err)}\n`);
      return 1;
    }

    // a configuration problem is printed as a report with the lines at
    // fault, anything else as its message, coloured only on a terminal
    printError(err, { out: stderr, formatter: forStream(stderr) });
    return 1;
  }

  return 0;
  // #endregion
}

// newConfig builds the Config every command uses. The template plugin is an
// in-process plugin in Go; a TypeScript program runs every plugin as a
// program of its own, so it would be built into a binary of its own and
// registered with registerExternalPlugin as well.
function newConfig(handler: EventHandler | undefined, dockerPlugin: string, stateDir: string): Config {
  // The local registry holds plugins the application supplies itself: here
  // the external plugin binary. Registering only records a plugin, it is
  // loaded, and the binary started, by the first operation that needs
  // plugins.
  const local = new LocalRegistry();
  local.registerExternalPlugin(dockerPlugin);

  return new Config({
    registries: [local],
    // Keep the state in a directory, so each command, a separate run of the
    // program, works from what the last one saved
    statePath: stateDir,
    onEvent: handler,
    // events carry nothing by default, this asks for each entity as
    // state records it, which is what the receiver turns back into
    // configuration text
    eventData: EventDataLevel.Processed,
  });
}

// #region event-handler
function eventHandler(out: Writer): EventHandler {
  return prettylog.handler({ out, level: prettylog.levelFromEnv() });
}
// #endregion

// #region apply-command
async function applyCommand(stderr: Writer, configDir: string, dockerPlugin: string, stateDir: string): Promise<void> {
  // The Docker plugin creates real containers, check an engine answers
  // before applying anything
  await pingDocker();

  await using config = newConfig(eventHandler(stderr), dockerPlugin, stateDir);
  await config.apply(configDir);
}
// #endregion

// #region plan-command
async function planCommand(stdout: Writer, configDir: string, dockerPlugin: string, stateDir: string): Promise<void> {
  await pingDocker();

  await using config = newConfig(undefined, dockerPlugin, stateDir);
  await plan(stdout, config, configDir);
}
// #endregion

// #region plan
async function plan(out: Writer, config: Config, configDir: string): Promise<void> {
  const changes = await config.diff(configDir);

  // colour is decided for out itself, so a plan written to a file or a pipe
  // is plain text
  printDiff(changes, { out, formatter: forStream(out) });
}
// #endregion

// #region status-command
async function statusCommand(stdout: Writer, dockerPlugin: string, stateDir: string): Promise<void> {
  await using config = newConfig(undefined, dockerPlugin, stateDir);
  await config.load();

  await status(stdout, config);
}
// #endregion

// status prints the networks, containers and templates in the saved state as
// a tree, each entity under the one it depends on that is furthest down the
// chain
async function status(out: Writer, config: Config): Promise<void> {
  // #region status-networks
  // Plugin types are held as types generated from the plugin's schema. With
  // no class each comes back as a generic Entity, with .meta and its values
  // in .attributes, i.e. network.attributes.subnet
  const networks = await config.findByType("docker", "network");
  // #endregion

  const containers = await config.findByType("docker", "container");

  // #region status-templates
  // template has no subtype, so its address has one segment before the name
  const templates = await config.findByType("template");
  // #endregion

  const entities = [...networks, ...containers, ...templates];
  const byId = new Map(entities.map((entity) => [entity.meta.id ?? "", entity]));

  // what an entity links to, among the entities shown
  const dependencies = (entity: Entity): Entity[] =>
    [...byId.values()].filter(
      (other) => other !== entity && (entity.meta.links ?? []).some((link) => link === other.meta.id || link.startsWith(`${other.meta.id}.`)),
    );

  const depth = (entity: Entity): number => Math.max(0, ...dependencies(entity).map((dependency) => depth(dependency) + 1));

  const parentOf = (entity: Entity): Entity | undefined =>
    dependencies(entity).reduce<Entity | undefined>((deepest, dependency) => (deepest === undefined || depth(dependency) > depth(deepest) ? dependency : deepest), undefined);

  const print = (entity: Entity, indent: string): void => {
    out.write(`${indent}${entity.meta.id}\n`);
    for (const child of entities.filter((candidate) => parentOf(candidate) === entity)) {
      print(child, `${indent}  `);
    }
  };

  out.write("xcl-docker state\n");
  for (const root of entities.filter((entity) => parentOf(entity) === undefined)) {
    print(root, "  ");
  }
}

async function inspectCommand(stdout: Writer, address: string, dockerPlugin: string, stateDir: string): Promise<void> {
  await using config = newConfig(undefined, dockerPlugin, stateDir);
  await config.load();

  await inspect(stdout, config, address);
}

// #region inspect
async function inspect(out: Writer, config: Config, address: string): Promise<void> {
  let entity: Entity;
  try {
    entity = await config.find(address);
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw new Error(`no entity ${address} in the saved state, xcl-docker status lists them`);
    }

    throw err;
  }

  // xcl never checks for a terminal, asking it for colour is the program's
  // decision. It is decided for out itself, so output to a file or a pipe
  // is plain text.
  await config.printEntity(entity, {
    out,
    includeComputed: true,
    showReferences: true,
    formatter: forStream(out),
  });
}
// #endregion

// #region destroy-command
async function destroyCommand(stderr: Writer, dockerPlugin: string, stateDir: string): Promise<void> {
  await pingDocker();

  await using config = newConfig(eventHandler(stderr), dockerPlugin, stateDir);
  await config.destroy();
}
// #endregion

// #region explain-plugin-load
function explainPluginLoad(err: XclError): string {
  if (err instanceof PluginLoadError) {
    return `${err.message}, build it with \`make build\` in example/plugin`;
  }

  return err.message;
}
// #endregion

// pingDocker sends the Docker engine the same GET /_ping the Docker SDK's own
// Ping sends, through DOCKER_HOST or the default socket, and rejects when no
// engine answers
function pingDocker(): Promise<void> {
  const host = process.env.DOCKER_HOST ?? "unix:///var/run/docker.sock";
  const url = new URL(host.replace(/^tcp:/, "http:"));
  const target = url.protocol === "unix:" ? { socketPath: url.pathname } : { host: url.hostname, port: Number(url.port || 2375) };

  return new Promise((resolve, reject) => {
    const ping = request({ ...target, path: "/_ping", method: "GET", timeout: 5000 }, (response) => {
      response.resume();
      if (response.statusCode === 200) {
        resolve();
      } else {
        reject(new Error(`no Docker engine is reachable at ${host}: /_ping answered ${response.statusCode}`));
      }
    });
    ping.on("timeout", () => ping.destroy(new Error("timed out")));
    ping.on("error", (err) => reject(new Error(`no Docker engine is reachable at ${host}: ${err.message}`)));
    ping.end();
  });
}

process.exitCode = await run(process.argv.slice(2), process.stdout, process.stderr);
