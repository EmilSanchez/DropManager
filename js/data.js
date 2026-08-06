/**
 * data.js
 * Mock/demo data used to render the dashboard. Replace with real API
 * responses later — the render functions in render.js only depend on
 * these shapes.
 */

const NAV_ITEMS = [
  { id: 'resumen', label: 'Resumen', icon: 'grid' },
  { id: 'precios', label: 'Precios', icon: 'tag' },
  { id: 'publicar', label: 'Publicar', icon: 'upload' },
  { id: 'productos', label: 'Productos', icon: 'box' },
  { id: 'preguntas-pre', label: 'Preguntas Pre', icon: 'helpCircle' },
  { id: 'preguntas-post', label: 'Preguntas Post', icon: 'messageSquare' },
  { id: 'ventas', label: 'Ventas', icon: 'cart' },
  { id: 'tracking', label: 'Tracking', icon: 'activity' },
  { id: 'envios', label: 'Envíos', icon: 'truck' },
  { id: 'actualizaciones', label: 'Actualizaciones', icon: 'refresh' },
  { id: 'ganancias', label: 'Ganancias', icon: 'dollarSign' },
  { id: 'problemas', label: 'Problemas', icon: 'alertTriangle' },
  { id: 'extras', label: 'Extras', icon: 'settings' },
];

const USER = {
  name: 'Emil Sanchez',
  role: 'Administrador',
  initials: 'ES',
};

// Submódulos dentro de cada módulo del sidebar. Por ahora solo Extras
// tiene submódulos definidos; también se muestran como "en desarrollo".
const SUBMODULES = {
  extras: [
    { id: 'configuracion', label: 'Configuración', icon: 'settings' },
    { id: 'inventario', label: 'Inventario', icon: 'box' },
  ],
};

const KPIS = [
  {
    id: 'ventas',
    label: 'Ventas',
    icon: 'cart',
    value: '207',
    color: 'navy',
  },
  {
    id: 'ganancia-neta',
    label: 'Ganancia',
    icon: 'dollarSign',
    value: '$ 11.500.364',
    color: 'teal',
  },
];

const STORES_SUMMARY = {
  total: 2,
  active: 2,
  inactive: 0,
};

const STORES = [
  {
    id: 'prueba-1',
    name: 'Prueba 1',
    platform: 'MercadoLíder',
    listings: 148,
    status: 'Activa',
    metrics: { reputacion: 98, reclamos: 0.3, cancelaciones: 1.2, demoras: 2.1 },
    sales60d: 358,
  },
  {
    id: 'prueba-2',
    name: 'Prueba 2',
    platform: 'MercadoLíder',
    listings: 94,
    status: 'Activa',
    metrics: { reputacion: 97, reclamos: 0.5, cancelaciones: 0.9, demoras: 1.8 },
    sales60d: 214,
  },
];

if (typeof module !== 'undefined') {
  module.exports = { NAV_ITEMS, USER, SUBMODULES, KPIS, STORES_SUMMARY, STORES };
}