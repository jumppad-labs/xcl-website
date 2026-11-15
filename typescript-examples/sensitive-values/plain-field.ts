// A sensitive value assigned to a field the class declares plain.
import { Attribute, Config, ConfigError, Entity, LocalRegistry, Meta } from "xcl-lang";

const local = new LocalRegistry();

// #region show
@Entity("database", "postgres")
class PlainDatabase {
  @Meta()
  meta!: Meta;

  @Attribute(String)
  location!: string;

  @Attribute(String)
  password!: string; // plain, so a sensitive value cannot be assigned to it
}

local.register(PlainDatabase);

await using config = new Config({ registries: [local] });

try {
  await config.validate("./config");
} catch (err) {
  if (!(err instanceof ConfigError)) {
    throw err;
  }
  for (const problem of err.problems) {
    console.log(problem.file, problem.line, problem.summary);
  }
}
// #endregion
