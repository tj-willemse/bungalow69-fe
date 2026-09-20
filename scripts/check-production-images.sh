#!/usr/bin/env bash

set -euo pipefail

if rg -n "\\.(png|jpe?g)([?\\\"']|$)" app components lib; then
  echo "Production code references a PNG or JPEG. Convert it to WebP before building."
  exit 1
fi

echo "Production raster references use WebP."
