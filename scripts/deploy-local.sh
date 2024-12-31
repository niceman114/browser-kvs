#!/bin/sh

SCRIPT_DIR=$(dirname "$(realpath "$0")")
PROJECT_ROOT=$(dirname "${SCRIPT_DIR}")

node "${PROJECT_ROOT}/scripts/dist-package-json.cjs"
cp "$PROJECT_ROOT"/README.md "$PROJECT_ROOT"/dist
cd "${PROJECT_ROOT}"/dist || exit 1
PACKED_FILE=$(npm pack)
mv "${PACKED_FILE}" "${PROJECT_ROOT}"
echo "Distribute completed."
echo "To install this package in your project locally, go to the root of your project and run the command below."
echo "> npm install ${PROJECT_ROOT}/${PACKED_FILE}"
