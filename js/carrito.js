// Importo Objeto de productos
import { productos } from "./productoPago.js";
// Importo carrito
import { carrito } from "./script.js";

// Variables
let tarjetas = document.querySelector(".card-prod");
let visualCarrito = document.querySelector(".contenido-carrito");
let btnPago = document.querySelector(".btn-pago");

// Función para filtra productos por id
export const filtroProd = (arr, prod) => {
  return arr.find((el) => el.id == prod);
};

// Modifico botón de compra
const habBtnCompra = () => {
  let btnCompra = document.querySelectorAll(".bag-btn");
  for (let i = 0; i < btnCompra.length; i++) {
    let indiceBtn = btnCompra[i].getAttribute("data-id");
    let lugarProd = filtroProd(carrito, indiceBtn);
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

// Muestro/oculto btn para finalizar compra
const accionPago = () => {
  carrito.length != 0
    ? btnPago.classList.remove("oculto")
    : btnPago.classList.add("oculto");
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
    duration: 3000,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "##56ab2f",
      background: "-webkit-linear-gradient(to right, #a8e063, #56ab2f)",
      background: "linear-gradient(to right, #a8e063, #56ab2f)",
      color: "#000",
      fontWeight: "bold",
      borderRadius: "10px",
      marginTop: "40px",
    },
  }).showToast();
};

// GENERO LAS CARD
export const generoCard = (articulos) => {
  articulos.forEach((prod) => {
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
  habBtnCompra();
  cantProdCarrito();
};

// AGREGO PRODUCTOS AL OBJETO DEL CARRITO
export const addProdCarrito = () => {
  let btnCompra = document.querySelectorAll(".bag-btn");
  // Obtengo producto por ID
  for (let i = 0; i < btnCompra.length; i++) {
    btnCompra[i].addEventListener("click", (e) => {
      e.preventDefault();
      // Según ID almaceno el producto en el array
      let idItem = btnCompra[i].getAttribute("data-id");
      let prod = filtroProd(productos, idItem);
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
      habBtnCompra();
      alertSeleccionProd();
      cantProdCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
};

// MUESTRO CARRITO
export const mostrarCarrito = () => {
  document.querySelector(".cart-btn").addEventListener("click", (e) => {
    e.preventDefault();
    // Muestro carro
    document.querySelector(".bloque-carrito").classList.add("transparenteBcg");
    document.querySelector(".carrito").classList.add("showCart");
    // CARGO LA INFORMACIÓN DEL CARRITO
    cargarCarrito();
    // HABILITO BOTÓN PAGO (solo si existen elementos en carrito)
    accionPago();
    // MODIFICO CANTIDAD DE PRODUCTOS
    cantElementos();
    // REMUEVO ELEMENTO DESDE CARRITO
    removeProd();
    // VACIO CARRITO
    vaciarCarrito();
    // OCULTO CARRITO
    ocultarCarrito();
  });
};

// MUESTRO LOS PRODUCTOS AGREGADOS
const cargarCarrito = () => {
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
export const cantElementos = () => {
  let contador = document.querySelectorAll(".contador");
  let saldo = parseInt(document.querySelector(".total-carrito").textContent);
  let totalProductos = document.querySelectorAll(".carrito-item");

  for (let i = 0; i < contador.length; i++) {
    contador[i].addEventListener("click", (e) => {
      let aumentoProd = filtroProd(carrito, e.target.dataset.up);
      let disminProd = filtroProd(carrito, e.target.dataset.down);
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
        // Acumulo el saldo aumentando a medida que agrego prod
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
          habBtnCompra();
          // Oculto btn finalizar compra
          accionPago();
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
export const removeProd = () => {
  let totalProductos = document.querySelectorAll(".carrito-item");
  let removerProd = document.querySelectorAll(".remove-item");

  for (let i = 0; i < removerProd.length; i++) {
    removerProd[i].addEventListener("click", (e) => {
      e.preventDefault();
      let idProd = removerProd[i].getAttribute("data-id");
      let indiceProd = carrito.indexOf(filtroProd(carrito, idProd));
      let saldoNuevo = 0;

      // Remuevo elemento del Array
      carrito.splice(indiceProd, 1);
      // Lo elimino desde el detalle de compra
      visualCarrito.removeChild(totalProductos[i]);
      // actualizo saldo
      for (let item of carrito) {
        saldoNuevo += item.precio;
      }
      document.querySelector(".total-carrito").innerHTML = saldoNuevo;
      // Habilito botones de productos
      habBtnCompra();
      // Oculto el btn finalizar compra en caso de que no existan prod
      accionPago();
      // Actualizo contador carrito
      cantProdCarrito();
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
    // lista de prod
    document.querySelector(".contenido-carrito").innerHTML = "";
    // precio final
    document.querySelector(".total-carrito").innerHTML = "0";
    // contador de prod
    document.querySelector(".cart-items").innerHTML = "0";
    // Habilito botones productos
    habBtnCompra();
    // Oculto btn finalizar compra
    accionPago();
    // Elimino todos los elementos del localStorage
    localStorage.clear();
  });
};
