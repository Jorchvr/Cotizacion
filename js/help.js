/* Pro Padel — Instrucciones por pantalla + Chatbot informativo
 * Se auto-inicializa en cada página. No requiere configuración por HTML.
 */
(function () {
  // ============================================================
  // CONTENIDO — Instrucciones por pantalla
  // ============================================================
  const PAGES = {
    'index.html': {
      icon: '🔐',
      title: 'Cómo funciona el ingreso',
      description:
        'Cada usuario del club (dueño, gerente, recepción, entrenador, bar, almacén, etc.) tiene su propio acceso ' +
        'con un rol asignado. Solo verá los módulos y datos que le correspondan.',
      steps: [
        'Selecciona tu tipo de usuario en las pestañas superiores.',
        'Escribe tu correo o nombre de usuario y tu contraseña.',
        'Si eres administrador, el sistema te pedirá también un código de doble factor (2FA) para mayor seguridad.',
        'Al entrar, el sistema abre el tablero adecuado a tu rol.',
      ],
    },
    'dashboard.html': {
      icon: '📊',
      title: 'Cómo funciona el Tablero',
      description:
        'Es la pantalla principal del sistema. De un vistazo el gerente o dueño ve cómo va el club hoy: ' +
        'ocupación de canchas, ingresos del día, membresías activas, alertas importantes y próximos eventos.',
      steps: [
        'Los números grandes de arriba muestran los indicadores clave (KPIs) del día.',
        'Las gráficas comparan el desempeño con días o meses anteriores.',
        'Las tarjetas de "alertas" avisan de cosas que requieren atención (bajo stock, membresías por vencer, etc.).',
        'Se puede cambiar el rango de fechas para ver la información de la semana, el mes o el año.',
      ],
    },
    'reservas.html': {
      icon: '📅',
      title: 'Cómo funciona el módulo de Reservas',
      description:
        'Agenda visual de las 6 canchas del club. Muestra en un solo pantallazo qué canchas están libres, ' +
        'cuáles ocupadas, quién reservó, y a qué hora. Es la pantalla que más usa la recepción.',
      steps: [
        'Haz clic en un espacio libre (blanco) para crear una nueva reserva.',
        'Haz clic en una reserva existente para ver el detalle: cliente, jugadores, pago, notas.',
        'Usa los filtros superiores para ver un día específico, una cancha o un cliente.',
        'Desde una reserva se puede cobrar, cancelar, reprogramar o enviar recordatorio por WhatsApp.',
      ],
    },
    'cobros.html': {
      icon: '💳',
      title: 'Cómo funciona el módulo de Cobros',
      description:
        'Pantalla para registrar el pago de una reserva o servicio. Permite dividir el costo entre varios ' +
        'jugadores, cobrar con distintos métodos, y enviar el comprobante directamente al cliente.',
      steps: [
        'Elige la reserva o servicio a cobrar.',
        'Selecciona la forma de pago: efectivo, tarjeta, transferencia o mixto.',
        'Si son varios jugadores, divide el cobro entre ellos.',
        'Al finalizar, el comprobante se puede imprimir o enviar por WhatsApp/correo al cliente.',
        'El cobro queda registrado automáticamente en la Caja del día.',
      ],
    },
    'clientes.html': {
      icon: '👥',
      title: 'Cómo funciona la Base de Clientes',
      description:
        'Aquí vive toda la información de los clientes y socios del club. Cada persona tiene una ficha con ' +
        'sus datos, historial de reservas, consumos y membresías. El sistema detecta duplicados automáticamente.',
      steps: [
        'Busca por nombre, teléfono o correo en la barra superior.',
        'Haz clic en un cliente para ver su ficha completa.',
        'Desde la ficha puedes: crear reserva rápida, ver historial, editar datos, agregar nota.',
        'Al crear un cliente nuevo, si el teléfono o correo ya existe, el sistema te avisa para evitar duplicados.',
      ],
    },
    'pos.html': {
      icon: '🛒',
      title: 'Cómo funciona el Punto de Venta (bar y tienda)',
      description:
        'Sistema para cobrar productos del bar/restaurante y de la tienda deportiva. Soporta comandas para ' +
        'cocina, propinas para meseros, códigos de barras y variantes de producto (talla, color).',
      steps: [
        'Escanea el código de barras del producto o búscalo por nombre.',
        'Ajusta cantidad, agrega variantes (talla/color) o descuentos.',
        'Si es una comanda de bar, marca a qué mesa o cancha va.',
        'Al cobrar, el sistema imprime el ticket y actualiza el inventario automáticamente.',
        'Al final del turno, el mesero puede ver sus propinas acumuladas.',
      ],
    },
    'caja.html': {
      icon: '💰',
      title: 'Cómo funciona el módulo de Caja',
      description:
        'Control diario de dinero. Cada turno se abre y se cierra la caja con un fondo inicial; el sistema ' +
        'lleva la cuenta de ingresos por área (canchas, bar, tienda), gastos, y calcula la utilidad del día.',
      steps: [
        'Al inicio del turno: se hace apertura de caja con el fondo inicial en efectivo.',
        'Durante el día: cada cobro y cada gasto queda registrado automáticamente.',
        'Se pueden capturar gastos manuales (compras, pagos a proveedores, etc.).',
        'Al cerrar el turno: se cuenta el efectivo físico y el sistema calcula si cuadra.',
        'El cierre genera un reporte imprimible para archivo/contabilidad.',
      ],
    },
    'membresias.html': {
      icon: '🎫',
      title: 'Cómo funciona el módulo de Membresías',
      description:
        'Gestión de los planes de membresía del club (mensual, trimestral, anual, familiar, corporativo, etc.). ' +
        'Cada plan puede incluir descuentos, horas de cancha, invitados o beneficios especiales.',
      steps: [
        'Ver la lista completa de socios activos, por vencer o vencidos.',
        'Alta de nuevo socio: se le asigna plan, forma de pago y beneficios.',
        'Congelamiento: pausa una membresía por vacaciones o lesión sin que pierda días.',
        'El sistema envía alertas automáticas antes de que una membresía venza.',
        'Al vencer, la membresía se marca inactiva y se le puede ofrecer renovación con descuento.',
      ],
    },
    'torneos.html': {
      icon: '🏆',
      title: 'Cómo funciona el módulo de Torneos y Ligas',
      description:
        'Organización completa de torneos internos y ligas. Registro de parejas por categoría, cobro de ' +
        'inscripción, generación automática de rondas y publicación de resultados.',
      steps: [
        'Crear un torneo: nombre, fechas, categorías y cuota de inscripción.',
        'Los participantes se inscriben (recepción o en línea, según la opción contratada).',
        'El sistema genera el cuadro (round-robin, eliminación directa o mixto).',
        'Los jueces o el árbitro capturan los resultados de cada partido.',
        'Al final, el sistema publica standings, ganadores y premios automáticos.',
      ],
    },
    'inventario.html': {
      icon: '📦',
      title: 'Cómo funciona el módulo de Inventario',
      description:
        'Control de stock de todos los productos del club: bar/restaurante, tienda deportiva y almacén. ' +
        'Registra entradas, salidas, mermas, y alerta cuando algo está por agotarse o caducar.',
      steps: [
        'Ver lista de productos con stock actual, mínimo y ubicación.',
        'Registrar entrada: cuando llega mercancía de proveedor.',
        'Registrar merma: producto roto, caducado o perdido.',
        'Alertas automáticas cuando un producto baja del stock mínimo o está cerca de caducar.',
        'Función de "inventario físico" para hacer conteos y ajustar diferencias.',
      ],
    },
    'promociones.html': {
      icon: '🏷️',
      title: 'Cómo funciona el módulo de Promociones',
      description:
        'Creación y control de cupones, descuentos y promociones. Se pueden segmentar por horario, tipo de ' +
        'cliente, cumpleaños, referidos o eventos especiales.',
      steps: [
        'Crear una promo: nombre, descuento (%, $, 2x1), fecha de vigencia y condiciones.',
        'Elegir a quién aplica: todos, solo socios, cumpleañeros del mes, clientes referidos, etc.',
        'Elegir dónde aplica: canchas, bar, tienda o todo.',
        'Enviar el cupón por WhatsApp o correo con un solo clic.',
        'El sistema mide cuánto se usó la promo y cuánto ingreso generó.',
      ],
    },
    'reportes.html': {
      icon: '📈',
      title: 'Cómo funciona el módulo de Reportes',
      description:
        'Panel de análisis con gráficas y tablas para entender cómo va el negocio. Ideal para el dueño o ' +
        'gerente que quiere tomar decisiones basadas en datos reales.',
      steps: [
        'Elegir el tipo de reporte: deportivo, comercial o financiero.',
        'Definir el rango de fechas: día, semana, mes, trimestre, año.',
        'El sistema muestra gráficas: canchas más rentables, horarios pico, clientes frecuentes, productos top.',
        'Comparativo automático contra períodos anteriores.',
        'Exportar a PDF o Excel para presentar o compartir.',
      ],
    },
    'usuarios.html': {
      icon: '⚙️',
      title: 'Cómo funciona el módulo de Usuarios y Permisos',
      description:
        'Aquí se dan de alta a los usuarios del sistema (empleados del club) y se les asigna un rol con permisos ' +
        'específicos. También se consulta la bitácora completa de acciones para auditoría.',
      steps: [
        'Ver lista de usuarios con su rol y estado (activo/inactivo).',
        'Alta de nuevo usuario: se le asigna rol, correo y contraseña temporal.',
        'Editar permisos: dentro de un rol se puede afinar qué puede o no hacer (permisos granulares).',
        'Bitácora: consulta qué usuario hizo qué acción, a qué hora y desde qué equipo.',
        'Los administradores pueden activar/desactivar la doble autenticación (2FA) por usuario.',
      ],
    },
    '404.html': {
      icon: '❓',
      title: 'Página no encontrada',
      description: 'La página que buscas no existe. Regresa al inicio para continuar.',
      steps: [],
    },
  };

  // ============================================================
  // CONTENIDO — Chatbot: base de conocimiento
  // ============================================================
  const CHAT_KB = [
    {
      keywords: ['hola', 'buenas', 'buenos', 'ola', 'saludos', 'hey'],
      answer: '¡Hola! Soy el asistente de Pro Padel. Estoy aquí para responder tus dudas sobre el sistema. ¿Qué te gustaría saber?',
    },
    {
      keywords: ['que es', 'qué es', 'sistema', 'de que trata', 'para que sirve', 'pro padel'],
      answer:
        '<strong>Pro Padel</strong> es un sistema integral para gestionar todo un club de pádel desde un solo lugar: ' +
        'reservas de cancha, cobros, membresías, torneos, punto de venta (bar/tienda), inventario, caja y reportes. ' +
        'Reemplaza libretas, hojas de Excel y sistemas separados.',
    },
    {
      keywords: ['modulos', 'módulos', 'incluye', 'funciones', 'funciona', 'que hace'],
      answer:
        'El sistema incluye <strong>11 módulos</strong>:<ul>' +
        '<li>Usuarios y permisos (10 roles)</li>' +
        '<li>Base de clientes</li>' +
        '<li>Reservas y pago de canchas</li>' +
        '<li>Torneos, ligas y eventos</li>' +
        '<li>Membresías y paquetes</li>' +
        '<li>Punto de venta (bar y tienda)</li>' +
        '<li>Inventarios</li>' +
        '<li>Caja y finanzas</li>' +
        '<li>Reportes y tablero</li>' +
        '<li>Promociones y descuentos</li>' +
        '<li>Seguridad y respaldo</li></ul>',
    },
    {
      keywords: ['precio', 'costo', 'cuanto', 'cuánto', 'cotizacion', 'cotización', 'vale'],
      answer:
        'Hay <strong>dos opciones</strong>:<ul>' +
        '<li><strong>Sistema Web:</strong> $70,000 de desarrollo + $2,000/mes de hosting. Se usa desde cualquier dispositivo.</li>' +
        '<li><strong>Sistema de Escritorio:</strong> $60,000 pago único, sin mensualidad. Se instala en la computadora del club.</li></ul>' +
        '¿Quieres saber cuál te conviene?',
      followups: ['¿Cuál me conviene?', '¿Qué incluye el hosting?', '¿Cuánto tarda?'],
    },
    {
      keywords: ['cual me conviene', 'cuál me conviene', 'diferencia', 'cual es mejor', 'cuál es mejor', 'recomienda'],
      answer:
        '<strong>Sistema Web</strong> si: quieres que los socios reserven online desde su celular, tienes buena internet, ' +
        'o piensas abrir otra sede.<br><br>' +
        '<strong>Sistema de Escritorio</strong> si: prefieres un pago único sin cuotas mensuales, tu internet es inestable, ' +
        'o toda la operación se centra en la recepción física.',
    },
    {
      keywords: ['hosting', 'mensualidad', 'que incluye la mensualidad', 'renta', 'servidor'],
      answer:
        'El hosting de $2,000/mes cubre: <strong>servidor</strong> donde vive el sistema, <strong>dominio</strong> ' +
        '(su URL propia), <strong>respaldos diarios automáticos</strong> y la <strong>seguridad de la infraestructura</strong>. ' +
        'No incluye desarrollos nuevos ni cambios al sistema (eso se cotiza aparte).',
    },
    {
      keywords: ['internet', 'sin internet', 'sin conexion', 'offline', 'apagón', 'apagon', 'se cae'],
      answer:
        'El <strong>Sistema Web</strong> requiere internet para funcionar. Si se cae, la operación se detiene ' +
        '(recomendamos internet de respaldo tipo 4G).<br><br>' +
        'El <strong>Sistema de Escritorio</strong> funciona 100% sin internet: los datos viven en la computadora del club.',
    },
    {
      keywords: ['celular', 'móvil', 'movil', 'tablet', 'ipad', 'telefono', 'teléfono', 'desde mi casa', 'remoto'],
      answer:
        'Con el <strong>Sistema Web</strong> puedes usar el sistema desde cualquier dispositivo: computadora, tablet, celular. ' +
        'El dueño puede revisar reportes desde su casa o desde un viaje.<br><br>' +
        'El <strong>Sistema de Escritorio</strong> solo corre en Windows en la computadora donde se instala.',
    },
    {
      keywords: ['reservas online', 'reservar online', 'reservar por internet', 'socios reservan', 'reserva desde'],
      answer:
        'En el <strong>Sistema Web</strong>, los socios pueden entrar a una URL del club, ver la disponibilidad de canchas ' +
        'y reservar/pagar desde su celular — sin llamar a recepción. Esto está incluido.<br><br>' +
        'En el <strong>Sistema de Escritorio</strong>, esto requiere un desarrollo adicional (una mini-web aparte).',
    },
    {
      keywords: ['whatsapp', 'wa', 'mensajes', 'notificaciones', 'alertas'],
      answer:
        'Sí, el sistema puede enviar por WhatsApp: <strong>comprobantes de pago</strong>, <strong>confirmaciones de reserva</strong>, ' +
        '<strong>alertas de membresía por vencer</strong>, <strong>cupones</strong> y <strong>recordatorios de partidos</strong>.<br><br>' +
        'Hay dos formas: <br>1) Manual (gratis, con un botón en el sistema) <br>2) Automática oficial (~$300/mes con proveedor).',
    },
    {
      keywords: ['tiempo', 'cuando', 'cuándo', 'tarda', 'entrega', 'semanas', 'meses', 'plazo'],
      answer:
        'El desarrollo toma <strong>9 semanas</strong>: 1 semana de descubrimiento (Semana 0) + 8 semanas de desarrollo. ' +
        'Cada semana se entrega un módulo funcional para que lo revise.',
    },
    {
      keywords: ['pagos', 'como pagar', 'cómo pagar', 'forma de pago', 'esquema', 'anticipo'],
      answer:
        'El pago del desarrollo se hace en <strong>3 partes</strong>: 40% al firmar, 30% a la mitad (Semana 4), 30% al entregar (Semana 8). ' +
        'Podemos ajustar el esquema si prefieres pagos mensuales fijos.',
    },
    {
      keywords: ['soporte', 'ayuda', 'mantenimiento', 'actualizaciones', 'cambios', 'mejoras'],
      answer:
        'Durante los primeros 30 días después de la entrega, damos <strong>soporte incluido</strong> para ajustes finos y ' +
        'preguntas. Después, cualquier mejora, cambio o nuevo módulo se cotiza aparte según el trabajo.',
    },
    {
      keywords: ['datos', 'información', 'informacion', 'nuestros datos', 'propiedad', 'de quien son'],
      answer:
        '<strong>Los datos son 100% propiedad del club</strong>, siempre. En cualquier momento puedes solicitar una exportación ' +
        'completa en formato estándar (Excel/SQL) para que estén contigo. Nunca dependes de nosotros para acceder a tu información.',
    },
    {
      keywords: ['sedes', 'sucursales', 'varias', 'otro club', 'segunda'],
      answer:
        'Sí: el <strong>Sistema Web</strong> permite conectar varias sedes al mismo sistema fácilmente. Con el ' +
        '<strong>Sistema de Escritorio</strong>, cada sede necesitaría su propia instalación y luego se consolidan reportes.',
    },
    {
      keywords: ['seguridad', '2fa', 'doble factor', 'contraseña', 'cifrado', 'proteccion', 'protección'],
      answer:
        'El sistema incluye: <strong>doble factor de autenticación (2FA)</strong> para administradores, contraseñas cifradas, ' +
        'bitácora de todas las acciones (quién, cuándo, desde dónde), respaldos automáticos diarios y datos exportables.',
    },
    {
      keywords: ['hardware', 'impresora', 'ticket', 'cajón', 'cajon', 'lector', 'código de barras', 'codigo de barras'],
      answer:
        'Con el <strong>Sistema de Escritorio</strong>, impresora de tickets, cajón de dinero y lector de código de barras ' +
        'funcionan de forma nativa (muy fácil). Con el <strong>Sistema Web</strong> también funcionan, pero requieren ' +
        'una configuración inicial adicional.',
    },
    {
      keywords: ['probar', 'demo', 'ver funcionando', 'test', 'ejemplo'],
      answer:
        'Lo que estás viendo <strong>ahora es una demo interactiva</strong>. Puedes navegar por todos los módulos usando ' +
        'el menú lateral izquierdo y explorar cómo funciona cada pantalla. Los datos son de ejemplo.',
    },
    {
      keywords: ['contratar', 'empezar', 'firmar', 'contacto', 'contactar', 'siguiente paso'],
      answer:
        'Para arrancar: <br>1) Confirmas qué opción prefieres (Web o Escritorio) <br>2) Firmamos contrato y pagas el 40% ' +
        'de anticipo <br>3) Iniciamos la Semana 0 de descubrimiento la siguiente semana laboral.<br><br>' +
        '¿Quieres que te contactemos para agendar una llamada?',
    },
    {
      keywords: ['facturación', 'facturacion', 'factura', 'cfdi', 'sat'],
      answer:
        'El sistema puede generar comprobantes internos y enviarlos por correo/WhatsApp. La <strong>facturación fiscal (CFDI 4.0)</strong> ' +
        'con el SAT se puede integrar como módulo adicional en una Fase 2, ya que requiere certificados y trámites específicos.',
    },
    {
      keywords: ['roles', 'permisos', 'usuarios', 'quien puede', 'accesos'],
      answer:
        'El sistema tiene <strong>10 roles</strong>: Administrador, Gerente, Recepción, Entrenadores, Bar, Almacén, Mantenimiento, ' +
        'Contabilidad, Socios y Clientes. Cada uno ve solo los módulos que le corresponden y sus permisos son configurables al detalle.',
    },
    {
      keywords: ['gracias', 'thanks', 'grax', 'ok', 'perfecto', 'muy bien'],
      answer: '¡Con gusto! Si tienes más dudas, escribe aquí. También puedes explorar el sistema desde el menú lateral.',
    },
  ];

  const SUGGESTIONS_INITIAL = [
    '¿Cuánto cuesta?',
    '¿Cuál me conviene?',
    '¿Cuánto tarda?',
    '¿Funciona sin internet?',
    '¿Y WhatsApp?',
  ];

  const FALLBACK_ANSWER =
    'No estoy seguro de eso — pero puedo pasar tu pregunta al equipo. También te puede servir preguntar sobre: ' +
    '<em>precio, tiempo de entrega, módulos incluidos, WhatsApp, seguridad o cómo contratar</em>.';

  // ============================================================
  // Utilidades
  // ============================================================
  function currentPageKey() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return PAGES[path] ? path : null;
  }

  function normalize(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[¿?¡!.,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findAnswer(question) {
    const q = normalize(question);
    let bestScore = 0;
    let bestAnswer = null;
    let bestFollowups = null;

    for (const entry of CHAT_KB) {
      let score = 0;
      for (const kw of entry.keywords) {
        const kwn = normalize(kw);
        if (q.includes(kwn)) score += kwn.length;
      }
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = entry.answer;
        bestFollowups = entry.followups || null;
      }
    }
    return bestScore > 0
      ? { answer: bestAnswer, followups: bestFollowups }
      : { answer: FALLBACK_ANSWER, followups: null };
  }

  // ============================================================
  // Render — Panel de instrucciones
  // ============================================================
  function renderInstructions() {
    const pageKey = currentPageKey();
    if (!pageKey) return;

    const p = PAGES[pageKey];
    if (!p) return;

    // login = página con clase login-shell, no tiene app-main
    const container =
      document.querySelector('.app-main') ||
      document.querySelector('main') ||
      document.querySelector('.login-shell');
    if (!container) return;

    const isLogin = pageKey === 'index.html';

    const panel = document.createElement('div');
    panel.className = 'help-panel';
    panel.setAttribute('aria-expanded', 'true');

    const stepsHtml = p.steps.length
      ? '<div class="help-panel-section">' +
        '<div class="help-panel-section-title">Pasos para usarlo</div>' +
        '<ol class="help-panel-steps">' +
        p.steps.map(s => `<li>${s}</li>`).join('') +
        '</ol></div>'
      : '';

    panel.innerHTML = `
      <div class="help-panel-header" role="button" tabindex="0">
        <div class="help-panel-title">
          <span class="help-panel-icon">${p.icon}</span>
          <span>${p.title}</span>
        </div>
        <button class="help-panel-toggle" type="button">Ocultar ▾</button>
      </div>
      <div class="help-panel-body">
        <p>${p.description}</p>
        ${stepsHtml}
      </div>
    `;

    // dónde insertarlo
    if (isLogin) {
      // en la vista de login, lo ponemos como banner flotante arriba
      panel.style.position = 'fixed';
      panel.style.top = '1rem';
      panel.style.left = '50%';
      panel.style.transform = 'translateX(-50%)';
      panel.style.zIndex = '55';
      panel.style.maxWidth = '520px';
      panel.style.width = 'calc(100% - 2rem)';
      panel.style.background = 'rgb(var(--elevated))';
      document.body.appendChild(panel);
    } else {
      // debajo del topbar / al inicio del contenido principal
      const topbar = container.querySelector('.topbar');
      if (topbar && topbar.nextElementSibling) {
        topbar.parentNode.insertBefore(panel, topbar.nextElementSibling);
      } else {
        container.insertBefore(panel, container.firstChild);
      }
    }

    // toggle
    const header = panel.querySelector('.help-panel-header');
    const toggle = panel.querySelector('.help-panel-toggle');
    function togglePanel() {
      const open = panel.getAttribute('aria-expanded') !== 'false';
      panel.setAttribute('aria-expanded', open ? 'false' : 'true');
      toggle.textContent = open ? 'Mostrar ▸' : 'Ocultar ▾';
    }
    header.addEventListener('click', (e) => {
      if (e.target === toggle) return;
      togglePanel();
    });
    toggle.addEventListener('click', togglePanel);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePanel(); }
    });
  }

  // ============================================================
  // Render — Chatbot
  // ============================================================
  function renderChatbot() {
    // FAB
    const fab = document.createElement('button');
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'Abrir asistente de ayuda');
    fab.innerHTML = '💬<span class="chatbot-fab-badge">?</span>';
    document.body.appendChild(fab);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'chatbot-panel';
    panel.setAttribute('data-open', 'false');
    panel.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-title">
          <div class="chatbot-avatar">PP</div>
          <div>
            <div>Asistente Pro Padel</div>
            <div class="chatbot-header-sub">Responde tus dudas sobre el sistema</div>
          </div>
        </div>
        <button class="chatbot-close" aria-label="Cerrar">×</button>
      </div>
      <div class="chatbot-messages" role="log" aria-live="polite"></div>
      <div class="chatbot-suggestions"></div>
      <div class="chatbot-input-row">
        <input class="chatbot-input" type="text" placeholder="Escribe tu pregunta…" aria-label="Escribe tu pregunta" />
        <button class="chatbot-send" type="button">Enviar</button>
      </div>
    `;
    document.body.appendChild(panel);

    const messagesEl = panel.querySelector('.chatbot-messages');
    const suggestionsEl = panel.querySelector('.chatbot-suggestions');
    const inputEl = panel.querySelector('.chatbot-input');
    const sendBtn = panel.querySelector('.chatbot-send');
    const closeBtn = panel.querySelector('.chatbot-close');

    function appendMsg(text, who) {
      const msg = document.createElement('div');
      msg.className = 'chatbot-msg ' + who;
      msg.innerHTML = text;
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function appendTyping() {
      const t = document.createElement('div');
      t.className = 'chatbot-typing';
      t.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(t);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return t;
    }

    function renderSuggestions(list) {
      suggestionsEl.innerHTML = '';
      (list || []).forEach(text => {
        const b = document.createElement('button');
        b.className = 'chatbot-suggestion';
        b.type = 'button';
        b.textContent = text;
        b.addEventListener('click', () => submit(text));
        suggestionsEl.appendChild(b);
      });
    }

    function submit(text) {
      const q = text.trim();
      if (!q) return;
      appendMsg(escapeHtml(q), 'user');
      inputEl.value = '';
      const typing = appendTyping();
      setTimeout(() => {
        typing.remove();
        const { answer, followups } = findAnswer(q);
        appendMsg(answer, 'bot');
        renderSuggestions(followups || SUGGESTIONS_INITIAL);
      }, 500 + Math.random() * 400);
    }

    function escapeHtml(s) {
      return s.replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[c]));
    }

    function open() {
      panel.setAttribute('data-open', 'true');
      fab.style.display = 'none';
      inputEl.focus();
      // saludo inicial una sola vez
      if (!panel.dataset.greeted) {
        panel.dataset.greeted = '1';
        appendMsg(
          '¡Hola! 👋 Soy el asistente de <strong>Pro Padel</strong>. Puedo responder tus preguntas sobre el sistema, ' +
          'precios, tiempos de entrega, o cómo funciona cada módulo.',
          'bot'
        );
        renderSuggestions(SUGGESTIONS_INITIAL);
      }
    }
    function close() {
      panel.setAttribute('data-open', 'false');
      fab.style.display = 'flex';
    }

    fab.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    sendBtn.addEventListener('click', () => submit(inputEl.value));
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submit(inputEl.value); }
    });
  }

  // ============================================================
  // Boot
  // ============================================================
  function boot() {
    try { renderInstructions(); } catch (e) { console.warn('help panel:', e); }
    try { renderChatbot();     } catch (e) { console.warn('chatbot:',   e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
