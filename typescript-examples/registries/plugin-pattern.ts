import { LocalRegistry } from "xcl-lang";

const local = new LocalRegistry({ pluginPattern: "acme-plugin-*" });
local.registerPluginDirectory("/opt/acme/plugins");
