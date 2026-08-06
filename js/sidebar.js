/**
 * sidebar.js
 * Handles sidebar collapse/expand and nav item active state.
 * Collapsed state persists across reloads via localStorage.
 */

function initSidebar() {
  const app = document.getElementById('app');
  const collapseBtn = document.getElementById('collapseBtn');
  const nav = document.getElementById('sidebarNav');

  if (!app || !collapseBtn) return;

  const STORAGE_KEY = 'melimanager:sidebarCollapsed';

  function applyState(collapsed) {
    app.classList.toggle('sidebar-collapsed', collapsed);
    const label = collapseBtn.querySelector('span');
    if (label) label.textContent = collapsed ? 'Expandir' : 'Colapsar';
  }

  const storedState = localStorage.getItem(STORAGE_KEY) === 'true';
  applyState(storedState);

  collapseBtn.addEventListener('click', () => {
    const isCollapsed = app.classList.contains('sidebar-collapsed');
    applyState(!isCollapsed);
    localStorage.setItem(STORAGE_KEY, String(!isCollapsed));
  });

  if (nav) {
    nav.addEventListener('click', (e) => {
      const item = e.target.closest('.sidebar__item');
      if (!item) return;
      e.preventDefault();
      nav.querySelectorAll('.sidebar__item').forEach(el => el.classList.remove('is-active'));
      item.classList.add('is-active');
    });
  }
}
