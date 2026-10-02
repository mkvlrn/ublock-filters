#!/usr/bin/env bash
#MISE description="Run tests in CI mode"

set -euo pipefail

mise exec -- bun test --bail --reporter=dots "$@"
