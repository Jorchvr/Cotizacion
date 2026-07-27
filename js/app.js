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

  // Sidebar mobile toggle + backdrop
  const sidebar = document.querySelector('.app-sidebar');
  if (sidebar) {
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }
    const openSidebar = () => {
      sidebar.classList.add('open');
      backdrop.classList.add('visible');
    };
    const closeSidebar = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('visible');
    };
    document.querySelectorAll('[data-sidebar-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
      });
    });
    backdrop.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('a.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 900px)').matches) closeSidebar();
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
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
