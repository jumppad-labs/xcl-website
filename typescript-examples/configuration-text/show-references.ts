// Box: configuration text that shows each reference as it was written.
import { App } from "./database.js";
import { config } from "./setup.js";

const app = await config.find(App, "app.web");

// #region show
const text = await config.encodeEntity(app, { showReferences: true });
// #endregion

console.log(text);
await config.close();
