#!/usr/bin/env bash
#MISE description="Sync mise tools and Bun dependencies"

set -euo pipefail

mise install
mise prune -y
