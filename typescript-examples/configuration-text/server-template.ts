// Box: putting an entity's HTML into a page a server renders.
import { config, db } from "./setup.js";
// #region show
import { createServer } from "node:http";

import { html } from "xcl-lang";

let entity = "";
await config.printEntity(db, {
  out: { write: (chunk) => (entity += chunk) },
  formatter: html,
});

function page(body: string): string {
  return `<!doctype html>
<link rel="stylesheet" href="/xcl.css">
<main>${body}</main>`;
}

createServer((request, response) => {
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.end(page(entity));
}).listen(8080);
// #endregion
