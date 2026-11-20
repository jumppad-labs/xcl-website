// Reading the published outputs back once the configuration is applied.
import { Config } from "xcl-lang";

await using config = new Config();

// #region show
await config.apply("./config");

const outputs = await config.outputs(); // an object keyed by address
console.log(outputs["output.url"]);
// #endregion
