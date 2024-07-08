
document.addEventListener('DOMContentLoaded', () => {
    console.log("Aqui vemos y agregamos productos");

    const listaDeProductos = document.getElementById('product_list');
    const editarProductoForm = document.getElementById('editarProductoForm');
    const crearProductoForm = document.getElementById('crearProductoForm');

    // Crear producto
    crearProductoForm.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(crearProductoForm);

        // sku, titulo, descripcion, precio
        const data = {
            sku: formData.get('sku'),
            titulo: formData.get('titulo'),
            descripcion: formData.get('descripcion'),
            precio: formData.get('precio')
        };

        // const data = {
        //     sku: formData.get('sku'),
        //     titulo: formData.get('titulo'),
        //     descripcion: formData.get('descripcion'),
        //     precio: parseFloat(formData.get('precio')) // Convertir a número, sugerido para almacenar el tipo de dato
        // };

        // console.log(data)

        // Enviar la data al backend
        const response = await fetch('product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        listarProductos();

    });

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
        <div class="card shadow-sm">
                    <!-- Imagen principal -->
                    <img src="./images/web-images/image_placeholader.png" alt="..." width="100%"
                        class="card-img-top mx-auto d-block" data-bs-toggle="modal" data-bs-target="#${producto.sku}">

                    <div class="card-body">

                        <h3 class="my-2 modal-title" id="exampleModalLabel" data-bs-toggle="modal" data-bs-target="#${producto.sku}">${producto.titulo}</h3>
                        <h4 class="my-2 modal-title" id="exampleModalLabel" data-bs-toggle="modal" data-bs-target="#${producto.sku}">${producto.sku}</h4>
                        <p class="card-text" data-bs-toggle="modal" data-bs-target="#${producto.sku}">${producto.descripcion}</p>

                        <div class="d-flex justify-content-center align-items-center">
                            <h1 class="card-title pricing-card-title" data-bs-toggle="modal" data-bs-target="#${producto.sku}">
                                <small class="text-muted fw-light">AR$</small>
                                ${producto.precio}
                            </h1>
                        </div>
                        <div class="d-flex justify-content-end align-items-center pt-2">
                            <div class="rounded-pill">
                                <button type="button" class="delete btn btn-sm btn-outline-danger rounded-pill" data-id="${producto.id}">Eliminar</button>
                                <button type="button" class="update btn btn-sm btn-outline-primary rounded-pill" data-id="${producto.id}" data-sku="${producto.sku}" data-titulo="${producto.titulo}" data-descripcion="${producto.descripcion}" data-precio="${producto.precio}"   data-bs-toggle="modal"
                    data-bs-target="#editProduct">Editar</button>
                            </div>

                        </div>
                    </div>

                </div>

                <!-- Modal -->
                <div class="modal fade" id="${producto.sku}" data-bs-backdrop="static" tabindex="-1"
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

            col.innerHTML = structure;

            listaDeProductos.appendChild(col);
            // listaDeProductos.insertAdjacentHTML('afterbegin', col.innerHTML);
            // listaDeProductos.insertAdjacentHTML('beforeend', col.innerHTML);
        });

        // Actualizar Producto
        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', event => {

                console.log("click update");

                const id = event.target.getAttribute('data-id');
                const sku = event.target.getAttribute('data-sku');
                const titulo = event.target.getAttribute('data-titulo');
                const descripcion = event.target.getAttribute('data-descripcion');
                const precio = event.target.getAttribute('data-precio');

                document.getElementById('editID').value = id;
                document.getElementById('editSku').value = sku;
                document.getElementById('editTitulo').value = titulo;
                document.getElementById('editDescripcion').value = descripcion;
                document.getElementById('editPrecio').value = precio;
            });
        });

        // Eliminar usuario
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async event => {

                console.log("click en delete");

                const id = event.target.getAttribute('data-id');

                const response = await fetch(`/product/${id}`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                listarProductos();
                // confirm(result.message);
                alert(result.message);
            });
        });
    }

    // Actualizar producto
    editarProductoForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(editarProductoForm);
        const id = formData.get('editID');

        const data = {
            titulo: formData.get('editTitulo'),
            sku: formData.get('editSku'),
            descripcion: formData.get('editDescripcion'),
            precio: formData.get('editPrecio')
        };

        const response = await fetch(`product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        editarProductoForm.reset();
        listarProductos();
        alert(result.message);
    });

    listarProductos();
});


