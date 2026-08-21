FROM oven/bun:1.4.0-alpine@sha256:07235578f79ef8c6f97d94aee7938e76f5cdba5f21ae5dbfdd3d3d38058437eb

WORKDIR /app

COPY package.json tsconfig.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile --production --ignore-scripts
COPY src/ ./src/
USER bun

CMD ["bun", "src/main.ts"]
