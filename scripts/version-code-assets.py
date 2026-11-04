#!/usr/bin/env python3
"""Version local HTML code assets by content without changing loading order."""
import hashlib
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
page = root / "index.html"
source = page.read_text()
pattern = re.compile(r'(?P<prefix>\b(?:src|href)=["\'])(?P<url>\./[^"\']+\.(?:js|css)(?:\?[^"\']*)?)(?P<quote>["\'])')
count = 0
def version(match):
    global count
    url = match["url"]
    path, _, query = url.partition("?")
    asset = root / path.removeprefix("./")
    digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:16]
    params = [p for p in query.split("&") if p and not p.startswith("v=")]
    params.append("v=" + digest)
    count += 1
    return match["prefix"] + path + "?" + "&".join(params) + match["quote"]
result = pattern.sub(version, source)
if not count:
    raise SystemExit("No local code references found")
page.write_text(result)
print(f"Versioned {count} local script and stylesheet references")
