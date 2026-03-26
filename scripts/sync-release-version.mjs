import { readFile, writeFile } from "node:fs/promises";

const nextVersion = process.argv[2];

if (!nextVersion) {
	throw new Error("Missing release version");
}

const packageJsonFiles = [
	"package.json",
	"apps/api/package.json",
	"apps/web/package.json",
	"apps/cms/package.json",
	"packages/ui/package.json",
	"packages/types/package.json",
	"packages/config/eslint/package.json",
	"packages/config/typescript/package.json",
];

await Promise.all(
	packageJsonFiles.map(async (filePath) => {
		const rawFile = await readFile(filePath, "utf8");
		const packageJson = JSON.parse(rawFile);
		packageJson.version = nextVersion;
		await writeFile(filePath, `${JSON.stringify(packageJson, null, 2)}\n`);
	}),
);
