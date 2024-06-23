console.log("hola Online Shop");

document.addEventListener('DOMContentLoaded', () => {
    const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const editarUsuarioForm = document.getElementById('editarUsuarioForm');
    const listarUsuariosBtn = document.getElementById('listarUsuariosBtn');
    const listaDeUsuarios = document.getElementById('listaDeUsuarios');

    // mostra y ocultar el form
    mostrarCrearUsuarioFormBtn.addEventListener('click', () => {
        crearUsuarioForm.classList.toggle('hidden');
    });

    // Listar todos los usuarios
    listarUsuariosBtn.addEventListener('click', listarUsuarios);

    async function listarUsuarios() {

        const response = await fetch('/user/all');
        const usuarios = await response.json();

        listaDeUsuarios.innerHTML = '';

        usuarios.forEach(usuario => {

            const li = document.createElement('li');
            li.innerHTML = `
                <span>ID: ${usuario.id}, nombre: ${usuario.nombre}, apellido: ${usuario.apellido}, mail: ${usuario.mail}</span>

                <div class="action">
                    <button class="update btn btn-info" data-id="${usuario.id}" data-nombre="${usuario.nombre}"
                        data-apellido="${usuario.apellido}" data-mail="${usuario.mail}"><i class="bi bi-arrow-clockwise"></i>edit</button>

                    <button class="delete btn btn-danger" data-id="${usuario.id}"><i class="bi bi-trash"></i>delete</button>
                </div>
            `;
            listaDeUsuarios.appendChild(li);
        });

        // Actualizar usuario
        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', event => {

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
                console.log("delete button click", id);

                const response = await fetch(`/user/${id}`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                alert(result.message);
                listarUsuarios();
            });
        });

        // Crear usuario
        crearUsuarioForm.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(crearUsuarioForm);

            const data = {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                mail: formData.get('mail'),
                favorite: formData.getAll('favorite'),
                member: formData.get('member') !== null,
                permiso: formData.get('permiso'),
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
            alert(result.message);
            crearUsuarioForm.reset();
            crearUsuarioForm.classList.add('hidden');
            listarUsuarios();

        });

        // Actualizar usuario

    }
});