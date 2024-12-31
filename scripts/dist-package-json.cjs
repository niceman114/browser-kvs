const fs = require("fs")
const path = require("path");

const rootPath = path.resolve(__dirname, "..");
const packageJson = JSON.parse(fs.readFileSync(`${rootPath}/package.json`, "utf8"));

const distPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    repository: packageJson.repository,
    homepage: packageJson.homepage,
    keywords: packageJson.keywords,
    author: packageJson.author,
    dependencies: packageJson.dependencies,
    license: packageJson.license,
    files: ["**"],
    type: packageJson.type,
    main: "./cjs/index.cjs",
    module: "./esm/index.mjs",
    types: "./esm/index.d.ts",
};

const distPath = `${rootPath}/dist/package.json`;
fs.writeFileSync(distPath, JSON.stringify(distPackageJson, null, 2), "utf8");
console.info("package.json for distribution created.");
console.info(distPath);
