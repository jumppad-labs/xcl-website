import { GitHubRegistry } from "xcl-lang";

const github = new GitHubRegistry();

// #region show
github.registerPlugin("jumppad-labs/xcl-plugin-docker", "latest"); // fails when the configuration is created
github.registerPlugin("jumppad-labs/xcl-plugin-docker", "~0.4");   // fails
github.registerPlugin("jumppad-labs/xcl-plugin-docker", "0.4.1");  // fails, the tag has a v
github.registerPlugin("xcl-plugin-docker", "v0.4.1");              // fails, not owner/repo
// #endregion
