// Importo Objeto de productos
import { productos } from "./productoPago.js";

// Variables
let visualCarrito = document.querySelector(".contenido-carrito");

// Array que almacena cada compra
const carrito = [];

// Función para filtra productos por id
let filtroProd = (arr, prod) => {
  return arr.find((el) => el.id == prod);
};



window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  // Genero las card en el index
  generoCard();
  // Agrego las card al objeto
  addProdCarrito();
  // Muestro el carrito y aplico sus respectivas funciones
  mostrarCarrito();
});



// GENERO LAS CARD
const generoCard = () => {
  let tarjetas = document.querySelector(".card-prod");
  for (const prod of productos) {
    let cardProd = document.createElement("article");
    cardProd.classList.add("prod");
    cardProd.innerHTML = `
      <div class="img-contenedor">
        <img src=${prod.img} alt="Producto" class="prod-img"/>
        <button class="bag-btn" data-id=${prod.id}>
          <i class="fas fa-shopping-cart"></i>
        Agregar a carrito
        </button>
      </div>
      <h3>${prod.ref}</h3>
      <h4>${prod.marca} ${prod.modelo}</h4>
      <h4>$${prod.precio}</h4>
      `;
    tarjetas.appendChild(cardProd);
  }
};



// AGREGO PRODUCTOS AL OBJETO DEL CARRITO
const addProdCarrito = () => {
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
      btnCompra[i].disabled = true;
      btnCompra[i].innerHTML = "En el carrito";
      document.querySelector(".cart-items").innerHTML = carrito.length;
    });
  }
};



// MUESTRO CARRITO
const mostrarCarrito = () => {
  document.querySelector(".cart-btn").addEventListener("click", (e) => {
    e.preventDefault();
    // Muestro carro
    document.querySelector(".bloque-carrito").classList.add("transparenteBcg");
    document.querySelector(".carrito").classList.add("showCart");

    cargarCarrito();
    // MODIFICO CANTIDAD DE PRODUCTOS
    cantElementos(visualCarrito);

    // REMUEVO ELEMENTO DESDE CARRITO
    removeProd(visualCarrito);
    // OCULTO CARRITO
    ocultarCarrito();
    // VACIO CARRITO
    vaciarCarrito();
  });
};

const cargarCarrito = () => {
  let saldo = parseInt(document.querySelector(".total-carrito").textContent);
  // Cargo información de los objetos agregados
  carrito.forEach((item) => {
    let templateCarrito = document.createElement("div");
    templateCarrito.classList.add("carrito-item");
    templateCarrito.setAttribute('data-id',`${item.id}`)
    templateCarrito.innerHTML = `
  <img src=${item.img} alt="prod"/>
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
};





// ACUMULADOR DE PRODUCTOS
const cantElementos = (carro) => {
  let contador = document.querySelectorAll(".contador");
  let btnCompra = document.querySelectorAll(".bag-btn");
  let aumentar = document.querySelectorAll(".aumentar");
  let disminuir = document.querySelectorAll(".disminuir");
  let totalProductos = document.querySelectorAll(".carrito-item");
  let saldo = parseInt(document.querySelector(".total-carrito").textContent);
  let acum = parseInt(document.querySelector(".cart-items").textContent);

  contador.forEach((item) => {
    item.addEventListener("click", (e) => {
      let aumentoProd = filtroProd(carrito, e.target.dataset.up);
      let disminProd = filtroProd(carrito, e.target.dataset.down);
      let indiceProd;
      if (e.target.classList.contains("aumentar")) {
        indiceProd = carrito.indexOf(aumentoProd);
        // Almaceno la cantidad de prod en el objeto
        aumentoProd.cantidad = carrito[indiceProd].cantidad + 1;
        // Acumulo el saldo aumentando a medida que agrego prod
        saldo += aumentoProd.precio;
        // Almaceno la cantidad total de prod
        acum++;
        // Muestro la cantidad de elementos
        document.querySelectorAll(".cant-item")[indiceProd].innerHTML =
          aumentoProd.cantidad;
        // Actualizo saldo
        document.querySelector(".total-carrito").innerHTML = saldo;
        // Actualizo contador carrito
        document.querySelector(".cart-items").innerHTML = acum;
      }

      if (e.target.classList.contains("disminuir")) {
        indiceProd = carrito.indexOf(disminProd);
        if (disminProd.cantidad > 1) {
          // Almaceno la cantidad de prod en el objeto
          disminProd.cantidad = carrito[indiceProd].cantidad - 1;
          // Acumulo el saldo aumentando a medida que agrego prod
          saldo -= disminProd.precio;
          // Almaceno la cantidad total de prod
          acum--;
          // Muestro la cantidad de elementos
          document.querySelectorAll(".cant-item")[indiceProd].innerHTML =
            disminProd.cantidad;
          // Actualizo saldo
          document.querySelector(".total-carrito").innerHTML = saldo;
          // Actualizo contador carrito
          document.querySelector(".cart-items").innerHTML = acum;
        } else {
          // Acumulo el saldo aumentando a medida que agrego prod
          saldo -= disminProd.precio;
          // Almaceno la cantidad total de prod
          acum--;
          // Remuevo elemento del Array
          carrito.splice(indiceProd, 1);

          // Lo elimino desde el detalle de compra

          // Actualizo saldo
          document.querySelector(".total-carrito").innerHTML = saldo;
          // Actualizo contador carrito
          document.querySelector(".cart-items").innerHTML = acum;

          // Actualizo los botones en el index
          // btnCompra[indiceProd].disabled = false;
          // btnCompra[indiceProd].innerHTML = `
          //   <i class="fas fa-shopping-cart"></i>
          //   Agregar a carrito
          // `;
          // console.log(indiceProd)
          // console.log(btnCompra)
        }
      }
    });
  });
};



// REMUEVO ELEMENTO DESDE CARRITO
const removeProd = (carro) => {
  let totalProductos = document.querySelectorAll(".carrito-item");
  let removerProd = document.querySelectorAll(".remove-item");
  let btnCompra = document.querySelectorAll(".bag-btn");

  for (let i = 0; i < removerProd.length; i++) {
    removerProd[i].addEventListener("click", (e) => {
      e.preventDefault();

      let idProd = removerProd[i].getAttribute("data-id");
      let indiceProd = carrito.indexOf(filtroProd(carrito, idProd));
      let saldoNuevo = 0;
      // Remuevo elemento del Array
      carrito.splice(indiceProd, 1);
      // Lo elimino desde el detalle de compra
      carro.removeChild(totalProductos[i]);
      // actualizo saldo
      for (let item of carrito) {
        saldoNuevo += item.precio;
      }
      document.querySelector(".total-carrito").innerHTML = saldoNuevo;
      // Actualizo contador carrito
      document.querySelector(".cart-items").innerHTML = carrito.length;
      // Habilito botones de productos
      btnCompra[i].disabled = false;
      btnCompra[i].innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        Agregar a carrito
      `;
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
  let btnCompra = document.querySelectorAll(".bag-btn");
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
    for (let i = 0; i < btnCompra.length; i++) {
      btnCompra[i].disabled = false;
      btnCompra[i].innerHTML = `
        <i class="fas fa-shopping-cart"></i>
        Agregar a carrito
      `;
    }
  });
};
