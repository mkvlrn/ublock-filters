# syntax=docker/dockerfile:1@sha256:572cebbc2b15e6f84c077742952674889cb63cd5e9b80abdffcbe587b6f19183

# build: installs mise, then the toolchain pinned in .config/mise.toml, and runs the `build` task
FROM debian:trixie-slim@sha256:ab3b3c8c5159eebfca4376430132d53c4d425f869c765ecbe47177a030da575d AS build

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
FROM debian:trixie-slim@sha256:ab3b3c8c5159eebfca4376430132d53c4d425f869c765ecbe47177a030da575d AS runtime

RUN useradd --system --uid 10001 --no-create-home app

WORKDIR /app
COPY --from=build --chown=app:app /app/bin/ublock-filters ./ublock-filters

USER app

ENTRYPOINT ["./ublock-filters"]
