import { Config, GitHubRegistry, PluginNotFoundError, PluginVerificationError } from "xcl-lang";

const github = new GitHubRegistry();
github.registerPlugin("jumppad-labs/xcl-plugin-docker", "v0.4.1");

await using config = new Config({ registries: [github] });

// #region show
try {
  await config.apply("./config");
} catch (err) {
  if (err instanceof PluginVerificationError) {
    console.log("refusing a plugin that did not verify");
  } else if (err instanceof PluginNotFoundError) {
    const details = err.details;
    console.log(`cannot install ${details.repository} ${details.version} for ${details.platform}`);
  }
}
// #endregion
