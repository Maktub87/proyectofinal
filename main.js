

const fechaActual = new Date();
console.log(fechaActual.toLocaleString());

async function iniciarPagina() {
    await loguear();
}

function loguear() {
    let identificar = true;
    let intentos = 1;

    return new Promise((resolve) => {
        (function promptLoop() {
            Swal.fire({
                title: 'Ingresa tu usuario (solo 3 intentos)',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Ingresar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Por favor, ingresa tu usuario';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const usuario = result.value.toLowerCase();

                    if (["javier", "marcelo", "macarena", "ramiro"].includes(usuario) && intentos <= 3) {
                        Swal.fire('¡Bienvenido a control de Stock!', `${usuario}`);
                        identificar = false;
                        resolve();
                    } else {
                        Swal.fire('No tienes autorización', `${usuario}`);
                        intentos++;
                        if (intentos >= 3) {
                            Swal.fire({
                                icon: 'error',
                                title: 'No tienes autorización',
                                text: 'Por favor, ingresa un dato válido!',
                            });
                            console.error('No se reconoce el usuario');
                            identificar = false;
                            resolve();
                        } else {
                            promptLoop();
                        }
                    }
                } else {
                    identificar = false;
                    resolve();
                }
            });
        })();
    });
}

function ProductoLimpieza(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;

}

let producto1 = new ProductoLimpieza("Detergente", 1200, 67);
let producto2 = new ProductoLimpieza("Limpiavidrios", 500, 10);
let producto3 = new ProductoLimpieza("Desinfectante", 700, 35);
let producto4 = new ProductoLimpieza("Escoba", 850, 17);
let producto5 = new ProductoLimpieza("Cepillo", 1000, 45);
let producto6 = new ProductoLimpieza("Jabón en Polvo", 3000, 150);
let producto7 = new ProductoLimpieza("Toallas de Papel", 1000, 300);
let producto8 = new ProductoLimpieza("Guantes de Limpieza", 1500, 10);
let producto9 = new ProductoLimpieza("Pefrume para Ropa", 900, 15);
let producto10 = new ProductoLimpieza("Trapo de piso", 500, 22);
let producto11 = new ProductoLimpieza("Papel Higienico", 2000, 300);
let producto12 = new ProductoLimpieza("Esponja", 300, 100);

let listaLimpieza = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12,];



if (localStorage.getItem("productoLimpieza")) {
    listaLimpieza = JSON.parse(localStorage.getItem("productoLimpieza"));
} else {
    listaLimpieza = listaLimpieza
}

function buscarConAcciones() {
    const input = document.getElementById("filtrar2");
    const palabraClave = input.value.trim().toUpperCase();
    const resultado = listaLimpieza.filter(productoLimpieza => productoLimpieza.nombre.toUpperCase().includes(palabraClave));

    if (resultado.length > 0) {
        displaySearchResultsConAcciones(resultado);
    } else {
        Swal.fire({
            title: 'Producto no encontrado',
            text: 'No hay productos que coincidan con la búsqueda.',
            icon: 'warning',
        });
    }
}

function displaySearchResultsConAcciones(resultado) {
    const container = document.createElement("div");

    resultado.forEach((producto, index) => {
        const card = document.createElement("div");
        card.classList.add('result-card');

        const nombre = document.createElement("h2");
        nombre.textContent = `Producto: ${producto.nombre}`;
        card.appendChild(nombre);

        const precio = document.createElement("p");
        precio.textContent = `Precio: ${producto.precio}`;
        card.appendChild(precio);

        const stock = document.createElement("p");
        stock.textContent = `Cantidad: ${producto.stock}`;
        card.appendChild(stock);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => deleteProduct(index));
        card.appendChild(deleteButton);

        const modifyButton = document.createElement("button");
        modifyButton.textContent = "Modificar";
        modifyButton.addEventListener("click", () => modifyProduct(index));
        card.appendChild(modifyButton);

        container.appendChild(card);
    });

    document.getElementById("resultados-container").innerHTML = "";
    document.getElementById("resultados-container").appendChild(container);
}

function deleteProduct(index) {
    const productoAEliminar = listaLimpieza[index];

    Swal.fire({
        title: '¿Estás seguro?',
        text: `Estás a punto de eliminar el producto: ${productoAEliminar.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            listaLimpieza.splice(index, 1);
            updateLocalStorageAndDisplay();
            Swal.fire({
                title: 'Producto eliminado',
                text: 'El producto ha sido eliminado correctamente.',
                icon: 'success'
            }).then(() => {
                updateLocalStorageAndDisplay();
            });
        }
    });
}

function modifyProduct(index) {
    const productoAModificar = listaLimpieza[index];

    Swal.fire({
        title: 'Modificar producto',
        html: `<div class="cajamodifica">
            <label for="modifiedProductName">Nombre del producto:</label>
            <input type="text" id="modifiedProductName" value="${productoAModificar.nombre}">
            <label for="modifiedProductPrice">Precio del producto:</label>
            <input type="number" id="modifiedProductPrice" value="${productoAModificar.precio}">
            <label for="modifiedProductStock">Cantidad del producto:</label>
            <input type="number" id="modifiedProductStock" value="${productoAModificar.stock}">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar cambios',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            productoAModificar.nombre = document.getElementById("modifiedProductName").value;
            productoAModificar.precio = parseInt(document.getElementById("modifiedProductPrice").value);
            productoAModificar.stock = parseInt(document.getElementById("modifiedProductStock").value);

            updateLocalStorageAndDisplay();
            Swal.fire({
                title: 'Producto modificado',
                text: 'El producto ha sido modificado correctamente.',
                icon: 'success'
            }).then(() => {
                updateLocalStorageAndDisplay();
            });
        }
    });
}

function updateLocalStorageAndDisplay() {
    localStorage.setItem("productoLimpieza", JSON.stringify(listaLimpieza));

}

function agregarproductos() {
    const nuevonombre = document.getElementById("productonuevo").value;
    const nuevoprecio = parseInt(document.getElementById("precionuevo").value);
    const nuevacantidad = parseInt(document.getElementById("cantidadnueva").value);

    if (nuevonombre && !isNaN(nuevoprecio) && !isNaN(nuevacantidad)) {
        const nuevoproducto = new ProductoLimpieza(nuevonombre, nuevoprecio, nuevacantidad);
        listaLimpieza.push(nuevoproducto);
        localStorage.setItem("productoLimpieza", JSON.stringify(listaLimpieza));

        updateLocalStorageAndDisplay();

        Swal.fire({
            title: 'Nuevo producto agregado',
            text: 'Se ha agregado el nuevo producto correctamente.',
            icon: 'success',
        });
    } else {
        Swal.fire({
            title: 'Datos inválidos',
            text: 'Por favor, ingresa datos válidos para el nuevo producto.',
            icon: 'error',
        });
    }
}

const filtrarBoton2 = document.getElementById("botonagregar");
filtrarBoton2.addEventListener("click", agregarproductos);

const filtrarBoton3 = document.getElementById("botonfiltrar2");
filtrarBoton3.addEventListener("click", buscarConAcciones);




iniciarPagina();



