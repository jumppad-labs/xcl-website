import { GitHubRegistry } from "xcl-lang";

// #region show
const github = new GitHubRegistry({ cacheDir: "./.xcl/plugins" });
// #endregion

github.registerPlugin("jumppad-labs/xcl-plugin-docker", "v0.4.1");
