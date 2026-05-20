document.addEventListener('DOMContentLoaded', () => {

  const tiles = document.querySelectorAll('.research-tile');

  const activeFilters = {
    topic: 'all',
    type:  'all',
    year:  'all'
  };

  /* ======================
     CORE FILTER LOGIC
     ====================== */
  function applyFilters() {
    tiles.forEach(tile => {
      const matchesTopic = activeFilters.topic === 'all' || tile.dataset.topic === activeFilters.topic;
      const matchesType  = activeFilters.type  === 'all' || tile.dataset.type  === activeFilters.type;
      const matchesYear  = activeFilters.year  === 'all' || tile.dataset.year  === activeFilters.year;

      tile.classList.toggle('hidden', !(matchesTopic && matchesType && matchesYear));
    });
  }

  function setActiveButton(selector, value) {
    document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
    document.querySelector(`${selector}[data-topic="${value}"], ${selector}[data-value="${value}"]`)
      ?.classList.add('active');
  }

  /* ======================
     TOPIC BUTTONS
     ====================== */
  document.querySelectorAll('.filter-btn[data-topic]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilters.topic = btn.dataset.topic;
      setActiveButton('.filter-btn[data-topic]', btn.dataset.topic);
      applyFilters();
    });
  });

  /* ======================
     TYPE + YEAR BUTTONS
     ====================== */
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter; // "type" or "year"
      const value  = btn.dataset.value;

      activeFilters[filter] = value;
      setActiveButton(`.filter-btn[data-filter="${filter}"]`, value);
      applyFilters();
    });
  });

  /* ======================
     CLICKABLE TILE TAGS
     ====================== */
  document.querySelectorAll('.tile-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const topic = tag.closest('.research-tile')?.dataset.topic || 'all';

      activeFilters.topic = topic;
      setActiveButton('.filter-btn[data-topic]', topic);
      applyFilters();
    });
  });

  /* ======================
     INITIALISE
     ====================== */
  applyFilters();

});