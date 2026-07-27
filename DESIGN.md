# Pro Padel — Design tokens

## Themes

### `light` (default) — Estudio Claro
Fondo blanco cálido, tinta casi negra, verde pádel como único acento.

```
--surface:  250 251 249    /* off-white, ligero verde */
--elevated: 255 255 255    /* tarjetas puras */
--accent:    16 129  76    /* verde pádel #10814C */
--muted:    148 163 158    /* gris frío */
--ink:       17  24  22    /* casi negro con verde */
--ink2:      82  99  92    /* gris tinta secundaria */
--radius: 10px
```

### `dark` — Nocturno
Fondo carbón, tinta clara, mismo verde acento (más brillante para contraste).

```
--surface:   14  20  18
--elevated:  22  30  27
--accent:    38 191 117    /* verde pádel brillante #26BF75 */
--muted:     92 108 102
--ink:      232 240 236
--ink2:     158 176 168
--radius: 10px
```

## Layouts (densidad)

- **`comodo`** (default) — padding amplio, filas altas. Ideal para monitor grande.
- **`compacto`** — padding reducido, más filas visibles. Ideal para operador experto.

## Personas (roles)

- **`admin`** (default) — Administrador general, ve todos los módulos.
- **`gerente`** — Ve todo excepto configuración de usuarios.
- **`recepcion`** — Ve reservas, cobros, clientes, POS, caja. Oculto: finanzas, usuarios.

## Typography

- Heading: `Manrope` 600/700
- Body: `Inter` 400/500

## Iconografía

Emojis Unicode simples usados con moderación (📅 ⚽ 💳 👥 🎾 🏆 💰 📊) para claridad en menús. Sin iconografía de terceros (evita dependencias).

## Estilo visual

- Sidebar oscuro-verdoso izquierdo (persistente en todas las pantallas post-login).
- Contenido principal con tarjetas blancas / elevadas, bordes suaves.
- Tablas densas con filas alternadas sutiles.
- KPIs en tarjetas con valor grande + delta pequeño.
- Estados usan color plano con opacidad baja: verde (activo/pagado), ámbar (pendiente), rojo (vencido/cancelado), gris (histórico).
- Nada de degradados. Nada de sombras dramáticas. Un acento verde y ya.
