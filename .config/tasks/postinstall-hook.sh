#!/usr/bin/env bash
#MISE description="Install Git hooks"

set -euo pipefail

mise exec -- bun install --frozen-lockfile
mise exec -- lefthook install
