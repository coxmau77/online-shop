document.addEventListener('DOMContentLoaded', () => {
    const darkModeBtn = document.querySelector('.dark-mode');
    const html = document.querySelector('html');

    // Leer la preferencia de modo oscuro desde localStorage
    const darkModePreference = localStorage.getItem('darkMode');

    if (darkModePreference === 'enabled') {
        html.setAttribute('data-bs-theme', 'dark');
    }

    darkModeBtn.addEventListener('click', () => {
        if (html.getAttribute('data-bs-theme') === 'dark') {
            html.removeAttribute('data-bs-theme');
            localStorage.setItem('darkMode', 'disabled');
            console.log('Modo oscuro desactivado');
        } else {
            html.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('darkMode', 'enabled');
            console.log('Modo oscuro activado');
        }
    });
});