/*
 * Data layer para Pro Padel.
 * Personas = roles del sistema; cada rol muestra distinto nombre en el header y
 * distintos módulos accesibles en el sidebar.
 */
(function () {
  const DATA = {
    personas: {
      'admin': {
        user: { name: 'Roberto Salazar', role: 'Administrador general', initials: 'RS' },
        badge: 'admin',
      },
      'gerente': {
        user: { name: 'Mariana Ochoa', role: 'Gerente', initials: 'MO' },
        badge: 'gerente',
      },
      'recepcion': {
        user: { name: 'Diego Ramírez', role: 'Recepción', initials: 'DR' },
        badge: 'recepcion',
      },
    },

    club: {
      name: 'Club Pro Padel Polanco',
      city: 'Ciudad de México',
      canchas: 6,
      moneda: 'MXN',
    },
  };

  function getPersona(name) {
    return DATA.personas[name] || DATA.personas[Object.keys(DATA.personas)[0]];
  }

  function resolve(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function apply(personaName) {
    const persona = getPersona(personaName);

    document.querySelectorAll('[data-persona-text]').forEach(el => {
      const path = el.dataset.personaText;
      const value = resolve(persona, path);
      if (value !== undefined && value !== null) el.textContent = String(value);
    });

    document.querySelectorAll('[data-persona-show]').forEach(el => {
      const targets = el.dataset.personaShow.split(/\s+/).filter(Boolean);
      const shouldHide = !targets.includes(personaName);
      el.classList.toggle('proto-hidden', shouldHide);
      el.hidden = shouldHide;
    });

    document.querySelectorAll('[data-persona-hide]').forEach(el => {
      const targets = el.dataset.personaHide.split(/\s+/).filter(Boolean);
      const shouldHide = targets.includes(personaName);
      el.classList.toggle('proto-hidden', shouldHide);
      el.hidden = shouldHide;
    });

    document.dispatchEvent(new CustomEvent('persona:applied', { detail: { name: personaName, data: persona } }));
  }

  window.Data = { all: DATA, personas: DATA.personas, get: getPersona, apply };
})();
