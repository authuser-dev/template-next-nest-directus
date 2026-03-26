FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/typescript/package.json packages/config/typescript/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter api build

FROM node:24-alpine AS runtime

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --filter api --prod --frozen-lockfile

COPY --from=build /app/apps/api/dist apps/api/dist

EXPOSE 3000

WORKDIR /app/apps/api

CMD ["node", "dist/main"]