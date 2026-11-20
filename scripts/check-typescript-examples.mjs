// Compiles every TypeScript example on the site against the xcl-lang release
// pinned in xcl-typescript-ref.txt. It installs that release into
// typescript-examples/ without its optional engine packages, which the
// compiler does not need, then runs tsc over the project. A type error fails
// the check and tsc names the file and line.
//
// XCL_TYPESCRIPT_PACKAGE names a tarball of xcl-lang (from npm pack in an
// xcl-typescript checkout) to compile against instead of the pinned release.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const project = join(root, "typescript-examples");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

function run(command, args) {
  execFileSync(command, args, { cwd: project, stdio: "inherit" });
}

let spec;
const tarball = process.env.XCL_TYPESCRIPT_PACKAGE;
if (tarball) {
  spec = resolve(tarball);
  console.log(`typescript examples: compiling against ${spec}`);
} else {
  const tag = readFileSync(join(root, "xcl-typescript-ref.txt"), "utf8").trim();
  if (!/^v\d/.test(tag)) {
    console.error(`typescript examples: xcl-typescript-ref.txt must hold a tag such as v0.2.0, got "${tag}"`);
    process.exit(1);
  }
  spec = `xcl-lang@${tag.slice(1)}`;
  console.log(`typescript examples: compiling against ${spec}`);
}

try {
  // the project's own pinned TypeScript and @types/node, then the package
  run(npm, ["install", "--no-audit", "--no-fund", "--no-save", "--no-package-lock"]);
  run(npm, ["install", "--no-audit", "--no-fund", "--no-save", "--no-package-lock", "--omit=optional", spec]);
  run(join(project, "node_modules", ".bin", process.platform === "win32" ? "tsc.cmd" : "tsc"), ["-p", "tsconfig.json"]);
} catch {
  console.error("typescript examples: the check failed");
  process.exit(1);
}
console.log("typescript examples: every example compiles");
