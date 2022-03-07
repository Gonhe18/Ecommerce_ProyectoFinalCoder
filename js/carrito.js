// Importo carrito
import { carrito } from "./script.js";

// Variables
let tarjetas = document.querySelector(".card-prod");
let visualCarrito = document.querySelector(".contenido-carrito");
let categoria = document.getElementById("category");

// Obtengo los productos desde la API
export const obtencionProd = async () => {
  const resp = await fetch("./api/productos.json");
  const producto = await resp.json();
  generoCard(producto);
  filtroProductos(producto);
  mostrarCarrito();
};

// GENERO LAS CARD
const generoCard = (productos) => {
  productos.forEach((prod) => {
    let cardProd = document.createElement("article");
    cardProd.classList.add("prod");
    cardProd.innerHTML = `
      <div class="img-contenedor">
        <img src='${prod.img}' alt="Producto" class="prod-img"/>
        <button class="bag-btn" data-id=${prod.id}>
          <i class="fas fa-shopping-cart"></i>
        Agregar a carrito
        </button>
        </div>
      <div class='tit-contenedor'>
        <h3>${prod.marca} ${prod.modelo}</h3>
        <h4>$${prod.precio}</h4>
      </div>
      `;
    tarjetas.appendChild(cardProd);
  });
  btnAgregarACarrito();
  cantProdCarrito();
  agregarACarrito(productos);
};

