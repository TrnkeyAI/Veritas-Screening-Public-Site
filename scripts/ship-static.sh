#!/usr/bin/env bash
#
# Build the static export with GlitchTip wired in, then ship it to the VPS.
# Round 2 of the GlitchTip rollout: CODE + PROVISIONING ONLY this round — do
# NOT run this script. The orchestrator runs it later, one deploy at a time.
#
#   ./scripts/ship-static.sh
#
# Reads .env.ship (gitignored) for the NEXT_PUBLIC_SENTRY_* build-time values
# so a real DSN never lands in git (.env.example documents the placeholders).
#
# This supersedes nothing in deploy/deploy.sh — it is the same build-and-ship
# shape (see deploy/deploy.sh for the original, DSN-less version) with the
# env file sourced first and a rollback copy taken on the box before the
# sync deletes anything.

set -euo pipefail

VPS_HOST="${VPS_HOST:-egc-vps}"
REMOTE_DIR="/opt/veritas-site/html"
DOMAIN="www.veritas-screening.com"
VPS_IP="2.25.242.181"

cd "$(dirname "$0")/.."

if [ -f .env.ship ]; then
  echo "==> Loading .env.ship"
  set -a
  # shellcheck disable=SC1091
  source .env.ship
  set +a
else
  echo "WARNING: .env.ship not found — building without a GlitchTip DSN (errors/perf monitoring will no-op)." >&2
fi

echo "==> Installing dependencies (npm ci)"
npm ci

echo "==> Building static export"
NODE_OPTIONS=--max-old-space-size=3072 npm run build

if [ ! -d out ]; then
  echo "ERROR: out/ was not produced. Is output:\"export\" still set in next.config.ts?" >&2
  exit 1
fi

echo "==> Snapshotting the current live folder on the box for rollback"
ssh "$VPS_HOST" \
  'rm -rf /opt/veritas-site/html.prev && cp -a /opt/veritas-site/html /opt/veritas-site/html.prev'

echo "==> Uploading $(find out -type f | wc -l | tr -d ' ') files to $VPS_HOST:$REMOTE_DIR"

if command -v rsync >/dev/null 2>&1; then
  # COPYFILE_DISABLE stops macOS tar writing AppleDouble (._*) resource-fork
  # files alongside every real file. --delete removes files on the server that
  # no longer exist in the build, so a deleted page doesn't linger.
  COPYFILE_DISABLE=1 rsync -az --delete \
    --exclude '._*' --exclude '.DS_Store' \
    -e "ssh" \
    out/ "$VPS_HOST:$REMOTE_DIR/"
else
  # rsync isn't installed on this machine's Git Bash (Windows). Fall back to
  # clearing the remote folder and streaming a tarball over ssh, which gives
  # the same "no stale files linger" guarantee as --delete.
  echo "    (rsync not found locally, falling back to tar-over-ssh)"
  ssh "$VPS_HOST" "find '$REMOTE_DIR' -mindepth 1 -delete"
  tar czf - --exclude='._*' --exclude='.DS_Store' -C out . \
    | ssh "$VPS_HOST" "tar xzf - -C '$REMOTE_DIR'"
fi

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
check "/privacy"     404

if [ "$fail" -ne 0 ]; then
  echo "==> DEPLOY VERIFICATION FAILED — check the statuses above" >&2
  echo "    Rollback:  ssh $VPS_HOST 'rm -rf /opt/veritas-site/html && mv /opt/veritas-site/html.prev /opt/veritas-site/html'" >&2
  exit 1
fi

echo "==> Deployed OK"
echo
echo "    Rollback (restore previous build):"
echo "      ssh $VPS_HOST 'rm -rf /opt/veritas-site/html && mv /opt/veritas-site/html.prev /opt/veritas-site/html'"
echo "    Rollback (drop the site entirely, fall back to the veritas app router):"
echo "      ssh $VPS_HOST 'cd /opt/veritas-site && docker compose down'"
