// Encrypts every sensitive value in state with a key from the environment.
import { LocalRegistry } from "xcl-lang";

const local = new LocalRegistry();

// #region show
import { Config, mask } from "xcl-lang";

const key = Buffer.from(process.env.XCL_STATE_KEY ?? "", "base64");

await using config = new Config({
  registries: [local],
  statePath: "./state",
  stateMask: mask.aes256gcm(key),
});
// #endregion

await config.apply("main.xcl");
