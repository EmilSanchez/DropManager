/**
 * select.js
 * Lightweight custom dropdown behavior. Works for any element matching
 * .select with a .select__control and .select__menu inside it.
 * Currently wires the "Mostrar tiendas" filter to renderStores().
 */

function initSelects() {
  document.addEventListener('click', (e) => {
    const control = e.target.closest('.select__control');
    const openSelects = document.querySelectorAll('.select.is-open');

    if (control) {
      const select = control.closest('.select');
      const wasOpen = select.classList.contains('is-open');
      openSelects.forEach(s => s.classList.remove('is-open'));
      if (!wasOpen) select.classList.add('is-open');
      return;
    }

    const option = e.target.closest('.select__option');
    if (option) {
      const select = option.closest('.select');
      const label = select.querySelector('.select__control-label');
      const value = option.dataset.value;

      select.querySelectorAll('.select__option').forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
      if (label) label.textContent = option.textContent.trim();
      select.classList.remove('is-open');

      if (select.id === 'storeFilterSelect') {
        renderStores(value);
      }
      return;
    }

    // Click outside any select closes all open menus
    if (!e.target.closest('.select')) {
      openSelects.forEach(s => s.classList.remove('is-open'));
    }
  });
}
