# Next + Nest + Directus Template

Reusable monorepo template to bootstrap projects with:

- `apps/api` (NestJS)
- `apps/web` (Next.js)
- `apps/cms` (Directus)
- shared packages (`@repo/ui`, `@repo/types`, shared ESLint and TypeScript config)

Language:

- English (default): this file
- Spanish: [`docs/README.es.md`](docs/README.es.md)

Documentation index:

- [`docs/README.md`](docs/README.md)

## Quick Start

You can use this repository as a GitHub template, or clone/copy it directly.

```sh
pnpm install
pnpm dev
```

Recommended runtime for this template: **Node.js 24+**.

## Framework Versions

- NestJS: 11.x (api dependencies use `@nestjs/*` `^11.0.1`)
- Next.js: 16.2.1
- Directus: 11.14.1 (Docker image `directus/directus:11.14.1`)

Run one app only:

```sh
pnpm --filter api dev
pnpm --filter web dev
pnpm --filter cms dev
```

## What's Inside

This Turborepo includes:

- `api`: [NestJS](https://nestjs.com/) backend app
- `web`: [Next.js](https://nextjs.org/) frontend app
- `cms`: [Directus](https://directus.io/) project bootstrapped with Docker Compose
- `@repo/ui`: shared React component library
- `@repo/types`: shared API contracts and DTO typing between frontend and backend
- `@repo/eslint`: shared `eslint` configurations
- `@repo/typescript`: shared `tsconfig.json` files across the monorepo

All packages/apps are [TypeScript](https://www.typescriptlang.org/).

## Default Local Ports

- `api`: `http://localhost:3000`
- `web`: `http://localhost:3001`
- `cms`: `http://localhost:3002` (container maps to Directus internal `8055`)

## Environment Variables

### API (Nest + Fastify Kit)

The API uses `@authuser/nest-fastify-kit` in `apps/api/src/main.ts`.

Important requirements:

- If you keep `docs: process.env.NODE_ENV !== 'production'`, install `@nestjs/swagger` in `apps/api`.
- For the Fastify stack, also include `@fastify/static` in `apps/api`.
- If you remove/disable `docs`, `@nestjs/swagger` is no longer required.
- Start from `apps/api/.env.example` for local setup.

### Web (Next.js)

- Start from `apps/web/.env.example` for local setup.

### CMS (Directus)

Before running `cms`, create `apps/cms/.env` from `apps/cms/.env.example`.

Minimal example:

```env
DIRECTUS_SECRET=replace-with-a-long-random-value
```

If Docker is not running, `pnpm dev` fails in the `cms` process.

## CI/CD and Release Flow

- `pnpm test:ci` runs lint, typecheck, unit/e2e tests, and Directus compose validation.
- Conventional commits are enforced locally with Husky and Commitlint.
- `semantic-release` generates the version, Git tags, GitHub release, GitLab release, and `CHANGELOG.md` from CI/CD.
- GitHub Actions and GitLab CI include verification and release pipelines for the default branch.

### Required CI Secrets

- `GITHUB_TOKEN` for GitHub releases.
- `GITLAB_TOKEN` for GitLab releases.

In GitLab, define both variables. In GitHub, `GITHUB_TOKEN` is already available in workflows; only add `GITLAB_TOKEN`.

### Local Hooks

- `pre-commit`: formats staged files with Prettier
- `commit-msg`: validates conventional commits
- `pre-push`: runs the full local verification suite

### Docker Images

- `apps/api/Dockerfile`: NestJS production image
- `apps/web/Dockerfile`: Next.js standalone production image
- `apps/cms/Dockerfile`: Directus image for isolated deployment

Validate locally with:

```sh
pnpm docker:build
```

## Copilot Agents and Skills

This repository uses GitHub Copilot-compatible customization files.

### Custom Agents

- `.github/agents/backend.agent.md`: backend-focused agent for NestJS and shared contracts
- `.github/agents/frontend.agent.md`: frontend-focused agent for Next.js and UI integration
- `.github/agents/devops.agent.md`: DevOps-focused agent for CI/CD, releases, and Docker

### Skills

- `.github/skills/shared-contracts/SKILL.md`: backend/frontend type alignment guidance
- `.github/skills/release-and-cicd/SKILL.md`: semantic-release, CI/CD, and Docker automation guidance
- `.github/skills/directus-cms/SKILL.md`: Directus and CMS container workflow guidance

The previous `.agents/agents/*.ts` placeholders are not a valid GitHub Copilot coding agent format. The supported repository layout uses `.github/agents/*.agent.md` and `.github/skills/<name>/SKILL.md`.

## Testing

- `pnpm test`: unit tests (api + web + ui)
- `pnpm test:e2e`: e2e tests (api + web)
- `pnpm test:ci`: lint + typecheck + tests + compose validation for cms

Note for Playwright: on a new machine it may require browser installation.
In CI for this repo, Playwright is installed before running `test:e2e`.

## Build

Build all apps and packages:

```sh
pnpm exec turbo build
```

Build one package/app:

```sh
pnpm exec turbo build --filter=web
```

## Develop

Run all apps and packages in development:

```sh
pnpm exec turbo dev
```

Run one app/package:

```sh
pnpm exec turbo dev --filter=api
```

## Remote Caching

Turborepo supports [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines and CI/CD.

```sh
pnpm exec turbo login
pnpm exec turbo link
```

## Useful Links

Learn more about Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
