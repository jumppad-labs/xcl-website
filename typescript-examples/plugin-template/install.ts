// Installs a plugin release with the GitHub registry.
import { readFileSync } from "node:fs";

import { Config, GitHubRegistry } from "xcl-lang";

const publicKey = readFileSync("public-key.asc", "utf8");

// #region show
const gh = new GitHubRegistry({ trustedKeys: [publicKey] });
gh.registerPlugin("<you>/xcl-plugin-<name>", "v0.1.0");

await using config = new Config({ registries: [gh] });
// #endregion

await config.apply("main.xcl");
