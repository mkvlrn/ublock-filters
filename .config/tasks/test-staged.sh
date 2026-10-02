#!/usr/bin/env bash
#MISE description="Run tests for changed files"

set -euo pipefail

mise exec -- bun test --changed --bail --reporter=dots "$@"
