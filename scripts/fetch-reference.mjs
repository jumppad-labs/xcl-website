// Puts each language package's reference data where the site's build reads
// it, before every build and dev server. The data is the asset
// xcl-lang-<version>-reference.json attached to the package release that the
// language's pin file names. An environment variable per language names a
// local file to use instead, such as one written by the package's own
// reference tool (.github/scripts/api_reference.py in xcl-python,
// .github/scripts/api-reference.mjs in xcl-typescript).
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const languages = [
  {
    name: "python",
    repository: "xcl-python",
    pin: "xcl-python-ref.txt",
    override: "XCL_PYTHON_REFERENCE",
    destination: "src/generated/python-reference.json",
  },
  {
    name: "typescript",
    repository: "xcl-typescript",
    pin: "xcl-typescript-ref.txt",
    override: "XCL_TYPESCRIPT_REFERENCE",
    destination: "src/generated/typescript-reference.json",
  },
];

function fail(language, message) {
  console.error(`${language.name} reference: ${message}`);
  process.exit(1);
}

async function fetchReference(language) {
  const destination = join(root, language.destination);
  mkdirSync(dirname(destination), { recursive: true });

  const override = process.env[language.override];
  if (override) {
    try {
      copyFileSync(override, destination);
    } catch (error) {
      fail(language, `cannot read ${language.override} (${override}): ${error.message}`);
    }
    console.log(`${language.name} reference: using ${override}`);
    return;
  }

  const tag = readFileSync(join(root, language.pin), "utf8").trim();
  if (!/^v\d/.test(tag)) {
    fail(language, `${language.pin} must hold a tag such as v0.15.0, got "${tag}"`);
  }
  const version = tag.slice(1);
  const url = `https://github.com/jumppad-labs/${language.repository}/releases/download/${tag}/xcl-lang-${version}-reference.json`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(language, `cannot download ${url}: ${error.message}. Set ${language.override} to use a local file.`);
  }
  if (!response.ok) {
    fail(language, `cannot download ${url}: HTTP ${response.status}. Does release ${tag} carry a reference asset? Set ${language.override} to use a local file.`);
  }

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    fail(language, `${url} is not JSON: ${error.message}`);
  }
  if (data.version !== version) {
    fail(language, `${url} describes version ${data.version}, but ${language.pin} pins ${version}`);
  }

  writeFileSync(destination, text);
  console.log(`${language.name} reference: fetched ${tag}`);
}

for (const language of languages) {
  await fetchReference(language);
}
