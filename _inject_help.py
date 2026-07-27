#!/usr/bin/env python3
"""Agrega css/help.css y js/help.js a cada HTML del prototipo si no están.
Se ejecuta una sola vez tras crear los archivos. Idempotente."""
import pathlib
import re

HTMLS = [
    "index.html", "dashboard.html", "reservas.html", "cobros.html",
    "clientes.html", "pos.html", "caja.html", "membresias.html",
    "torneos.html", "inventario.html", "promociones.html",
    "reportes.html", "usuarios.html", "404.html",
]

CSS_LINK = '<link rel="stylesheet" href="css/help.css" />'
JS_TAG   = '<script src="js/help.js"></script>'

root = pathlib.Path(__file__).parent

for name in HTMLS:
    path = root / name
    if not path.exists():
        print(f"skip (missing): {name}")
        continue
    text = path.read_text(encoding="utf-8")
    changed = False

    # add CSS before </head> if missing
    if 'css/help.css' not in text:
        # insert after the last existing stylesheet link, or before </head>
        text = re.sub(r"(\s*)</head>", f"\n  {CSS_LINK}\\1</head>", text, count=1)
        changed = True

    # add JS before </body> if missing
    if 'js/help.js' not in text:
        text = re.sub(r"(\s*)</body>", f"\n  {JS_TAG}\\1</body>", text, count=1)
        changed = True

    if changed:
        path.write_text(text, encoding="utf-8")
        print(f"updated: {name}")
    else:
        print(f"ok (already): {name}")

print("done.")
