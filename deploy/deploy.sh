#!/usr/bin/env bash
#
# Build the site and deploy it to the Hostinger VPS.
#
#   ./deploy/deploy.sh
#
# The site is a Next.js static export (see next.config.ts) served by an
# nginx:alpine container behind the box's existing Traefik. This script builds
# out/, uploads it, and verifies the result against the server directly.
#
# It does NOT touch the veritas app stack. The marketing site has its own
# Traefik router at priority=1000; see deploy/docker-compose.yml.

set -euo pipefail

VPS_HOST="${VPS_HOST:-root@2.25.185.39}"
VPS_KEY="${VPS_KEY:-$HOME/.ssh/id_ed25519_veritas_vps}"
REMOTE_DIR="/opt/veritas-site/html"
DOMAIN="www.veritas-screening.com"
VPS_IP="2.25.185.39"

cd "$(dirname "$0")/.."

echo "==> Building static export"
npm run build

if [ ! -d out ]; then
  echo "ERROR: out/ was not produced. Is output:\"export\" still set in next.config.ts?" >&2
  exit 1
fi

echo "==> Uploading $(find out -type f | wc -l | tr -d ' ') files to $VPS_HOST:$REMOTE_DIR"

# COPYFILE_DISABLE stops macOS tar writing AppleDouble (._*) resource-fork
# files alongside every real file — 97 of them ended up on the server the first
# time this was done by hand.
#
# --delete removes files on the server that no longer exist in the build, so a
# deleted page doesn't linger. Excludes are belt-and-braces.
COPYFILE_DISABLE=1 rsync -az --delete \
  --exclude '._*' --exclude '.DS_Store' \
  -e "ssh -i $VPS_KEY -o BatchMode=yes" \
  out/ "$VPS_HOST:$REMOTE_DIR/"

echo "==> Verifying against the VPS directly (bypasses DNS and local cache)"
fail=0
check() { # path, expected status
  local path="$1" want="$2" got
  got=$(curl -sS --resolve "$DOMAIN:443:$VPS_IP" -o /dev/null \
        -w '%{http_code}' --max-time 15 "https://$DOMAIN$path")
  if [ "$got" = "$want" ]; then
    printf '    %-16s %s\n' "$path" "$got"
  else
    printf '    %-16s %s  EXPECTED %s\n' "$path" "$got" "$want"
    fail=1
  fi
}

check "/"            200
check "/services/"   200
check "/about/"      200
check "/compliance/" 200
check "/contact/"    200
check "/robots.txt"  200
# /privacy is gated by sections.showPrivacyPolicy — it must NOT be reachable
# while that flag is false. Static export still emits a 404 document there;
# nginx.conf turns it into a real 404.
check "/privacy"     404

if [ "$fail" -ne 0 ]; then
  echo "==> DEPLOY VERIFICATION FAILED — check the statuses above" >&2
  exit 1
fi

echo "==> Deployed OK"
echo
echo "    Rollback:  ssh -i $VPS_KEY $VPS_HOST 'cd /opt/veritas-site && docker compose down'"
echo "    (Traefik then falls back to the veritas app router, which also matches these hostnames.)"
