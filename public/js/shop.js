console.log("Aqui vemos y agregamos productos");

const listaDeProductos = document.getElementById('product_list');

// Listar todos los productos
async function listarProductos() {

    const response = await fetch('/product/all');

    // Manejo de errores HTTP
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.mensaje || 'Error al obtener los usuarios');
    }

    const productos = await response.json();

    listaDeProductos.innerHTML = '';

    productos.forEach(producto => {
        const col = document.createElement('div');
        col.classList.add('col');

        let structure = `
        <div class="card shadow-sm" data-bs-toggle="modal" data-bs-target="#id_product_01">
                    <!-- Imagen principal -->
                    <img src="./images/web-images/image_placeholader.png" alt="..." width="100%"
                        class="card-img-top mx-auto d-block">

                    <div class="card-body">

                        <h3 class="my-2 modal-title" id="exampleModalLabel">${producto.titulo}</h3>
                        <h4 class="my-2 modal-title" id="exampleModalLabel">${producto.sku}</h4>
                        <p class="card-text">${producto.descripcion}</p>

                        <div class="d-flex justify-content-center align-items-center">
                            <h1 class="card-title pricing-card-title">
                                <small class="text-muted fw-light">AR$</small>
                                ${producto.precio}
                            </h1>
                        </div>
                        <div class="d-flex justify-content-end align-items-center pt-2">
                            <!-- <small class="text-body-secondary">9 mins</small> -->
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-primary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-primary">Edit</button>
                            </div>

                        </div>
                    </div>

                </div>

                <!-- Modal -->
                <div class="modal fade" id="id_product_01" data-bs-backdrop="static" tabindex="-1"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">

                        <div class="modal-content">

                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>

                            <div class="modal-body row">
                                <div class="col-12 col-md-5">
                                    <img src="./images/web-images/image_placeholader.png" alt="..." width="100%"
                                        class="card-img-top mx-auto d-block rounded">
                                </div>
                                <div class="col-12 col-md-7">
                                    <div class="col p-4 d-flex flex-column position-static">

                                        <!-- Editar / Eliminar -->
                                        <div class="my-2 d-flex justify-content-end">
                                            <a href="#"
                                                class="badge rounded-pill bg-secondary py-2 px-3 text-light bg-opacity-25">
                                                Editar
                                            </a>
                                            <a href="#"
                                                class="badge rounded-pill bg-secondary py-2 px-3 text-light bg-opacity-25">
                                                Eliminar
                                            </a>
                                        </div>

                                        <h3 class="my-2 modal-title" id="exampleModalLabel">
                                            ${producto.titulo}
                                            <span class="badge bg-primary bg-primary">SKU# ${producto.sku}</span>
                                        </h3>
                                        <p>
                                            ${producto.descripcion}
                                        </p>
                                        <h1 class="card-title pricing-card-title">
                                            <small class="text-muted fw-light">AR$</small>
                                            ${producto.precio}
                                        </h1>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer d-flex justify-content-end">
                                <button type="button" class="btn btn-primary my-2 w-50 rounded-pill"
                                    data-bs-dismiss="modal">
                                    <i class="bi bi-cart-plus-fill"></i>
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        `

        col.innerHTML = structure

        listaDeProductos.appendChild(col);
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

            const response = await fetch(`/product/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            // alert(result.message);
            confirm(result.message)
            listarProductos();
        });
    });

}

listarProductos();