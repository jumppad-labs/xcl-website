// Puts the Python package's reference data where the site's build reads it,
// before every build and dev server. The data is the asset attached to the
// xcl-python release named in xcl-python-ref.txt. XCL_PYTHON_REFERENCE names a
// local file to use instead, such as one written by xcl-python's
// .github/scripts/api_reference.py.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pinPath = join(root, "xcl-python-ref.txt");
const destination = join(root, "src/generated/python-reference.json");

function fail(message) {
  console.error(`python reference: ${message}`);
  process.exit(1);
}

mkdirSync(dirname(destination), { recursive: true });

const override = process.env.XCL_PYTHON_REFERENCE;
if (override) {
  try {
    copyFileSync(override, destination);
  } catch (error) {
    fail(`cannot read XCL_PYTHON_REFERENCE (${override}): ${error.message}`);
  }
  console.log(`python reference: using ${override}`);
  process.exit(0);
}

const tag = readFileSync(pinPath, "utf8").trim();
if (!/^v\d/.test(tag)) {
  fail(`xcl-python-ref.txt must hold a tag such as v0.15.0, got "${tag}"`);
}
const version = tag.slice(1);
const url = `https://github.com/jumppad-labs/xcl-python/releases/download/${tag}/xcl-lang-${version}-reference.json`;

let response;
try {
  response = await fetch(url);
} catch (error) {
  fail(`cannot download ${url}: ${error.message}. Set XCL_PYTHON_REFERENCE to use a local file.`);
}
if (!response.ok) {
  fail(`cannot download ${url}: HTTP ${response.status}. Does release ${tag} carry a reference asset? Set XCL_PYTHON_REFERENCE to use a local file.`);
}

const text = await response.text();
let data;
try {
  data = JSON.parse(text);
} catch (error) {
  fail(`${url} is not JSON: ${error.message}`);
}
if (data.version !== version) {
  fail(`${url} describes version ${data.version}, but xcl-python-ref.txt pins ${version}`);
}

writeFileSync(destination, text);
console.log(`python reference: fetched ${tag}`);
