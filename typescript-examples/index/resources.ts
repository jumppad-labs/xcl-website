// The block type the home page describes, `database "postgres"`, as a
// decorated class.
import { Attribute, Block, Computed, Entity, Int, Label, Sensitive } from "xcl-lang";

// Timeouts is the nested `timeouts` block of a database
export class Timeouts {
  @Attribute(Int) connection = 30;
}

// #region show
// PostgreSQL defines the block type `database "postgres"`
@Entity("database", "postgres")
export class PostgreSQL {
  // The block's labels, its subtype and its name: "postgres" and "main"
  @Label() engine!: string;
  @Label() name!: string;

  @Attribute(String) location!: string;
  @Attribute(Int) port!: number;
  @Attribute(String) username!: string;

  // Sensitive: shown only as (sensitive), read with reveal()
  @Sensitive(String) password!: Sensitive<string>;

  // A nested block, optional so it may be undefined
  @Block(() => Timeouts, { optional: true }) timeouts?: Timeouts;

  // Set by a provider, never by configuration
  @Computed(String) connectionString?: string;
}
// #endregion
