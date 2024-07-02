document.addEventListener('DOMContentLoaded', () => {

    const userName = localStorage.getItem('userName');
    const userMail = localStorage.getItem('userMail');

    const greetingElement = document.getElementById('greeting');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userName && userMail) {
        greetingElement.innerHTML = `¡Bienvenido,${userName} ! Tu correo es ${userMail}`;
    } else {
        greetingElement.textContent = 'Bienvenido, invitado.';
    }

    // Evento para cerrar sesión
    logoutBtn.addEventListener('click', () => {
        cerrarSesion();
        console.log("cerrando sesion");
    });

    function cerrarSesion() {
        // Limpiar localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');

        // Redirigir a la página de inicio de sesión
        window.location.href = 'login.html';
    }

    // // Iniciar todos los popovers en la página
    // var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    // var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    //     return new bootstrap.Popover(popoverTriggerEl);
    // });

    // // Iniciar todos los tooltips en la página
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //     return new bootstrap.Tooltip(tooltipTriggerEl);
    // });

});