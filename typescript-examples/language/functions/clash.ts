// Two registries offering the same function name: the clash rejects the first call.
import { Config, Func, FunctionNameClashError, LocalRegistry } from "xcl-lang";

class LocalFunctions {
  @Func([String], String)
  slugify(title: string): string {
    return title.toLowerCase().replaceAll(" ", "-");
  }
}

class SharedFunctions {
  @Func([String], String)
  slugify(title: string): string {
    return title.toLowerCase().replaceAll(" ", "_");
  }
}

const local = new LocalRegistry();
local.registerFunctions(new LocalFunctions());

const shared = new LocalRegistry();
shared.registerFunctions(new SharedFunctions());

// #region show
try {
  await using config = new Config({ registries: [local, shared] });
  await config.setup();
} catch (err) {
  if (err instanceof FunctionNameClashError) {
    console.log(err.message);
  }
}
// #endregion
