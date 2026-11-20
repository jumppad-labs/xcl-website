// The configuration only example's business logic: plain TypeScript over the
// classes the configuration was read into, with no xcl calls.
import type { AppConfig } from "./main.js";
import type { Container, Deployment, Port, Service } from "./resources.js";

// Route is where one ingress path sends its traffic, printed as one line.
export class Route {
  readonly host: string;
  readonly path: string;
  readonly service: string;
  readonly servicePort: number;
  readonly deployment: string;
  readonly container: string;
  readonly portName: string;
  readonly port: number;

  constructor(route: Omit<Route, "toString">) {
    this.host = route.host;
    this.path = route.path;
    this.service = route.service;
    this.servicePort = route.servicePort;
    this.deployment = route.deployment;
    this.container = route.container;
    this.portName = route.portName;
    this.port = route.port;
  }

  toString(): string {
    return `${this.host}${this.path} -> ${this.service}:${this.servicePort} -> ${this.deployment} container ${this.container} port ${this.portName} (${this.port})`;
  }
}

// #region routes
// ingressRoutes works out a Route for every rule of every ingress, in the
// order they are declared.
//
// The configuration links the blocks by id: a rule names its service, and a
// service names its deployment, so each hop is a lookup rather than a match on
// labels as Kubernetes would do. The last hop is the service's target port,
// which is found on the first container port, in declaration order, that
// listens on it.
//
// A rule whose service, deployment or target port can not be found throws an
// Error naming the ingress and path, a route is never silently left out.
export function ingressRoutes(cfg: AppConfig): Route[] {
  const services = new Map<string | undefined, Service>(cfg.services.map((service) => [service.meta.id, service]));
  const deployments = new Map<string | undefined, Deployment>(cfg.deployments.map((deployment) => [deployment.meta.id, deployment]));

  const routes: Route[] = [];

  for (const ingress of cfg.ingresses) {
    for (const rule of ingress.rule) {
      const service = services.get(rule.service);
      if (service === undefined) {
        throw new Error(`ingress ${ingress.meta.id} path ${rule.path}: service "${rule.service}" not found`);
      }

      const deployment = deployments.get(service.deployment);
      if (deployment === undefined) {
        throw new Error(`ingress ${ingress.meta.id} path ${rule.path}: deployment "${service.deployment}" of service ${service.meta.id} not found`);
      }

      const found = findContainerPort(deployment, service.targetPort);
      if (found === undefined) {
        throw new Error(`ingress ${ingress.meta.id} path ${rule.path}: no container in ${deployment.meta.id} exposes port ${service.targetPort}`);
      }

      const [container, port] = found;
      routes.push(
        new Route({
          host: ingress.host,
          path: rule.path,
          service: rule.service,
          servicePort: rule.port,
          deployment: service.deployment,
          container: container.name,
          portName: port.name,
          port: port.containerPort,
        }),
      );
    }
  }

  return routes;
}

// findContainerPort returns the first container of deployment, and its port,
// that listens on containerPort, or undefined when no container does.
function findContainerPort(deployment: Deployment, containerPort: number): [Container, Port] | undefined {
  for (const container of deployment.container) {
    for (const port of container.port) {
      if (port.containerPort === containerPort) {
        return [container, port];
      }
    }
  }

  return undefined;
}
// #endregion
