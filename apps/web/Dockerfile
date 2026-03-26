FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat
RUN corepack enable

WORKDIR /app

FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/eslint/package.json packages/config/eslint/package.json
COPY packages/config/typescript/package.json packages/config/typescript/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter web build

FROM node:24-alpine AS runtime

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

WORKDIR /app

COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public

EXPOSE 3001

CMD ["node", "apps/web/server.js"]