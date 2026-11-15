// Box: configuration text that includes real sensitive values rather than the marker.
import { config, db } from "./setup.js";

// #region show
const text = await config.encodeEntity(db, { revealSensitive: true });
// #endregion

console.log(text);
await config.close();
