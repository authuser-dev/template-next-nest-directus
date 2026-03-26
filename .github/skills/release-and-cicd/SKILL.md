---
name: release-and-cicd
description: "Use when working on GitHub Actions, GitLab CI, semantic-release, conventional commits, Husky, commitlint, changelog generation, or Docker build automation in this monorepo."
---

# Release and CI/CD

This repository uses pnpm workspaces and Turborepo, with release automation driven by semantic-release and local commit hygiene enforced with Husky and commitlint.

## Use This Skill When

- A task mentions CI/CD
- A task mentions semantic-release or changelog generation
- A task mentions conventional commits, Husky, commitlint, or lint-staged
- A task mentions Dockerfiles or build validation for apps/api, apps/web, or apps/cms

## Workflow

1. Read the root package.json scripts before changing pipelines.
2. Keep GitHub Actions and GitLab CI behavior aligned unless one platform requires a platform-specific exception.
3. Prefer reusing existing root scripts such as test:ci and release.
4. For release changes, validate with semantic-release dry-run when possible.
5. For Docker changes, account for monorepo package boundaries and build context.

## Guardrails

- Do not hardcode secrets in workflows.
- Document required tokens and environment assumptions.
- Prefer one source of truth for validation commands.
- Avoid CI-only commands that drift from local developer workflows.
