// The route logic's tests, run with `node --test`, each against a small
// configuration of its own under testdata/, loaded through the program's own
// loadConfig.
import assert from "node:assert/strict";
import { test } from "node:test";

import { loadConfig } from "./main.js";
import { ingressRoutes, Route } from "./routes.js";

// #region every-path
test("ingressRoutes reports every ingress path", async () => {
  const cfg = await loadConfig("testdata/routes");

  const routes = ingressRoutes(cfg);

  assert.deepStrictEqual(routes, [
    new Route({
      host: "shop.test",
      path: "/",
      service: "service.web",
      servicePort: 80,
      deployment: "deployment.web",
      container: "web",
      portName: "http",
      port: 3000,
    }),
    new Route({
      host: "shop.test",
      path: "/api",
      service: "service.api",
      servicePort: 9090,
      deployment: "deployment.api",
      container: "api",
      portName: "grpc",
      port: 7000,
    }),
  ]);
});
// #endregion

// #region unknown-service
test("ingressRoutes fails for an unknown service", async () => {
  const cfg = await loadConfig("testdata/unknown_service");

  assert.throws(
    () => ingressRoutes(cfg),
    (err: Error) => err.message.includes("ingress ingress.shop path /") && err.message.includes('service "service.missing" not found'),
  );
});
// #endregion
