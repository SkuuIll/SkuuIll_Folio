#!/usr/bin/env bash
# Restore COMPLETE upstream agent skills and their optional helper assets.
# Run from the repository root. This is never run by Astro or Cloudflare.
set -euo pipefail
cd "$(dirname "$0")/.."
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major<22||(major===22&&minor<20)){console.error("Skills CLI requires Node >=22.20");process.exit(1)}'
export DISABLE_TELEMETRY=1
SKILLS_CLI="skills@1.7.4"
echo "Installing five reviewed developer-only skills (Codex project scope)..."
npx --yes "$SKILLS_CLI" add szilu/ux-designer-skill --skill ux-designer -a codex -y --copy
npx --yes "$SKILLS_CLI" add anthropics/skills --skill canvas-design -a codex -y --copy
npx --yes "$SKILLS_CLI" add ParthJadhav/app-store-screenshots --skill app-store-screenshots -a codex -y --copy
npx --yes "$SKILLS_CLI" add Leonxlnx/taste-skill --skill design-taste-frontend -a codex -y --copy
npx --yes "$SKILLS_CLI" add JakubAntalik/transitions.dev --skill transitions-dev -a codex -y --copy
npx --yes "$SKILLS_CLI" list -a codex
echo "Skills are developer instructions; the App Store screenshot editor is NOT installed into the Astro web app."
