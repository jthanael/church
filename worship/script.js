document.addEventListener('DOMContentLoaded', () => {
  const mediaSelect = document.getElementById('mediaSelect');
  const mediaTeam = document.getElementById('mediaTeam');
  const cards = Array.from(mediaTeam.querySelectorAll('.staff-card'));

  function updateMedia() {
    const val = mediaSelect.value;

    if (val === 'none') {
      mediaTeam.style.display = 'none';
      mediaSelect.setAttribute('aria-expanded', 'false');
      return;
    }

    mediaTeam.style.display = '';
    mediaSelect.setAttribute('aria-expanded', 'true');

    cards.forEach(card => {
      card.style.display = val === 'all' || card.dataset.name === val ? '' : 'none';
    });
  }

  mediaSelect.addEventListener('change', updateMedia);

  // Initialize
  mediaSelect.value = 'all';
  updateMedia();

  // Musician team controls
  const musicianSelect = document.getElementById('musicianSelect');
  const musicianTeam = document.getElementById('musicianTeam');
  const musicianCards = musicianTeam ? Array.from(musicianTeam.querySelectorAll('.staff-card')) : [];

  function updateMusician() {
    if (!musicianSelect || !musicianTeam) return;
    const val = musicianSelect.value;

    if (val === 'none') {
      musicianTeam.style.display = 'none';
      musicianSelect.setAttribute('aria-expanded', 'false');
      return;
    }

    musicianTeam.style.display = '';
    musicianSelect.setAttribute('aria-expanded', 'true');

    musicianCards.forEach(card => {
      card.style.display = val === 'all' || card.dataset.name === val ? '' : 'none';
    });
  }

  if (musicianSelect) {
    musicianSelect.addEventListener('change', updateMusician);
    musicianSelect.value = 'all';
    updateMusician();
  }
});
