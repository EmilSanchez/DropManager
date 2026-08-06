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
  { id: 'membresia', label: 'Membresía', icon: 'creditCard' },
  { id: 'ticket', label: 'Ticket', icon: 'ticket' },
  { id: 'extras', label: 'Extras', icon: 'zap' },
];

const USER = {
  name: 'Juan Martínez',
  role: 'Administrador',
  initials: 'JM',
};

const KPIS = [
  {
    id: 'ventas-totales',
    label: 'Ventas totales',
    icon: 'cart',
    value: '1,284',
    trend: { direction: 'up', value: '+8.3%', vs: 'vs mes anterior' },
  },
  {
    id: 'ventas-hoy',
    label: 'Ventas hoy',
    icon: 'cart',
    value: '47',
    trend: { direction: 'up', value: '+18%', vs: 'vs ayer' },
  },
  {
    id: 'ventas-mes',
    label: 'Ventas del mes',
    icon: 'cart',
    value: '1,284',
    trend: { direction: 'up', value: '+8.3%', vs: 'vs mes julio anterior' },
  },
  {
    id: 'ganancia-neta',
    label: 'Ganancia neta',
    icon: 'dollarSign',
    value: '$48,320',
    trend: { direction: 'up', value: '+5.1%', vs: 'vs mes anterior' },
  },
];

const STORES_SUMMARY = {
  total: 8,
  active: 6,
  inactive: 2,
};

const STORES = [
  {
    id: 'electro-store-mx',
    name: 'Electro Store MX',
    platform: 'MercadoLíder',
    listings: 148,
    status: 'Activa',
    metrics: { reputacion: 98, reclamos: 0.3, cancelaciones: 1.2, demoras: 2.1 },
    rating: 4.9,
  },
  {
    id: 'techzone-pro',
    name: 'TechZone Pro',
    platform: 'MercadoLíder',
    listings: 94,
    status: 'Activa',
    metrics: { reputacion: 97, reclamos: 0.5, cancelaciones: 0.9, demoras: 1.8 },
    rating: 4.8,
  },
  {
    id: 'gadgets-plus',
    name: 'Gadgets Plus',
    platform: 'Platinum',
    listings: 212,
    status: 'Activa',
    metrics: { reputacion: 95, reclamos: 0.8, cancelaciones: 1.5, demoras: 3.2 },
    rating: 4.7,
  },
  {
    id: 'hogar-facil',
    name: 'Hogar Fácil',
    platform: 'MercadoLíder',
    listings: 76,
    status: 'Activa',
    metrics: { reputacion: 96, reclamos: 0.6, cancelaciones: 1.0, demoras: 2.4 },
    rating: 4.8,
  },
  {
    id: 'moda-urbana',
    name: 'Moda Urbana',
    platform: 'Platinum',
    listings: 305,
    status: 'Activa',
    metrics: { reputacion: 93, reclamos: 1.1, cancelaciones: 1.8, demoras: 3.6 },
    rating: 4.6,
  },
  {
    id: 'deportes-max',
    name: 'Deportes Max',
    platform: 'Gold',
    listings: 58,
    status: 'Inactiva',
    metrics: { reputacion: 90, reclamos: 1.4, cancelaciones: 2.1, demoras: 4.0 },
    rating: 4.4,
  },
];

if (typeof module !== 'undefined') {
  module.exports = { NAV_ITEMS, USER, KPIS, STORES_SUMMARY, STORES };
}
