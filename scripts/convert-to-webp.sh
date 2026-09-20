#!/usr/bin/env bash

set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required. Install the WebP utilities before converting images."
  exit 1
fi

if [ "$#" -eq 0 ]; then
  echo "Usage: npm run images:webp -- path/to/image.png [more-images...]"
  exit 1
fi

quality="${WEBP_QUALITY:-85}"

for source in "$@"; do
  if [ ! -f "$source" ]; then
    echo "Image not found: $source"
    exit 1
  fi

  case "${source##*.}" in
    png|PNG|jpg|JPG|jpeg|JPEG) ;;
    *)
      echo "Unsupported input format: $source"
      exit 1
      ;;
  esac

  output="${source%.*}.webp"
  cwebp -quiet -q "$quality" -m 6 -mt -metadata none "$source" -o "$output"
  echo "Created $output"
done
