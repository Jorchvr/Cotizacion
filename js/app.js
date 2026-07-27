/*
 * Page-specific glue para Pro Padel.
 */
(function () {
  // Reveal-on-scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Modales
  function openModal(name) {
    const m = document.querySelector(`[data-modal="${name}"]`);
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
  }
  function closeModal(m) {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    window.State?.set('modal', null);
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.openModal;
      window.State?.set('modal', name);
      openModal(name);
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = btn.closest('[data-modal]');
      if (m) closeModal(m);
    });
  });
  // Cerrar modal al clic en backdrop
  document.querySelectorAll('[data-modal]').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });
  // Esc cierra modal abierto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-modal].open').forEach(m => closeModal(m));
    }
  });

  // Tabs
  function selectTab(name) {
    document.querySelectorAll('[data-tab-panel]').forEach(p => {
      p.hidden = p.dataset.tabPanel !== name;
    });
    document.querySelectorAll('[data-tab]').forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.tab === name));
    });
  }
  document.querySelectorAll('[data-tab]').forEach(b => {
    b.addEventListener('click', () => {
      const name = b.dataset.tab;
      window.State?.set('tab', name);
      selectTab(name);
    });
  });

  // Sidebar mobile toggle
  const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      document.querySelector('.app-sidebar')?.classList.toggle('open');
    });
  }

  // Hydrate state
  window.State?.hydrate({
    modal: (v) => v && openModal(v),
    tab:   (v) => v && selectTab(v),
  });

  // Page-load skeletons
  document.querySelectorAll('[data-skeleton-on-load]').forEach(container => {
    const count = parseInt(container.dataset.skeletonCount, 10) || 3;
    const duration = parseInt(container.dataset.skeletonDuration, 10) || 700;
    window.UI?.fakeLoad?.(container, duration, { count });
  });

  window.App = { openModal, closeModal, selectTab };
})();
