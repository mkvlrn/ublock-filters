#!/usr/bin/env bash
#MISE description="Run the project in watch mode"

set -euo pipefail

mise exec -- bun --watch src/main.ts
