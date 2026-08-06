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

function trendIcon(direction) {
  return direction === 'up' ? Icons.trendUp : Icons.trendDown;
}

function renderKpis() {
  const row = document.getElementById('kpiRow');
  if (!row) return;

  const kpiCardsHtml = KPIS.map(kpi => `
    <div class="card kpi-card">
      <div class="kpi-card__top">
        <span class="kpi-card__label">${kpi.label}</span>
        <span class="kpi-card__icon">${Icons[kpi.icon]}</span>
      </div>
      <div>
        <div class="kpi-card__value">${kpi.value}</div>
        <div class="kpi-card__meta">
          <span class="kpi-card__trend kpi-card__trend--${kpi.trend.direction}">
            ${trendIcon(kpi.trend.direction)} ${kpi.trend.value}
          </span>
          <span>${kpi.trend.vs}</span>
        </div>
      </div>
    </div>
  `).join('');

  const storesCardHtml = `
    <div class="card kpi-card">
      <div class="kpi-card__top">
        <span class="kpi-card__label">Tiendas</span>
        <span class="kpi-card__icon">${Icons.store}</span>
      </div>
      <div>
        <div class="kpi-card__value">${STORES_SUMMARY.total} <span style="font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--color-text-secondary);">totales</span></div>
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

function renderStoreCard(store) {
  const statusBadge = store.status === 'Activa'
    ? `<span class="badge badge--success"><i class="dot dot--green"></i>Activa</span>`
    : `<span class="badge badge--neutral"><i class="dot dot--gray"></i>Inactiva</span>`;

  return `
    <div class="card store-card" data-store-id="${store.id}">
      <div class="store-card__header">
        <div class="store-card__identity">
          <div class="store-card__avatar">${Icons.store}</div>
          <div>
            <div class="store-card__name">${store.name}</div>
            <div class="store-card__meta">${store.platform} · ${store.listings} publicaciones</div>
          </div>
        </div>
        <div class="store-card__header-right">
          ${statusBadge}
          <button class="store-card__menu-btn" aria-label="Más opciones">${Icons.moreHorizontal}</button>
        </div>
      </div>

      <div class="store-card__metrics">
        <div class="store-card__metric">
          <span class="store-card__metric-label"><i class="dot dot--green"></i>Reputación</span>
          <span class="store-card__metric-value">${store.metrics.reputacion}%</span>
        </div>
        <div class="store-card__metric">
          <span class="store-card__metric-label"><i class="dot dot--green"></i>Reclamos</span>
          <span class="store-card__metric-value">${store.metrics.reclamos}%</span>
        </div>
        <div class="store-card__metric">
          <span class="store-card__metric-label"><i class="dot dot--green"></i>Cancelaciones</span>
          <span class="store-card__metric-value">${store.metrics.cancelaciones}%</span>
        </div>
        <div class="store-card__metric">
          <span class="store-card__metric-label"><i class="dot dot--amber"></i>Demoras</span>
          <span class="store-card__metric-value">${store.metrics.demoras}%</span>
        </div>
      </div>

      <div class="store-card__footer">
        <div class="store-card__rating">
          Calificación <b>${Icons.star} ${store.rating}</b>
        </div>
        <div class="store-card__actions">
          <button class="btn btn--outline btn--sm">${Icons.shield} Infracciones</button>
          <button class="btn btn--secondary btn--sm">${Icons.externalLink} Ver detalles</button>
        </div>
      </div>
    </div>
  `;
}

function renderStores(filter = 'all') {
  const grid = document.getElementById('storesGrid');
  const countEl = document.getElementById('storesCount');
  if (!grid) return;

  const filtered = STORES.filter(store => {
    if (filter === 'active') return store.status === 'Activa';
    if (filter === 'inactive') return store.status === 'Inactiva';
    return true;
  });

  grid.innerHTML = filtered.map(renderStoreCard).join('');
  if (countEl) countEl.textContent = `(${filtered.length})`;
}

function renderAll() {
  renderNav();
  renderUser();
  renderKpis();
  renderStores();
}
