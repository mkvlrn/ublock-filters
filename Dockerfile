FROM oven/bun:1.3.14-alpine

WORKDIR /app

COPY package.json tsconfig.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile --production --ignore-scripts
COPY src/ ./src/
USER bun

CMD ["bun", "src/main.ts"]
