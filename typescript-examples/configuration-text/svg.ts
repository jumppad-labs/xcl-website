// Box: printing an entity as a standalone SVG image.
import { config, db } from "./setup.js";
// #region show
import { createWriteStream } from "node:fs";

import { svg } from "xcl-lang";

const file = createWriteStream("database.svg");
await config.printEntity(db, { out: file, formatter: svg });
file.end();
// #endregion

await config.close();
