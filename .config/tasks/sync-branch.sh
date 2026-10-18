#!/usr/bin/env bash
#MISE description="Sync mise tools and pnpm dependencies"

set -euo pipefail

mise install
mise prune -y
