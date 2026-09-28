#!/usr/bin/env bash
#MISE description="Sync mise tools and Bun dependencies"

mise install
mise prune -y
mise exec -- bun install --frozen-lockfile
