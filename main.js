console.log("¡Bienvenido al sistema de gestión de productos de limpieza!");

const fechaActual = new Date();
console.log(fechaActual.toLocaleString());

function loguear() {
    let identificar = true;
    let intentos = 1;

    do {
        let usuario = prompt("Ingresa tu usuario (solo 3 intentos)").toLowerCase();
        if (usuario == null) {
            break;
        }

        if (["javier", "marcelo", "macarena", "ramiro"].includes(usuario) && intentos <= 3) {
            alert("Bienvenido a control de stock " + usuario);
            identificar = false;
        } else {
            alert("No tienes autorización " + usuario);
            intentos++;
            if (intentos >= 3) {
                alert("No tienes permiso para stockear");
                console.error("No se reconoce el usuario");
                break;
            }
        }
    } while (identificar);
}

loguear();

function ProductoLimpieza(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

let producto1 = new ProductoLimpieza("Detergente", 1200, 67);
let producto2 = new ProductoLimpieza("Limpiavidrios", 500, 10);
let producto3 = new ProductoLimpieza("Desinfectante", 700, 35)
let producto4 = new ProductoLimpieza("Escoba", 850, 17)
let producto5 = new ProductoLimpieza("Cepillo", 1000, 45)
let producto6 = new ProductoLimpieza("Jabón en Polvo", 3000, 150)
let producto7 = new ProductoLimpieza("Toallas de Papel", 1000, 300)
let producto8 = new ProductoLimpieza("Guantes de Limpieza", 1500, 10)
let producto9 = new ProductoLimpieza("Pefrume para Ropa", 900, 15)
let producto10 = new ProductoLimpieza("Trapo de piso", 500, 22)
let producto11 = new ProductoLimpieza("Papel Higienico", 2000, 300)
let producto12 = new ProductoLimpieza("Esponja", 300, 100)

let listaLimpieza = [producto1, producto2,producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12];

if (localStorage.getItem("productoLimpieza")) {
    listaLimpieza = JSON.parse(localStorage.getItem("productoLimpieza"));
} else {
    listaLimpieza = listaLimpieza;
}

function filtrarProductosLimpieza() {
    const body = document.querySelector("body");
    const input = document.getElementById("filtrar1");
    const palabraClave = input.value.trim().toUpperCase();
    const resultado = listaLimpieza.filter(productoLimpieza => productoLimpieza.nombre.toUpperCase().includes(palabraClave));

    if (resultado.length > 0) {
        const container = document.createElement("div");

        resultado.forEach(producto => {
            const card = document.createElement("div");

            const nombre = document.createElement("h2");
            nombre.textContent = `Producto: ${producto.nombre}`;
            card.appendChild(nombre);

            const precio = document.createElement("p");
            precio.textContent = `Precio: ${producto.precio}`;
            card.appendChild(precio);

            const stock = document.createElement("p");
            stock.textContent = `Cantidad: ${producto.stock}`;
            card.appendChild(stock);

            container.appendChild(card);
        });

        body.appendChild(container);
    } else {
        alert("Este producto no hay en stock ");
    }
}

const filtrarBoton = document.getElementById("botonfiltrar");
filtrarBoton.addEventListener("click", filtrarProductosLimpieza);


function agregarproductos() {
    const nuevonombre = document.getElementById("productonuevo").value;
    const nuevoprecio = parseInt(document.getElementById("precionuevo").value);
    const nuevacantidad = parseInt(document.getElementById("cantidadnueva").value);

    if (nuevonombre && !isNaN(nuevoprecio) && !isNaN(nuevacantidad)) {
        const nuevoproducto = new ProductoLimpieza(nuevonombre, nuevoprecio, nuevacantidad);
        listaLimpieza.push(nuevoproducto);
        localStorage.setItem("productoLimpieza", JSON.stringify(listaLimpieza));
        alert("Se agrego el nuevo producto!");
    } else {
        alert("Porfavor ingresa un dato valido");
    }
}

function filtrarProductosLimpieza() {
    const body = document.querySelector("body");
    const input = document.getElementById("filtrar1");
    const palabraClave = input.value.trim().toUpperCase();
    const resultado = listaLimpieza.filter(productoLimpieza => productoLimpieza.nombre.toUpperCase().includes(palabraClave));

    if (resultado.length > 0) {
        const container = document.createElement("div");

        resultado.forEach(producto => {
            const card = document.createElement("div");

            const nombre = document.createElement("h2");
            nombre.textContent = `Producto: ${producto.nombre}`;
            card.appendChild(nombre);

            const precio = document.createElement("p");
            precio.textContent = `Precio: ${producto.precio}`;
            card.appendChild(precio);

            const stock = document.createElement("p");
            stock.textContent = `Cantidad: ${producto.stock}`;
            card.appendChild(stock);

            container.appendChild(card);
        });

        body.appendChild(container);
    } else {
        alert("Este producto no hay en stock ");
    }
}

const filtrarBoton2 = document.getElementById("botonagregar");
filtrarBoton2.addEventListener("click", agregarproductos);
