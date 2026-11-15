// The configuration only example's program: it reads a Kubernetes-like
// configuration into its own classes and prints where each ingress path sends
// traffic.
import { fileURLToPath } from "node:url";

import { Config, EventDataLevel, forStream, LocalRegistry, prettylog, printError, type ConfigOptions } from "xcl-lang";

import { ConfigMap, Deployment, Ingress, Secret, Service } from "./resources.js";
import { ingressRoutes } from "./routes.js";

// #region load
// AppConfig is the application's view of the configuration. An array field
// receives every block of its type, in the order the blocks were written, so
// the configuration can declare as many of each as it needs. It holds only
// what the program reads, reading a new block type needs only a new field.
export interface AppConfig {
  deployments: Deployment[];
  services: Service[];
  ingresses: Ingress[];
}

// loadConfig declares the example's block types, applies the configuration in
// path with the caller's options, and gathers it into an AppConfig.
export async function loadConfig(path: string, options: Omit<ConfigOptions, "registries"> = {}): Promise<AppConfig> {
  // Declare each class under the block type name its @Entity gives, on a
  // local registry. A declared type needs nothing else: no plugin, no
  // provider, no schema to write by hand. Every type the configuration
  // declares must be declared here, even the ones the program does not
  // read.
  const local = new LocalRegistry();
  local.register(ConfigMap, Secret, Deployment, Service, Ingress);

  await using config = new Config({ registries: [local], ...options });
  await config.apply(path);

  // gather the configuration into the application's own object, one
  // lookup per block type the program reads
  return {
    deployments: await config.all(Deployment),
    services: await config.all(Service),
    ingresses: await config.all(Ingress),
  };
}
// #endregion

// #region run
// run loads the configuration in path, works out its ingress routes and prints
// one line per route. An error is thrown rather than returned.
async function run(path: string): Promise<void> {
  const cfg = await loadConfig(path, {
    // Every event xcl produces goes to the pretty receiver on stderr, so
    // stdout holds only the routes
    onEvent: prettylog.handler({ out: process.stderr, level: prettylog.levelFromEnv() }),
    // events carry nothing by default, this asks for each entity as it
    // is processed, which is what the receiver turns back into
    // configuration text. Sensitive fields are redacted in events.
    eventData: EventDataLevel.Processed,
  });

  for (const route of ingressRoutes(cfg)) {
    console.log(`${route}`);
  }
}
// #endregion

// #region main
// run only when this file is the program, not when a test imports it
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await run(process.argv[2] ?? "./config");
  } catch (err) {
    // a configuration problem is printed as a report with the lines at
    // fault, anything else as its message. Colour is asked for here, as
    // xcl never decides it alone: terminal colour for a terminal, plain
    // text when stderr is redirected or NO_COLOR is set.
    printError(err, { formatter: forStream(process.stderr) });
    process.exitCode = 1;
  }
}
// #endregion
