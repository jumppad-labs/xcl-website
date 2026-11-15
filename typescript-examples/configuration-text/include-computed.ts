// Box: configuration text that includes provider-filled values, marked as such.
import { config, db } from "./setup.js";

// #region show
const text = await config.encodeEntity(db, { includeComputed: true });
// #endregion

console.log(text);
await config.close();
