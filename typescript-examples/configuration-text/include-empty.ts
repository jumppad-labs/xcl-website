// Box: configuration text that includes empty attributes, written with their type's empty value.
import { config, db } from "./setup.js";

// #region show
const text = await config.encodeEntity(db, { includeEmpty: true });
// #endregion

console.log(text);
await config.close();
