/**
 * render.js
 * Pure DOM-building functions. Each function takes data and returns/inserts
 * markup — no state, no event wiring (see sidebar.js / select.js for that).
 */

function renderNav() {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;

  nav.innerHTML = NAV_ITEMS.map((item, index) => `
    <li>
      <a href="#" class="sidebar__item ${index === 0 ? 'is-active' : ''}" data-nav-id="${item.id}">
        ${Icons[item.icon] || Icons.grid}
        <span>${item.label}</span>
      </a>
    </li>
  `).join('');
}

function renderUser() {
  const nameEl = document.getElementById('userName');
  const roleEl = document.getElementById('userRole');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl) nameEl.textContent = USER.name;
  if (roleEl) roleEl.textContent = USER.role;
  if (avatarEl) avatarEl.textContent = USER.initials;
}

function renderSubmodules(navId) {
  const grid = document.getElementById('submodulesGrid');
  if (!grid) return;

  const subs = SUBMODULES[navId];
  if (!subs || !subs.length) {
    grid.hidden = true;
    grid.innerHTML = '';
    return;
  }

  grid.hidden = false;
  grid.innerHTML = subs.map(sub => `
    <div class="submodule-card">
      <span class="submodule-card__icon">${Icons[sub.icon] || Icons.grid}</span>
      <span class="submodule-card__label">${sub.label}</span>
      <span class="submodule-card__status">En desarrollo</span>
    </div>
  `).join('');
}

function renderKpiCard(kpi) {
  return `
    <div class="card kpi-card">
      <div class="kpi-card__icon-panel kpi-card__icon-panel--${kpi.color}">${Icons[kpi.icon]}</div>
      <div class="kpi-card__body">
        <span class="kpi-card__label">${kpi.label}</span>
        <span class="kpi-card__value">${kpi.value}</span>
      </div>
    </div>
  `;
}

function renderKpis() {
  const row = document.getElementById('kpiRow');
  if (!row) return;

  const kpiCardsHtml = KPIS.map(renderKpiCard).join('');

  const storesCardHtml = `
    <div class="card kpi-card kpi-card--stores">
      <div class="kpi-card__main">
        <div class="kpi-card__icon-panel kpi-card__icon-panel--navy">${Icons.store}</div>
        <div class="kpi-card__body">
          <span class="kpi-card__label">Tiendas</span>
          <span class="kpi-card__value">${STORES_SUMMARY.total}</span>
        </div>
      </div>
      <div class="kpi-card__stores-right">
        <span class="kpi-card__divider"></span>
        <div class="kpi-card__stores-breakdown">
          <span><i class="dot dot--green"></i><b>${STORES_SUMMARY.active}</b> activas</span>
          <span><i class="dot dot--gray"></i><b>${STORES_SUMMARY.inactive}</b> inactivas</span>
        </div>
      </div>
    </div>
  `;

  const selectorCardHtml = `
    <div class="card selector-card">
      <span class="selector-card__title">Mostrar tiendas</span>
      <div class="select" id="storeFilterSelect">
        <button type="button" class="select__control">
          <span class="select__control-label">Todas las tiendas</span>
          ${Icons.chevronDown}
        </button>
        <div class="select__menu">
          <div class="select__option is-selected" data-value="all">Todas las tiendas</div>
          <div class="select__option" data-value="active">Solo activas</div>
          <div class="select__option" data-value="inactive">Solo inactivas</div>
        </div>
      </div>
    </div>
  `;

  row.innerHTML = kpiCardsHtml + storesCardHtml + selectorCardHtml;
}

function metricDotClass(value, thresholds) {
  // thresholds: { warn, danger } — lower is better for these metrics
  if (value >= thresholds.danger) return 'dot--red';
  if (value >= thresholds.warn) return 'dot--amber';
  return 'dot--green';
}

function reputationLevel(value) {
  if (value >= 95) return 'good';
  if (value >= 85) return 'warn';
  return 'bad';
}

function renderStoreCard(store) {
  const statusDot = store.status === 'Activa' ? 'dot--green' : 'dot--gray';
  const repLevel = reputationLevel(store.metrics.reputacion);

  return `
    <div class="card store-card" data-store-id="${store.id}">
      <div class="store-card__header">
        <div class="store-card__identity">
          <div class="store-card__avatar">${Icons.userFilled}</div>
          <div>
            <div class="store-card__name">${store.name}</div>
            <div class="store-card__status"><i class="dot ${statusDot}"></i>${store.status}</div>
          </div>
        </div>
        <button class="store-card__menu-btn" aria-label="Más opciones">${Icons.moreHorizontal}</button>
      </div>

      <div class="store-card__stats">
        <div class="store-card__stats-col">
          <div class="store-card__reputation-row">
            <span class="store-card__stats-heading">Reputación</span>
            <span class="store-card__reputation-bar store-card__reputation-bar--${repLevel}"></span>
          </div>
          <ul class="store-card__stats-list">
            <li><span><i class="dot dot--green"></i>Reclamos</span><b>${store.metrics.reclamos}%</b></li>
            <li><span><i class="dot dot--green"></i>Cancelaciones</span><b>${store.metrics.cancelaciones}%</b></li>
            <li><span><i class="dot dot--amber"></i>Demoras</span><b>${store.metrics.demoras}%</b></li>
          </ul>
        </div>

        <div class="store-card__stats-divider"></div>

        <div class="store-card__stats-col">
          <span class="store-card__stats-heading">Ventas</span>
          <div class="store-card__stats-value">${store.sales60d} <span>últimos 60 días</span></div>
          <button class="btn btn--teal btn--block store-card__infractions-btn">${Icons.shield} Infracciones</button>
        </div>
      </div>

      <div class="store-card__footer">
        <span class="badge badge--success">Sin límite</span>
      </div>
    </div>
  `;
}

function renderStores(filter = 'all') {
  const grid = document.getElementById('storesGrid');
  if (!grid) return;

  const filtered = STORES.filter(store => {
    if (filter === 'active') return store.status === 'Activa';
    if (filter === 'inactive') return store.status === 'Inactiva';
    return true;
  });

  grid.innerHTML = filtered.map(renderStoreCard).join('');
}

function renderAll() {
  renderNav();
  renderUser();
  renderKpis();
  renderStores();
}