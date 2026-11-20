// Box: printing with a VS Code colour theme, extending the default with it.
import { config, db } from "./setup.js";
// #region show
import { defaultTheme, InvalidThemeError, loadVSCodeTheme, terminal } from "xcl-lang";

const loaded = await loadVSCodeTheme("dark-plus.json").catch((err: unknown) => {
  if (err instanceof InvalidThemeError) {
    console.error(`theme: ${err.details.reason}`);
    process.exit(1);
  }
  throw err;
});

const theme = { ...defaultTheme, ...loaded };

await config.printEntity(db, { formatter: terminal, theme });
// #endregion

await config.close();
