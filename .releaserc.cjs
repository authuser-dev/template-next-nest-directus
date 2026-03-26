const repositoryUrl =
	process.env.CI_PROJECT_URL ||
	(process.env.GITHUB_REPOSITORY
		? `${process.env.GITHUB_SERVER_URL || "https://github.com"}/${process.env.GITHUB_REPOSITORY}.git`
		: `file://${process.cwd()}`);

const plugins = [
	"@semantic-release/commit-analyzer",
	"@semantic-release/release-notes-generator",
	[
		"@semantic-release/changelog",
		{
			changelogFile: "CHANGELOG.md",
		},
	],
	[
		"@semantic-release/exec",
		{
			prepareCmd:
				"node ./scripts/sync-release-version.mjs ${nextRelease.version}",
		},
	],
	[
		"@semantic-release/git",
		{
			assets: [
				"CHANGELOG.md",
				"package.json",
				"apps/*/package.json",
				"packages/*/package.json",
				"packages/config/*/package.json",
			],
			message:
				"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
		},
	],
];

if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
	plugins.push("@semantic-release/github");
}

if (process.env.GITLAB_TOKEN || process.env.GL_TOKEN) {
	plugins.push("@semantic-release/gitlab");
}

module.exports = {
	branches: ["main", "master"],
	repositoryUrl,
	plugins,
};
