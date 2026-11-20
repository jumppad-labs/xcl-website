import { Entity, Meta, Sensitive } from "xcl-lang";

// Secret defines the block type `secret`, values that must not be seen. data
// is a Sensitive, so it is masked in output and events and encrypted in
// state when the state has a key.
//
// As in Kubernetes, nothing else holds a secret's values: a container reads
// one through a secret_key_ref naming the secret and the key, which are plain
// strings, so the deployment never becomes sensitive itself.
@Entity("secret")
export class Secret {
  @Meta()
  meta!: Meta;

  @Sensitive({ map: String })
  data!: Sensitive<Record<string, string>>;
}
