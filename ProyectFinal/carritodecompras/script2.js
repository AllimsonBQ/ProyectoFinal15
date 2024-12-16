const listaCursos = document.getElementById("lista-cursos"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_cursos'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito'),
    cantidadProductos = document.getElementById("total-count"),
    totalPrecio = document.getElementById("total-price"),
    comprarBtn = document.getElementById("comprar_carrito");

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    // Cuando le damos click a "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar curso del carrito
    contenedorCarrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        actualizarCarrito();
    });

    // Redirigir a WhatsApp
    comprarBtn.addEventListener('click', comprarCarrito);
}

function agregarCurso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        actualizarCarrito();
    }
}

function leerInfo(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: parseFloat(curso.querySelector('.descuento').textContent.replace('S/', '').trim()),
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        articulosCarrito = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
            }
            return curso;
        });
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    limpiarHTML();

    let total = 0;
    let cantidadTotal = 0;

    articulosCarrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.classList.add('item-carrito');
        fila.innerHTML = `
            <img src="${curso.imagen}" alt="${curso.titulo}">
            <p>${curso.titulo}</p>
            <p>S/${curso.precio.toFixed(2)}</p>
            <p>${curso.cantidad}</p>
            <p><span class="borrar-curso" data-id="${curso.id}">X</span></p>
        `;
        contenedorCarrito.appendChild(fila);

        total += curso.precio * curso.cantidad;
        cantidadTotal += curso.cantidad;
    });

    cantidadProductos.textContent = cantidadTotal;
    totalPrecio.textContent = `S/${total.toFixed(2)}`;
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function comprarCarrito() {
    if (articulosCarrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola! Estoy interesado en los siguientes productos:\n";
    articulosCarrito.forEach(curso => {
        mensaje += `${curso.titulo} - Cantidad: ${curso.cantidad} - Total: S/${(curso.precio * curso.cantidad).toFixed(2)}\n`;
    });
    mensaje += `\nTotal a pagar: S/${totalPrecio.textContent.replace('S/', '')}`;

    const enlaceWhatsApp = `https://wa.me/51983841459?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, "_blank");
}
