const tarjetas = document.getElementById("tarjetas");
const verCarrito = document.getElementById("verCarrito");
const ventanaCarrito = document.getElementById("ventanaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

const productos = [
    {
        id: 1,
        nombre: "tetris",
        precio: 2000,
        img: "./multimedia/img/tetris.png"
    },
    {
        id: 2,
        nombre: "auricular",
        precio: 1000,
        img: "./multimedia/img/auricular.jpeg"
    },
    {
        id: 3,
        nombre: "cargadorEncendedor",
        precio: 500,
        img: "./multimedia/img/cargencendedor.jpeg"
    },
    {
        id: 4,
        nombre: "cargadorSolar",
        precio: 3000,
        img: "./multimedia/img/cargsolar.jpeg"
    },
    {
        id: 5,
        nombre: "mochila",
        precio: 2000,
        img: "./multimedia/img/mochila.jpeg"
    },
    {
        id: 6,
        nombre: "parlante",
        precio: 2000,
        img: "./multimedia/img/parlante.jpeg"
    },
    {
        id: 7,
        nombre: "tablet",
        precio: 5000,
        img: "./multimedia/img/tablet.jpeg"
    },
    {
        id: 8,
        nombre: "teclado",
        precio: 2000,
        img: "./multimedia/img/teclado.jpeg"
    },

];

//trae el localStorage los productos del carrito
let carrito = JSON.parse(localStorage.getItem("carrito"))|| [];

//crea las tarjetas con los productos 
productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "tarjeta";
    content.innerHTML = `
    <img src="${producto.img}">
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}$</p>
    `;
    tarjetas.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    content.append(comprar);

   comprar.addEventListener("click", () => {
        const repetido = carrito.some((prodRepetido) => prodRepetido.id == producto.id)
        if (repetido) {
            carrito.map((prod)=>{
                if (prod.id == producto.id) {
                    prod.cantidad ++;
                }

            })
        }else {
        carrito.push({
            id: producto.id,
            img: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        })
        pintarContadorCarrito();
        }
        guardarCarrito();
    })
})
// guarda los pruductos del arrito en el localStorage
const guardarCarrito = ()=>{
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

const pintarCarrito = () => {
    ventanaCarrito.style.display = "flex";
    ventanaCarrito.innerHTML = "";
    let headerCarrito = document.createElement("div");
    headerCarrito.className = "headerCarrito"
    headerCarrito.innerHTML = `
    <h2 class="headerCarritoTitulo">Carrito</h2>
    `;
    ventanaCarrito.append(headerCarrito);

    let cerrarCarrito = document.createElement("h3")
    cerrarCarrito.innerText = "❌";
    cerrarCarrito.className = "botonCerrarCarrito";

    cerrarCarrito.addEventListener("click", () => {
        ventanaCarrito.style.display = "none";
    })

    headerCarrito.append(cerrarCarrito)

    //pintamos en la ventana del carrito los pruductos agregados al mismo.
    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "carritoContent";
        carritoContent.innerHTML = `
        <img src="${producto.img} ">
        <h3>${producto.nombre} </h3>
        <p>${producto.precio}$ </p>
        <p>cantidad= ${producto.cantidad} </p>
        <p>sub total= ${producto.precio * producto.cantidad}$</p>
        `;
        ventanaCarrito.append(carritoContent);
        
        let eliminarProd = document.createElement("span")
        eliminarProd.className= "botonEliminarProducto";
        eliminarProd.innerText = "❌";
        carritoContent.append(eliminarProd)
        eliminarProd.addEventListener("click",()=>{
            const aEliminar = carrito.indexOf(producto);
            carrito.splice(aEliminar,1);
            pintarCarrito();
            pintarContadorCarrito();
            guardarCarrito();
        })

    })
// calculo el precio total de los pruductos en el carrito
    const total = carrito.reduce((acc, elem) => acc + (elem.precio * elem.cantidad), 0);

    let totalCarrito = document.createElement("div")
    totalCarrito.className = "totalCarrito";
    totalCarrito.innerHTML = `<h3>Total= ${total}$</h3>`
    ventanaCarrito.append(totalCarrito);
}



//al hacer click en el carrito se llama la funcion que lo pinta en pantalla
verCarrito.addEventListener("click", pintarCarrito)

//pinta sibre el icono del carrito la cantidad de pruductos agregados
const pintarContadorCarrito = ()=>{
    
    if (carrito.length == 0) {
        contadorCarrito.style.display = "none";
    }else{
        contadorCarrito.style.display = "flex";
        contadorCarrito.innerText = carrito.length;
    }
}

//llamo la funcion para que al recargar la pagina se pinten la cantidad de pruductos en el carrito
    pintarContadorCarrito();