// AGREGO PRODUCTOS AL OBJETO DEL CARRITO
const agregarACarrito = (item) => {
  let btnCompra = document.querySelectorAll(".bag-btn");
  // Obtengo producto por ID
  for (let i = 0; i < btnCompra.length; i++) {
    btnCompra[i].addEventListener("click", (e) => {
      e.preventDefault();
      // Según ID almaceno el producto en el array
      let idItem = btnCompra[i].getAttribute("data-id");
      let prod = filtroPorId(item, idItem);
      let itemComprado = {
        id: prod.id,
        categoria: prod.ref,
        marca: prod.marca,
        modelo: prod.modelo,
        precio: prod.precio,
        img: prod.img,
        cantidad: 1,
      };
      carrito.push(itemComprado);
      btnAgregarACarrito();
      alertSeleccionProd();
      cantProdCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

// Creo filtro de productos de forma dinámica
const filtroProductos = (prod) => {
  let filter = document.getElementById("category");
  // Creo nuevo Array con todas las catergorias de productos
  let catProd = prod.map((e) => e.ref);
  // Filtro las categorías y comparo eliminando aquellas que se repiten
  let listaCat = catProd.filter((item, index) => {
    return catProd.indexOf(item) === index;
  });
  for (let cat of listaCat) {
    filter.innerHTML += `
      <option value="${cat}">${cat}</option>  
    `;
  }
  filtroPorCat(prod);
};

// MUESTRO CARRITO
const mostrarCarrito = () => {
  document.querySelector(".cart-btn").addEventListener("click", (e) => {
    e.preventDefault();
    // Muestro carro
    document.querySelector(".bloque-carrito").classList.add("transparenteBcg");
    document.querySelector(".carrito").classList.add("showCart");
    // CARGO LA INFORMACIÓN DEL CARRITO
    renderCarrito();
    // MENSAJE DE CARRITO VACIO
    msjCarritoVacio();
    // MODIFICO CANTIDAD DE PRODUCTOS
    modifCantElementos();
    // REMUEVO ELEMENTO DESDE CARRITO
    removerProd();
    // VACIO CARRITO
    vaciarCarrito();
    // OCULTO CARRITO
    ocultarCarrito();
  });
};

// MUESTRO LOS PRODUCTOS AGREGADOS
const renderCarrito = () => {
  let saldo = parseInt(document.querySelector(".total-carrito").textContent);
  // Cargo información de los objetos agregados
  carrito.forEach((item) => {
    let templateCarrito = document.createElement("div");
    templateCarrito.classList.add("carrito-item");
    templateCarrito.setAttribute("data-id", `${item.id}`);
    templateCarrito.innerHTML = `
      <img src='${item.img}' alt="prod"/>
      <div>
        <h4>${item.categoria} - ${item.marca} ${item.modelo}</h4>
        <h5>$${item.precio}</h5>
        <span class="remove-item" data-id=${item.id}>Remove<span>
      </div>
      <div class='contador'>
        <i class="fas fa-chevron-up aumentar" data-up=${item.id} ></i>
        <p class="cant-item">${item.cantidad}</p>
        <i class="fas fa-chevron-down disminuir" data-down=${item.id}></i>
      </div>
    `;
    visualCarrito.appendChild(templateCarrito);
    saldo += item.precio * item.cantidad;
  });
  // Muestro saldo total
  document.querySelector(".total-carrito").innerHTML = saldo;
  cantProdCarrito();
};

// ACUMULADOR DE PRODUCTOS
const modifCantElementos = () => {
  let contador = document.querySelectorAll(".contador");
  let totalProductos = document.querySelectorAll(".carrito-item");

  for (let i = 0; i < contador.length; i++) {
    contador[i].addEventListener("click", (e) => {
      let saldo = parseInt(
        document.querySelector(".total-carrito").textContent
      );
      let aumentoProd = filtroPorId(carrito, e.target.dataset.up);
      let disminProd = filtroPorId(carrito, e.target.dataset.down);
      let indiceProd;

      if (e.target.classList.contains("aumentar")) {
        indiceProd = carrito.indexOf(aumentoProd);
        // Almaceno la cantidad de prod en el objeto
        aumentoProd.cantidad = carrito[indiceProd].cantidad + 1;
        // Acumulo el saldo aumentando a medida que agrego prod
        saldo += aumentoProd.precio;
        // Muestro la cantidad de elementos
        document.querySelectorAll(".cant-item")[indiceProd].innerHTML =
          aumentoProd.cantidad;
      }
      if (e.target.classList.contains("disminuir")) {
        indiceProd = carrito.indexOf(disminProd);
        // Disminuyo el saldo a medida que descuento prod
        saldo -= disminProd.precio;
        if (disminProd.cantidad > 1) {
          // Almaceno la cantidad de prod en el objeto
          disminProd.cantidad = carrito[indiceProd].cantidad - 1;
          // Muestro la cantidad de elementos
          document.querySelectorAll(".cant-item")[indiceProd].innerHTML =
            disminProd.cantidad;
        } else {
          // Remuevo elemento del Array
          carrito.splice(indiceProd, 1);
          // Elimino elemento de la vista del carrito
          visualCarrito.removeChild(totalProductos[i]);
          // Habilito botones productos
          btnAgregarACarrito();
          // Msj carrito vacio
          msjCarritoVacio();
        }
      }
      // Actualizo saldo
      document.querySelector(".total-carrito").innerHTML = saldo;
      // Actualizo contador carrito
      cantProdCarrito();
      // Actualizo carrito en lS
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

// REMUEVO ELEMENTO DESDE CARRITO
const removerProd = () => {
  let totalProductos = document.querySelectorAll(".carrito-item");
  let removerProd = document.querySelectorAll(".remove-item");

  for (let i = 0; i < removerProd.length; i++) {
    removerProd[i].addEventListener("click", (e) => {
      e.preventDefault();
      let idProd = removerProd[i].getAttribute("data-id");
      let indiceProd = carrito.indexOf(filtroPorId(carrito, idProd));
      let saldoNuevo = 0;
      // Remuevo elemento del Array
      carrito.splice(indiceProd, 1);
      // Lo elimino desde el detalle de compra
      visualCarrito.removeChild(totalProductos[i]);
      // actualizo saldo
      for (let item of carrito) {
        saldoNuevo += item.precio * item.cantidad;
      }
      document.querySelector(".total-carrito").innerHTML = saldoNuevo;
      // Habilito botones de productos
      btnAgregarACarrito();
      // Actualizo contador carrito
      cantProdCarrito();
      // Msj carrito vacio
      msjCarritoVacio();
      // Realizo nueva copia al localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

// OCULTAR CARRITO
const ocultarCarrito = () => {
  document.querySelector(".fin-carrito").addEventListener("click", (e) => {
    e.preventDefault();
    // Oculto carro
    document
      .querySelector(".bloque-carrito")
      .classList.remove("transparenteBcg");
    document.querySelector(".carrito").classList.remove("showCart");
    // Elimino el contenido del carro, para que se genere como nuevo al mostrarlo
    document.querySelector(".contenido-carrito").innerHTML = "";
    document.querySelector(".total-carrito").innerHTML = "0";
  });
};

// VACIAR CARRITO
const vaciarCarrito = () => {
  document.querySelector(".limpiar-carro").addEventListener("click", (e) => {
    e.preventDefault();
    // Elimino el contenido del carro
    carrito.splice((0)[carrito.length]);
    // limpio lista de prod
    document.querySelector(".contenido-carrito").innerHTML = "";
    // contador de prod
    cantProdCarrito();
    // Habilito botones productos
    btnAgregarACarrito();
    // Msj carrito vacio
    msjCarritoVacio();
    // Elimino todos los elementos del localStorage
    localStorage.clear();
  });
};

// FILTRO INDEX
const filtroPorCat = (prod) => {
  categoria.addEventListener("click", (e) => {
    let filtro = prod.filter((item) => item.ref === e.target.value);
    if (filtro != "") {
      tarjetas.innerHTML = "";
      generoCard(filtro);
      agregarACarrito();
    } else {
      tarjetas.innerHTML = "";
      generoCard(prod);
      agregarACarrito();
    }
  });
};

// Función para filtra productos por id
export const filtroPorId = (arr, prod) => {
  return arr.find((el) => el.id == prod);
};

// Habilito/deshabilito botón de compra
const btnAgregarACarrito = () => {
  let btnCompra = document.querySelectorAll(".bag-btn");
  for (let i = 0; i < btnCompra.length; i++) {
    let indiceBtn = btnCompra[i].getAttribute("data-id");
    let lugarProd = filtroPorId(carrito, indiceBtn);
    if (lugarProd === undefined) {
      btnCompra[i].disabled = false;
      btnCompra[i].innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        Agregar a carrito
      `;
    } else {
      btnCompra[i].disabled = true;
      btnCompra[i].innerHTML = `
        <i class="fa-solid fa-check-to-slot"></i>
        En el carrito
      `;
    }
  }
};

// Mensaje "Carrito Vacio"
const msjCarritoVacio = () => {
  if (carrito.length != 0) {
    document.querySelector(".carrito-vacio").classList.add("oculto");
    document.querySelector(".carrito-footer").classList.remove("oculto");
  } else {
    document.querySelector(".carrito-vacio").classList.remove("oculto");
    document.querySelector(".carrito-footer").classList.add("oculto");
  }
};

// Actualizo contador carrito
const cantProdCarrito = () => {
  let acumulador = 0;
  for (let item of carrito) {
    acumulador += item.cantidad;
  }
  document.querySelector(".cart-items").innerHTML = acumulador;
};

// Alerta al agregar prod
const alertSeleccionProd = () => {
  Toastify({
    text: "Producto agregado al carrito!!",
    duration: 1500,
    gravity: "top",
    position: "right",
    stopOnFocus: false,
    style: {
      background: "##56ab2f",
      background: "-webkit-linear-gradient(to right, #a8e063, #56ab2f)",
      background: "linear-gradient(to right, #a8e063, #56ab2f)",
      color: "#000",
      fontWeight: "bold",
      borderRadius: "10px",
      marginTop: "40px",
      fontSize: "0.9rem",
    },
  }).showToast();
};
