const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
const toggle = document.querySelector('.toggle');
const html = document.querySelector('html');

localStorage.dark ??= prefersDarkMode.matches;
html.dataset.dark = localStorage.dark;

toggle.addEventListener('click', () => { 
  localStorage.dark = !(localStorage.dark == 'true');
  html.dataset.dark = localStorage.dark;
});
