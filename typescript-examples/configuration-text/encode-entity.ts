// Box: converting an entity found by a lookup into configuration text.
import { PostgreSQL } from "./database.js";
import { config } from "./setup.js";

// #region show
const db = await config.find(PostgreSQL, "database.postgres.main");

console.log(await config.encodeEntity(db));
// #endregion

await config.close();
