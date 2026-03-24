#!/usr/bin/env bash
set -euo pipefail

echo "==> Starting deploy in: $(pwd)"

echo "==> git pull"
git pull

echo "==> npm i"
npm i

echo "==> npm run build"
npm run build

echo "==> pm2 reset all"
pm2 reset all

echo "==> Deploy steps completed successfully."
