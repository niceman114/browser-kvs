#!/bin/sh

SCRIPT_DIR=$(dirname "$(realpath "$0")")
PROJECT_ROOT=$(dirname "${SCRIPT_DIR}")

node "${PROJECT_ROOT}"/scripts/dist-package-json.cjs
cp "${PROJECT_ROOT}"/README.md "${PROJECT_ROOT}"/dist/
npm publish "$PROJECT_ROOT"/dist
