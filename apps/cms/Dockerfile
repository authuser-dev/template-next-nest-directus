FROM directus/directus:11.14.1

USER root

RUN mkdir -p /directus/database /directus/uploads /directus/extensions \
  && chown -R node:node /directus

USER node

WORKDIR /directus

COPY --chown=node:node ./extensions ./extensions

EXPOSE 8055