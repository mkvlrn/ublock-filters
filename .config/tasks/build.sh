#!/usr/bin/env bash
#MISE description="Build executable with bun"

set -euo pipefail

rm -rf ./bin
mise exec -- bun build --compile --minify --bytecode ./src/main.ts --outfile ./bin/ublock-filters
mise exec -- upx --best ./bin/ublock-filters
