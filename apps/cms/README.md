# cms

Directus local project using Docker Compose.

## Start

1. Copy `.env.example` to `.env` and set `DIRECTUS_SECRET`.
2. Run `pnpm --filter cms dev`.
3. Open `http://localhost:8055` and complete the Directus onboarding flow.

## Persistent data

- `database/`
- `uploads/`
- `extensions/`
