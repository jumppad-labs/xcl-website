// The smallest program: a configuration with no registries, applied and closed.
// It keeps the project non-empty until the pages' examples arrive, and shows
// the shape every example follows.
import { Config } from "xcl-lang";

// #region apply
await using config = new Config();
await config.apply("main.xcl");
// #endregion
