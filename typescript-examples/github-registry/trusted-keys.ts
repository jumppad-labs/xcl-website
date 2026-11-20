import { readFileSync } from "node:fs";

import { GitHubRegistry } from "xcl-lang";

const key = readFileSync("./keys/acme-plugins.asc", "utf8");

const github = new GitHubRegistry({ trustedKeys: [key] });
github.registerPlugin("acme/xcl-plugin-billing", "v2.0.1");
