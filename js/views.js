/**
 * views.js
 * Very small "router" for a single-page dashboard. Only "resumen" has a
 * real, functional view for now — every other nav item renders the shared
 * placeholder view with its own title/description so it's obvious what's
 * pending vs. what actually works.
 *
 * To make a new module functional later:
 *   1. Build its markup/section in index.html (or generate it in render.js).
 *   2. Add a case for it in showView() below, same as 'resumen'.
 */

const VIEW_DESCRIPTIONS = {
  resumen: 'Resumen general de todas tus tiendas.',
  precios: 'Gestiona y ajusta los precios de tus publicaciones.',
  publicar: 'Publica nuevos productos en tus tiendas.',
  productos: 'Administra el catálogo de productos.',
  'preguntas-pre': 'Responde preguntas hechas antes de la compra.',
  'preguntas-post': 'Responde preguntas hechas después de la compra.',
  ventas: 'Consulta el historial y el detalle de tus ventas.',
  tracking: 'Sigue el estado de tus envíos en tiempo real.',
  envios: 'Gestiona la logística de tus envíos.',
  actualizaciones: 'Revisa las últimas actualizaciones del sistema.',
  ganancias: 'Analiza la rentabilidad de tus tiendas.',
  problemas: 'Revisa incidencias y problemas reportados.',
  extras: 'Funciones adicionales, incluida la Configuración de tu cuenta.',
};

// Nav ids that already have a real, functional view.
const FUNCTIONAL_VIEWS = new Set(['resumen']);

function retriggerAnimation(el) {
  if (!el) return;
  el.style.animation = 'none';
  // Forzar reflow para que el navegador "olvide" el estado anterior de la animación
  void el.offsetWidth;
  el.style.animation = '';
}

function showView(navId) {
  const item = NAV_ITEMS.find(n => n.id === navId);
  if (!item) return;

  const resumenView = document.getElementById('view-resumen');
  const placeholderView = document.getElementById('view-placeholder');
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');

  pageTitle.textContent = item.label;
  pageSubtitle.textContent = VIEW_DESCRIPTIONS[navId] || 'Sección en desarrollo.';

  if (FUNCTIONAL_VIEWS.has(navId)) {
    resumenView.hidden = false;
    placeholderView.hidden = true;
    retriggerAnimation(resumenView);
    return;
  }

  resumenView.hidden = true;
  placeholderView.hidden = false;
  renderSubmodules(navId);
  retriggerAnimation(placeholderView);
}