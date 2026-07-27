# Pro Padel — Guía de demo

Recorrido narrado para presentar el prototipo al cliente. Sigue las pantallas en orden; cada una tiene un punto de conversación y una acción.

> **Tip:** el botón 🔗 de la barra flotante inferior copia una URL con el estado exacto de la pantalla (tema, densidad, rol, modal abierto). Úsalo si quieres enviar una pantalla específica por correo.

---

## Preparación

```bash
cd prototipo
python3 serve.py
# abre http://localhost:8000
```

Tema por defecto: **Claro**. Cambia a **Oscuro** desde la barra inferior si presentas en pantalla grande con luz baja.

Cambia el rol (Admin / Gerente / Recepción) para mostrar cómo cambian los accesos: en modo Recepción desaparece el módulo "Usuarios y permisos" del sidebar.

---

## 1. Inicio de sesión — `index.html`

Muestra el sistema con marca y datos rápidos del club en el hero izquierdo. En el formulario derecho el usuario elige su rol y entra.

*Punto de conversación:* diez roles diferentes, doble autenticación obligatoria para administradores.

**Acción:** click en **Entrar al sistema** → va al tablero.

---

## 2. Tablero de control — `dashboard.html`

Vista principal del gerente. KPIs del día, ingresos por área, ocupación por cancha, alertas activas, membresías por vencer, entrenadores en cancha.

*Punto de conversación:* toda la información operativa en una sola pantalla, actualizada en tiempo real.

**Acción:** en el sidebar, entra a **Reservas**.

---

## 3. Reservas — `reservas.html`

Calendario visual por hora y por cancha. Colores diferencian confirmadas, tentativas, clases y torneos. Espacios libres son clicables.

*Punto de conversación:* el corazón operativo del club. Recepción ve toda la ocupación de un vistazo y evita choques.

**Acción:** click en **＋ Nueva reserva** en la barra superior → abre un modal con datos de ejemplo y descuento Premium ya aplicado. Click en **Reservar y cobrar** → pasa a Cobros.

---

## 4. Cobros — `cobros.html`

Pantalla de cobro de una reserva. Muestra las 8 formas de pago, división entre 4 jugadores, descuento Premium, IVA, opción de facturación CFDI 4.0 con RFC y envío por correo.

*Punto de conversación:* módulo más sensible. Cada cobro genera folio, comprobante y bitácora. Reembolsos requieren autorización de gerente.

**Acción:** click en **✓ Cobrar** → toast de éxito y regresa al tablero. Muestra también el historial de cobros recientes al final de la pantalla.

---

## 5. Clientes — `clientes.html`

Lista de clientes a la izquierda con chips de estado (activo, vencida, adeudo), expediente completo del cliente seleccionado a la derecha: nivel de juego, contacto de emergencia, saldo, RFC, y tabs de historial (reservas, pagos, productos, torneos, notas internas).

*Punto de conversación:* el sistema detecta duplicados por teléfono o correo automáticamente.

**Acción:** cambia entre las pestañas para mostrar el historial completo del cliente.

---

## 6. Membresías — `membresias.html`

Los 5 planes vigentes con precios, beneficios y clientes activos. Debajo, tabla con clientes que tienen membresía activa, incluyendo estados de congelamiento y vencimiento.

*Punto de conversación:* alertas automáticas 15, 7 y 1 día antes del vencimiento. Congelamientos extienden vigencia sin cobrar.

**Acción:** click en **＋ Nuevo plan** para mostrar el editor de planes.

---

## 7. Punto de venta — `pos.html`

Catálogo visual de productos por categoría a la izquierda (deportivos, ropa, bebidas, cocina, snacks, servicios), ticket del cliente a la derecha con línea a línea, descuento por membresía, propina sugerida, IVA y total.

*Punto de conversación:* mismo POS opera para tienda y bar. Comandas para cocina se imprimen aparte. Cada venta descuenta stock automáticamente.

**Acción:** click en cualquier producto para agregar al ticket (muestra toast). Click en **✓ Cobrar** para cerrar la venta.

---

## 8. Inventario — `inventario.html`

Existencias por producto, con costo, precio de venta, margen, ubicación y estado (OK, bajo, vence próximo). Tabs para movimientos, alertas, toma física y proveedores.

