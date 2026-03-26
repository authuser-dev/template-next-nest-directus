# Plantilla Next + Nest + Directus

Plantilla monorepo reutilizable para arrancar proyectos con:

- `apps/api` (NestJS)
- `apps/web` (Next.js)
- `apps/cms` (Directus)
- paquetes compartidos (`@repo/ui`, `@repo/types`, configuración compartida de ESLint y TypeScript)

Idioma:

- Inglés (por defecto): [`../README.md`](../README.md)
- Español: este archivo

## Inicio Rápido

Puedes usar este repositorio como template en GitHub o clonarlo/copiarlo directamente.

```sh
pnpm install
pnpm dev
```

Runtime recomendado para esta plantilla: **Node.js 24+**.

## Versiones de Frameworks

- NestJS: 11.x (las dependencias de api usan `@nestjs/*` `^11.0.1`)
- Next.js: 16.2.1
- Directus: 11.14.1 (imagen Docker `directus/directus:11.14.1`)

Ejecutar solo una app:

```sh
pnpm --filter api dev
pnpm --filter web dev
pnpm --filter cms dev
```

## Qué Incluye

Este Turborepo incluye:

- `api`: backend en [NestJS](https://nestjs.com/)
- `web`: frontend en [Next.js](https://nextjs.org/)
- `cms`: proyecto [Directus](https://directus.io/) con Docker Compose
- `@repo/ui`: librería de componentes React compartida
- `@repo/types`: contratos API y tipado DTO compartidos entre frontend y backend
- `@repo/eslint`: configuraciones compartidas de `eslint`
- `@repo/typescript`: archivos `tsconfig.json` compartidos en el monorepo

Todas las apps/paquetes usan [TypeScript](https://www.typescriptlang.org/).

## Puertos Locales por Defecto

- `api`: `http://localhost:3000`
- `web`: `http://localhost:3001`
- `cms`: `http://localhost:3002` (el contenedor mapea al `8055` interno de Directus)

## Variables de Entorno

### API (Nest + Fastify Kit)

La API usa `@authuser/nest-fastify-kit` en `apps/api/src/main.ts`.

Requisitos importantes:

- Si mantienes `docs: process.env.NODE_ENV !== 'production'`, instala `@nestjs/swagger` en `apps/api`.
- Para el stack Fastify, incluye también `@fastify/static` en `apps/api`.
- Si eliminas/desactivas `docs`, `@nestjs/swagger` deja de ser necesario.
- Puedes partir de `apps/api/.env.example` para entorno local.

### Web (Next.js)

- Puedes partir de `apps/web/.env.example` para entorno local.

### CMS (Directus)

Antes de arrancar `cms`, crea `apps/cms/.env` a partir de `apps/cms/.env.example`.

Ejemplo mínimo:

```env
DIRECTUS_SECRET=replace-with-a-long-random-value
```

Si Docker no está levantado, `pnpm dev` fallará en el proceso `cms`.

## Flujo CI/CD y Releases

- `pnpm test:ci` ejecuta lint, typecheck, tests unit/e2e y validación de Docker Compose (`apps/cms/docker-compose.yml` y `docker-compose.yml` en la raíz).
- Los conventional commits se validan localmente con Husky y Commitlint.
- `semantic-release` genera versión, tags Git, release en GitHub, release en GitLab y `CHANGELOG.md` desde CI/CD.
- GitHub Actions y GitLab CI incluyen pipelines de verificación y release para la rama por defecto.

### Secrets requeridos en CI

- `GITHUB_TOKEN` para releases de GitHub.
- `GITLAB_TOKEN` para releases de GitLab.

En GitLab, define ambas variables. En GitHub, `GITHUB_TOKEN` ya está disponible en workflows; solo agrega `GITLAB_TOKEN`.

### Hooks locales

- `pre-commit`: formatea staged files con Prettier
- `commit-msg`: valida conventional commits
- `pre-push`: ejecuta la suite completa de verificación local

### Docker y Compose

Hay **tres Dockerfiles** (una imagen de producción por app). CI construye exactamente estas rutas.

| App                          | Dockerfile            | Contexto de build          |
| ---------------------------- | --------------------- | -------------------------- |
| API (NestJS)                 | `apps/api/Dockerfile` | Raíz del repositorio (`.`) |
| Web (Next.js standalone)     | `apps/web/Dockerfile` | Raíz del repositorio (`.`) |
| CMS (Directus + extensiones) | `apps/cms/Dockerfile` | `apps/cms`                 |

Compilar las tres imágenes en local (sin Compose):

```sh
pnpm docker:build
```

**Archivos Compose**

- **`docker-compose.yml` (raíz del repo)** — Orquesta **api**, **web** y **cms**: cada servicio hace **build** con su Dockerfile (incluida la imagen de CMS desde `apps/cms/Dockerfile`, que incluye `extensions` en la imagen). Los puertos publicados en el host coinciden con [Puertos locales por defecto](#puertos-locales-por-defecto) (`3002` mapea al `8055` interno de Directus). Desde la raíz del repo:

    ```sh
    pnpm docker:compose:up      # docker compose up --build
    pnpm docker:compose:down   # docker compose down
    pnpm docker:compose:validate
    ```

    En la red por defecto de Compose, los contenedores se resuelven por nombre de servicio (por ejemplo `http://api:3000`, `http://web:3001`, `http://cms:8055`).

- **`apps/cms/docker-compose.yml`** — Levanta **solo Directus** con la imagen **publicada** `directus/directus` (sin `docker build` de `apps/cms/Dockerfile`). Las carpetas de extensiones se montan desde el host. Es lo que usa `pnpm --filter cms dev` desde el paquete `cms`.

## Agentes y Skills de Copilot

Este repositorio usa archivos de personalización compatibles con GitHub Copilot.

### Agentes personalizados

- `.github/agents/backend.agent.md`: enfocado en backend NestJS y contratos compartidos
- `.github/agents/frontend.agent.md`: enfocado en frontend Next.js e integración UI
- `.github/agents/devops.agent.md`: enfocado en CI/CD, releases y Docker

### Skills

- `.github/skills/shared-contracts/SKILL.md`: guía para alineación de tipos backend/frontend
- `.github/skills/release-and-cicd/SKILL.md`: guía para semantic-release, CI/CD y automatización Docker
- `.github/skills/directus-cms/SKILL.md`: guía para workflows de Directus y contenedores CMS

Los placeholders anteriores `.agents/agents/*.ts` no son un formato válido para coding agents de GitHub Copilot. El layout soportado usa `.github/agents/*.agent.md` y `.github/skills/<name>/SKILL.md`.

## Testing

- `pnpm test`: tests unitarios (api + web + ui)
- `pnpm test:e2e`: tests end-to-end (api + web)
- `pnpm test:ci`: lint + typecheck + tests + validación de Compose (solo cms y stack de la raíz)

Nota para Playwright: en una máquina nueva puede requerir instalación de navegador.
En CI de este repo, Playwright se instala antes de ejecutar `test:e2e`.

## Build

Compilar todas las apps y paquetes:

```sh
pnpm exec turbo build
```

Compilar una app/paquete:

```sh
pnpm exec turbo build --filter=web
```

## Desarrollo

Ejecutar todas las apps y paquetes en desarrollo:

```sh
pnpm exec turbo dev
```

Ejecutar una app/paquete:

```sh
pnpm exec turbo dev --filter=api
```

## Remote Caching

Turborepo soporta [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) para compartir artefactos de caché entre máquinas y CI/CD.

```sh
pnpm exec turbo login
pnpm exec turbo link
```

## Enlaces Útiles

Más sobre Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
