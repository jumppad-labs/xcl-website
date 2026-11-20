// Box: a program that decides colour itself passes the formatter it chose.
import { config, db } from "./setup.js";

// the application's own decision, such as from its logging library
const colour = process.env.APP_COLOUR === "always";
// #region show
import { plain, terminal } from "xcl-lang";

let formatter = plain;
if (colour) {
  formatter = terminal;
}

await config.printEntity(db, { formatter });
// #endregion

await config.close();
