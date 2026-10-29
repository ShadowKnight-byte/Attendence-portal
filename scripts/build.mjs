import { cp, mkdir, rm, stat } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ["index.html", "styles.css", "src"]) {
  await cp(new URL(`../${entry}`, import.meta.url), new URL(`../dist/${entry}`, import.meta.url), { recursive: true });
}
const builtIndex = await stat(new URL("../dist/index.html", import.meta.url));
if (!builtIndex.isFile()) throw new Error("Build output is missing index.html");
console.log("Static site built into dist/.");
