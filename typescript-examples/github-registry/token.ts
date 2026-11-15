import { GitHubRegistry } from "xcl-lang";

const github = new GitHubRegistry({ token: process.env.ACME_PLUGINS_TOKEN });
github.registerPlugin("acme/xcl-plugin-billing", "v2.0.1");
