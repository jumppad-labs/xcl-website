// Box: printing an entity in one call, coloured when standard output is a
// terminal.
import { PostgreSQL } from "./database.js";
import { config } from "./setup.js";
// #region show
import { forStream } from "xcl-lang";

const db = await config.find(PostgreSQL, "database.postgres.main");

await config.printEntity(db, {
  includeComputed: true,
  formatter: forStream(process.stdout),
});
// #endregion

await config.close();
