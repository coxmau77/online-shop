
document.addEventListener('DOMContentLoaded', () => {

    const crearUsuarioForm = document.getElementById('crearUsuarioForm');

    // Crear usuario
    crearUsuarioForm.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(crearUsuarioForm);

        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            mail: formData.get('mail')
        };

        // postearlo a la ruta
        const response = await fetch('/user/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        crearUsuarioForm.reset();
        alert(result.message);

        // Redirigir a login.html después de un registro exitoso
        if (response.ok) {
            window.location.href = 'login.html';
        }
    });

});