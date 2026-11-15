import { readFileSync } from "node:fs";

import { GitHubRegistry } from "xcl-lang";

const publicKey = readFileSync("jumppad-labs-releases.asc", "utf8");

const gh = new GitHubRegistry({ trustedKeys: [publicKey] });
gh.registerPlugin("jumppad-labs/xcl-plugin-template-go", "v0.1.0");
