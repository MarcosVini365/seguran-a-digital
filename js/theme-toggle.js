const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(isLight){
    document.documentElement.classList.toggle('light', isLight);
    themeIcon.className  = isLight ? 'bi bi-sun-fill tt-icon' : 'bi bi-moon-stars-fill tt-icon';
    themeLabel.textContent = isLight ? 'Light' : 'Dark';
    localStorage.setItem('sp-theme', isLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  applyTheme(!document.documentElement.classList.contains('light'));
});

const saved = localStorage.getItem('sp-theme');
if (saved === 'light') applyTheme(true);