*Punto de conversación:* alertas automáticas de stock bajo y caducidad. Cada movimiento (entrada, salida, merma, cortesía) queda registrado con motivo y usuario.

**Acción:** cambia a la pestaña **Alertas** para mostrar el semáforo de reorden. Click en **＋ Entrada mercancía** para mostrar el modal de recepción.

---

## 9. Torneos y ligas — `torneos.html`

Vista del torneo actual (Verano 2026) con bracket armado, parejas inscritas, calendario de partidos y estado en tiempo real. Tabs para gestionar pagos y ver todos los torneos.

*Punto de conversación:* el sistema arma el bracket automáticamente. Los pagos de inscripción viven en Cobros como cualquier otro cobro.

**Acción:** click en **＋ Nuevo torneo** para mostrar el editor: tipos (torneo, liga, reta, clínica, evento corporativo, cumpleaños), formatos (eliminación directa, round robin) y categorías.

---

## 10. Caja — `caja.html`

Turno vespertino abierto por Diego Ramírez con fondo inicial. Muestra desglose del turno por forma de pago y por área, movimientos manuales (gastos, propinas) y bitácora en vivo de todos los movimientos con hora, método y usuario.

*Punto de conversación:* al cierre el sistema calcula el efectivo esperado; recepción cuenta el físico y captura la diferencia con justificación firmada por el gerente.

**Acción:** click en **Cerrar caja (Z)** → muestra modal de arqueo con una diferencia negativa de −$85 pesos como ejemplo real.

---

## 11. Reportes — `reportes.html`

Cuatro pestañas: Financieros (ingresos vs meses anteriores, distribución por área), Deportivos (mapa de calor de ocupación por día/hora, entrenadores más activos), Comerciales (productos más vendidos, ticket promedio, clientes VIP) y Bitácora (auditoría completa con usuario, hora y dispositivo).

*Punto de conversación:* todo exportable a Excel y PDF. La bitácora responde la pregunta "¿quién hizo qué y desde qué computadora?"

**Acción:** cambia entre las 4 pestañas para mostrar cada tipo de reporte.

---

## 12. Promociones — `promociones.html`

Cards con las promociones activas: cupón, hora feliz, cumpleaños, socios, referidos, paquetes, empleados. Cada una con métricas de uso. Debajo, tabla de descuentos manuales autorizados con nombre del gerente que autorizó.

*Punto de conversación:* motor completo de promociones con vencimiento y restricciones. Todo descuento fuera de una promoción activa requiere autorización con firma.

---

## 13. Usuarios y permisos — `usuarios.html`

Solo visible en rol Admin. Tres pestañas: Usuarios (los 18 usuarios del club con estado, 2FA, último acceso), Roles y permisos (matriz visual de 10 roles × 9 permisos) y Seguridad (2FA, respaldos, cifrado, cláusula de propiedad de datos).

*Punto de conversación:* cambia el rol en la barra inferior a **Recepción** para mostrar cómo desaparece este módulo del sidebar automáticamente.

---

## Ajustes en vivo durante la demo

- **Cambiar tema** — barra inferior, Claro / Oscuro.
- **Cambiar densidad** — Cómodo / Compacto (ideal si el cliente comenta que las filas son muy grandes).
- **Cambiar rol** — Admin / Gerente / Recepción muestra distintos menús del sidebar.
- **Recientes** — Shift + ? abre el drawer con las últimas pantallas visitadas.

## Qué es real y qué es ficticio

**Real:**
- Estructura, navegación y flujos entre pantallas.
- Diseño visual final aprobable como referencia para el desarrollo.
- Nombres de campos, columnas de tabla, estados, permisos, formas de pago.
- Diseño responsive (móvil, tablet, desktop).

**Ficticio:**
- Todos los datos (clientes, precios, existencias, torneos, ingresos).
- Los cálculos: los botones muestran toasts, no procesan cobros reales.
- No hay base de datos ni backend — es solo HTML/CSS/JS estático.

## Pendientes para la implementación real

- Integración con proveedor de facturación electrónica autorizado por el SAT.
- Integración con terminal bancaria (Clip, Mercado Pago, etc.).
- App móvil para clientes (fase posterior).
- Portal de autoservicio para reservas del cliente final (fase posterior).
