// The guide's alternative to the pretty logger: every event to a logger of the program's own.
import { readFileSync } from "node:fs";

import { Config, events, GitHubRegistry, type Registry } from "xcl-lang";

function registries(): Registry[] {
  const github = new GitHubRegistry({ trustedKeys: [readFileSync("jumppad-labs-releases.asc", "utf8")] });
  github.registerPlugin("jumppad-labs/xcl-plugin-docker", "v0.4.1");
  return [github];
}

// #region show
await using config = new Config({
  registries: registries(),
  statePath: ".xcl",
  // console takes the message first; pino, the default order, takes the fields first
  onEvent: events.toLogger(console, { order: "message-first" }),
});
// #endregion

await config.apply("./infra");
