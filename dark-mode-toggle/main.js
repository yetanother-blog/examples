const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
const toggle = document.querySelector('.toggle');
const html = document.querySelector('html');

html.dataset.dark = localStorage.dark || prefersDarkMode.matches;

toggle.addEventListener('click', () => { 
  localStorage.dark = !(html.dataset.dark == 'true');
  html.dataset.dark = localStorage.dark;
});