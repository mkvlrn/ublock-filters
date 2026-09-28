#!/usr/bin/env bash
#MISE description="Run tests for changed files"

mise exec -- bun test --changed --bail --reporter=dots "$@"
