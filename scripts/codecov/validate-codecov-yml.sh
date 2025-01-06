#!/bin/sh

PROJECT_ROOT=$(realpath "$0/../../..")

curl --data-binary @"${PROJECT_ROOT}"/.codecov.yml https://codecov.io/validate
