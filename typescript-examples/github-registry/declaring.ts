import { Config, GitHubRegistry, LocalRegistry } from "xcl-lang";

const local = new LocalRegistry();

// #region show
const github = new GitHubRegistry();
github.registerPlugin("jumppad-labs/xcl-plugin-docker", "v0.4.1");

await using config = new Config({
  registries: [
    local,  // your own types and plugins
    github, // plugins from GitHub releases
  ],
});
// #endregion
