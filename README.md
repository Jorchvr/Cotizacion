# Pro Padel — Prototipo

> Sistema integral de gestión operativa para clubes de pádel en México. Prototipo visual navegable de los 11 módulos.

Prototipo clickeable. HTML puro + Tailwind por CDN + unos cuantos JS vanilla. Sin build step. Corre en cualquier navegador.

## Cómo ejecutarlo

Elige cualquiera:

```bash
# Recomendado — servidor sin caché
python3 serve.py
# abre http://localhost:8000

# Alternativas
python3 -m http.server 8000     # estándar, pero cachea agresivo
npx serve .                     # con Node
# o abre index.html directo en el navegador
```

**Por qué `serve.py`:** `python3 -m http.server` deja que el navegador cachee CSS/JS, lo cual hace que los cambios parezcan no aplicarse hasta un refresh forzado. `serve.py` envía `Cache-Control: no-store` para que cada recarga traiga archivos frescos.

## Características

- **13 pantallas** — login + dashboard + los 11 módulos. Ver `DEMO.md` para el recorrido narrado.
- **2 temas** — Claro (default) y Oscuro. Se cambian desde la barra inferior.
- **2 densidades** — Cómodo (default) y Compacto.
- **3 roles** — Admin, Gerente, Recepción. Cada uno ve un menú diferente en el sidebar.
- **URLs para compartir** — click en 🔗 de la barra copia una URL que reproduce el estado exacto (tema, densidad, rol, modal abierto, pestaña activa).
- **Feedback** — el botón 💬 siempre está activo. Click, luego click en cualquier elemento para dejar un comentario. Exporta el JSON al final.
- **Pantallas recientes** — Shift + ? abre el drawer con las últimas visitadas.

## Estructura de archivos

```
prototipo/
├── index.html         ← login
├── dashboard.html
├── reservas.html
├── cobros.html
├── clientes.html
├── membresias.html
├── pos.html
├── inventario.html
├── torneos.html
├── caja.html
├── reportes.html
├── promociones.html
├── usuarios.html
├── 404.html
├── css/
│   ├── styles.css     ← tokens de diseño por tema + estilos de la app
│   └── feedback.css
├── js/
│   ├── state.js       ← URL state + botón compartir
│   ├── theme.js       ← switcher de tema
│   ├── layout.js      ← switcher de densidad
│   ├── data.js        ← datos por persona (rol)
│   ├── persona.js     ← switcher de rol
│   ├── ui.js          ← toast, loading, skeletons
│   ├── app.js         ← modales, tabs, sidebar
│   └── feedback.js    ← overlay de comentarios
├── serve.py           ← servidor local sin caché
├── PRODUCT.md         ← contexto del producto
├── DESIGN.md          ← tokens y decisiones de diseño
├── DEMO.md            ← guía de presentación
└── README.md          ← este archivo
```

## Qué es real y qué no

**Real:**
- La estructura visual y de navegación.
- El diseño listo para usarse como referencia en el desarrollo.
- Los flujos entre pantallas.

**Ficticio:**
- Todos los datos mostrados (clientes, precios, ingresos, existencias) son ejemplos.
- No hay backend ni base de datos — los botones muestran toasts de simulación pero no procesan nada.

## Iterar sobre el prototipo

Para aplicar los comentarios del cliente (después de que use el botón 💬 y descargue el JSON):

```
/prototype apply-feedback feedback-<timestamp>.json
```

## Publicar (opcional)

La carpeta funciona en cualquier hosting estático (Vercel, Netlify, GitHub Pages, S3). Sin build.

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=.
```

---

Construido con [claude-prototype](https://github.com/kurenn/claude-prototype).
