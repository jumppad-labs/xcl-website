// The home page's program: applies the configuration with a Go plugin that
// provides database "postgres" and app, then reads the database back.
import { Config, LocalRegistry } from "xcl-lang";

// #region show
// a plugin providing database "postgres" and app, with providers that create them;
// TypeScript loads a Go plugin as a separate program
const local = new LocalRegistry();
local.registerExternalPlugin("./bin/xcl-plugin-postgres");

await using config = new Config({
  registries: [local],
  // optional, xcl writes nothing of its own without a receiver
  onEvent: (event) => console.info(event.operation, event.phase, event.resourceId),
});

await config.apply("./config");

const db = await config.find("database.postgres.main");

console.log(db.attributes.location, db.attributes.port);
// #endregion
