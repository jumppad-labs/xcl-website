// The applied configuration and the looked-up `database.postgres.main` entity
// most of the configuration text page's examples start from, as `cfg` and
// `db` are on the page's other tabs.
import { Config, LocalRegistry } from "xcl-lang";

import { App, PostgreSQL } from "./database.js";

const local = new LocalRegistry();
local.register(PostgreSQL);
local.register(App);

export const config = new Config({ registries: [local], statePath: ".xcl" });
await config.apply("main.xcl");

export const db = await config.find(PostgreSQL, "database.postgres.main");
