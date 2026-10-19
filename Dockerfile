# syntax=docker/dockerfile:1@sha256:4edf897a3ffa55b89f906fc8cc78afdb3f1834cc9c7083565e611a8a7d5fe99e

# build: installs mise, then the toolchain pinned in .config/mise.toml, and runs the `build` task
FROM debian:trixie-slim@sha256:918311b7b6c4c6f68b232ba516584925f6c78ad82b6fd534b98979df6438e483 AS build

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl libatomic1 \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL https://mise.run | sh
ENV PATH="/root/.local/bin:/root/.local/share/mise/shims:${PATH}"
ENV MISE_YES=1
ENV MISE_TRUSTED_CONFIG_PATHS=/app

WORKDIR /app
COPY .config/ ./.config/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
RUN mise install

COPY src/ ./src/
RUN mise run build

# runtime: same Debian base as the build stage, so the glibc-linked executable runs as built
FROM debian:trixie-slim@sha256:918311b7b6c4c6f68b232ba516584925f6c78ad82b6fd534b98979df6438e483 AS runtime

RUN useradd --system --uid 10001 --no-create-home app

WORKDIR /app
COPY --from=build --chown=app:app /app/bin/ublock-filters ./ublock-filters

USER app

ENTRYPOINT ["./ublock-filters"]
