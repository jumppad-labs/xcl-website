// The block types of the configuration only example, as decorated classes.
// The entity classes are registered by main.ts; the nested block classes are
// reached through them and are never registered.
import { Attribute, Block, Blocks, Entity, Int, Meta, Sensitive } from "xcl-lang";

// #region types
// ConfigMap defines the block type `config_map`, a bag of values the
// deployment reads. A map attribute holds values whose names are not known
// ahead of time, and a single value can be read from it with
// `config_map.api.data.db_host`.
@Entity("config_map")
export class ConfigMap {
  @Meta() meta!: Meta;

  @Attribute({ map: String }) data!: Record<string, string>;
}

// Secret defines the block type `secret`, values that must not be seen. Data
// is a Sensitive, so it is masked in output and events and encrypted in
// state when the state has a key. A secret read back through a lookup holds
// no value at all: its text is (sensitive) and reveal() returns undefined.
//
// As in Kubernetes, nothing else holds a secret's values: a container reads
// one through a secret_key_ref naming the secret and the key, which are plain
// strings, so the deployment never becomes sensitive itself.
@Entity("secret")
export class Secret {
  @Meta() meta!: Meta;

  @Sensitive({ map: String }) data!: Sensitive<Record<string, string>>;
}

// Container is the nested `container` block of a deployment. It is not an
// entity of its own, so it is not registered and can not be referenced by
// its own id, its fields are reached through the deployment that holds it,
// i.e. `deployment.api.container[0].port[0].container_port`.
//
// A nested block's class is given to its decorator as a function, such as
// () => Port, so a class can be named before it is defined.
export class Container {
  @Attribute(String) name!: string;
  @Attribute(String) image!: string;

  @Blocks(() => Port) port: Port[] = [];
  @Blocks(() => EnvVar) env: EnvVar[] = [];

  // resources appears at most once, so it is optional and is undefined when
  // the container does not set it
  @Block(() => ResourceRequirements, { optional: true }) resources?: ResourceRequirements;

  @Blocks(() => VolumeMount) volumeMount: VolumeMount[] = [];
}

export class Port {
  @Attribute(String) name!: string;
  @Attribute(Int) containerPort!: number;
}

export class EnvVar {
  @Attribute(String) name!: string;
  @Attribute(String, { optional: true }) value?: string;

  // valueFrom is set in place of value when the value comes from a secret
  @Block(() => EnvVarSource, { optional: true }) valueFrom?: EnvVarSource;
}

export class EnvVarSource {
  @Block(() => SecretKeySelector, { optional: true }) secretKeyRef?: SecretKeySelector;
}

export class SecretKeySelector {
  @Attribute(String) name!: string;
  @Attribute(String) key!: string;
}

export class ResourceRequirements {
  @Block(() => ResourceQuantities, { optional: true }) limits?: ResourceQuantities;
  @Block(() => ResourceQuantities, { optional: true }) requests?: ResourceQuantities;
}

export class ResourceQuantities {
  @Attribute(String, { optional: true }) cpu?: string;
  @Attribute(String, { optional: true }) memory?: string;
}

export class VolumeMount {
  @Attribute(String) name!: string;
  @Attribute(String) path!: string;
}

export class Volume {
  @Attribute(String) name!: string;
  @Attribute(String) configMap!: string;
}

// Deployment defines the block type `deployment`. It holds repeated container
// blocks, each of which nests further blocks of its own. The property name
// is the block name used in configuration, in camelCase, so a repeated
// `container` block is the `container` array.
@Entity("deployment")
export class Deployment {
  @Meta() meta!: Meta;

  @Attribute(Int, { optional: true }) replicas?: number;

  // container is a repeated block, one entry per container block in the
  // configuration. A repeated block is an array, a block that appears once is
  // an optional field.
  @Blocks(() => Container) container: Container[] = [];

  // volume blocks are mounted by the containers above through their name
  @Blocks(() => Volume) volume: Volume[] = [];
}
// #endregion

// #region service
// Service defines the block type `service`, it routes traffic to the
// containers of a deployment.
//
// Kubernetes matches a service to its pods with a label selector because a
// manifest has no way to point at another object. Configuration parsed by xcl
// does, so the service names the deployment by its id and reads the port out
// of it, and the two can not drift apart.
@Entity("service")
export class Service {
  @Meta() meta!: Meta;

  @Attribute(String) deployment!: string;
  @Attribute(Int) port!: number;
  @Attribute(Int) targetPort!: number;
}

// Rule is a nested `rule` block of an ingress, sending one path to one
// service, named by its id
export class Rule {
  @Attribute(String) path!: string;
  @Attribute(String) service!: string;
  @Attribute(Int) port!: number;
}

// Ingress defines the block type `ingress`, it routes a host to a service
@Entity("ingress")
export class Ingress {
  @Meta() meta!: Meta;

  @Attribute(String) host!: string;
  @Blocks(() => Rule) rule: Rule[] = [];
}
// #endregion
