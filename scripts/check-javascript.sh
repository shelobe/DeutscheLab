#!/usr/bin/env bash
# Parse tracked JavaScript without executing browser application code.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
checked=0
failed=0
while IFS= read -r -d '' file; do
  checked=$((checked + 1))
  if ! node --check "$file"; then
    failed=$((failed + 1))
  fi
done < <(git ls-files -z -- '*.js' '*.mjs' '*.cjs')
if (( checked == 0 )); then
  echo 'No tracked JavaScript files found.' >&2
  exit 1
fi
echo "Checked $checked JavaScript files; $failed failed."
(( failed == 0 ))
