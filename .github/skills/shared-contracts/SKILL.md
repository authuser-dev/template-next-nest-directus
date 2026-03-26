---
name: shared-contracts
description: "Use when changing API response shapes, DTOs, shared contracts, packages/types, or when frontend and backend typing must stay aligned across apps/api and apps/web."
---

# Shared Contracts

This repository uses packages/types as the shared contract boundary between the NestJS backend and the Next.js frontend.

## Use This Skill When

- A task changes response payloads from apps/api
- A task touches DTOs or shared contract files in packages/types
- Frontend and backend have drifted and need to be re-aligned
- Tests fail because a response shape changed

## Workflow

1. Inspect the shared contract in packages/types first.
2. If the contract must change, update packages/types before adapting application code.
3. Update backend implementation and backend tests in apps/api.
4. Update frontend consumption in apps/web to use the shared contract instead of defining local copies.
5. Validate with the relevant project checks.

## Guardrails

- Avoid duplicating types between frontend and backend.
- Avoid silent breaking changes to payload shape.
- If a breaking contract change is intentional, make it explicit in code and tests.
- Prefer small contract files with stable names and straightforward exports.
