console.log("hola Online Shop");

document.addEventListener('DOMContentLoaded', () => {
    const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const editarUsuarioForm = document.getElementById('editarUsuarioForm');
    const listarUsuariosBtn = document.getElementById('listarUsuariosBtn');
    const listaDeUsuarios = document.getElementById('listaDeUsuarios');

    // mostrar y ocultar el form
    mostrarCrearUsuarioFormBtn.addEventListener('click', () => {
        crearUsuarioForm.classList.remove('hidden');
    });

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
        // console.log(data);
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
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();

    });

    // Actualizar editar usuario
    editarUsuarioForm.addEventListener('submit', async event => {

        event.preventDefault();
        const formData = new FormData(editarUsuarioForm);
        const id = formData.get('editID');

        const data = {
            nombre: formData.get('editNombre'),
            apellido: formData.get('editApellido'),
            mail: formData.get('editMail')
        };

        const response = await fetch(`/user/${id}`, {
            method: 'PUT',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        editarUsuarioForm.reset();
        // ----
        // console.info(result.message);
        // ----
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();

    });

    // Listar todos los usuarios
    listarUsuariosBtn.addEventListener('click', listarUsuarios);

    async function listarUsuarios() {

        const response = await fetch('/user/all');

        // Manejo de errores HTTP 
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || errorData.mensaje || 'Error al obtener los usuarios');
        }

        const usuarios = await response.json();
        listaDeUsuarios.innerHTML = '';

        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="action p-2">
                <span>ID: ${usuario.id} | nombre: ${usuario.nombre} | apellido: ${usuario.apellido} | mail: ${usuario.mail}</span>
                <div>
                    <button class="update btn btn-info" data-id="${usuario.id}" data-nombre="${usuario.nombre}" data-apellido="${usuario.apellido}" data-mail="${usuario.mail}">Actualizar</button>
                    <button class="delete btn btn-danger" data-id="${usuario.id}">Eliminar</button>
                </div>
            </div>
            `;
            listaDeUsuarios.appendChild(li);
        });

        // Actualizar usuario
        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', event => {

                console.log("click update");

                const id = event.target.getAttribute('data-id');
                const nombre = event.target.getAttribute('data-nombre');
                const apellido = event.target.getAttribute('data-apellido');
                const mail = event.target.getAttribute('data-mail');

                document.getElementById('editID').value = id;
                document.getElementById('editNombre').value = nombre;
                document.getElementById('editApellido').value = apellido;
                document.getElementById('editMail').value = mail;

                editarUsuarioForm.classList.remove('hidden');
            });
        });

        // Eliminar usuario
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async event => {

                const id = event.target.getAttribute('data-id');

                const response = await fetch(`/user/${id}`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                // alert(result.message);
                confirm(result.message)
                listarUsuarios();
            });
        });

    }

    listarUsuarios();
});