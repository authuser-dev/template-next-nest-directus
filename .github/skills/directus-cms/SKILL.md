---
name: directus-cms
description: "Use when working on the Directus CMS app, Docker Compose setup, isolated CMS deployment, or changes under apps/cms."
---

# Directus CMS

This repository contains a Directus app under apps/cms that is operated primarily through Docker Compose and a dedicated Docker image.

## Use This Skill When

- A task mentions Directus
- A task changes files under apps/cms
- A task affects the CMS Dockerfile, Compose setup, or deployment behavior

## Workflow

1. Check apps/cms package scripts first to understand the operational flow.
2. Preserve the expectation that CMS can run independently from api and web.
3. If changing Docker behavior, ensure the image still matches the compose-based local workflow where possible.
4. Validate configuration with the existing CMS validation command when relevant.

## Guardrails

- Do not mix CMS runtime concerns with backend or frontend assumptions unless the task explicitly requires integration work.
- Keep CMS storage paths and environment handling explicit.
- Prefer operational clarity over heavy customization if Directus defaults already solve the need.
