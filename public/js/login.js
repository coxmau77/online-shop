document.addEventListener('DOMContentLoaded', () => {
    const validarCorreoForm = document.getElementById('validarCorreoForm');

    validarCorreoForm.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(validarCorreoForm);
        const mail = formData.get('mail');

        const data = { mail };

        try {
            // Enviar solicitud de verificación de correo
            const response = await fetch('/api/verificar-correo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.exists) {
                // Guardar datos en localStorage
                localStorage.setItem('userMail', mail);
                localStorage.setItem('userName', result.userName);
                // Redirigir a index.html si el correo existe
                alert('Correo validado. Redirigiendo...');
                window.location.href = 'index.html';
            } else {
                // Mostrar mensaje de error si el correo no está registrado
                alert('El correo ingresado no está registrado');
            }
        } catch (error) {
            console.error('Error al verificar el correo:', error);
            alert('Hubo un problema con la verificación o tu correo no está registrado. Inténtalo de nuevo.');
        }

        validarCorreoForm.reset();
    });
});
