// Importo Objeto de productos
import { productos } from "./productoPago.js";

// Array que almacena cada compra
const comprasTotales = [];

// Función para filtra productos por id
let filtroProd = (arr, prod) => {
  return arr.find((el) => el.id == prod);
};

// GENERO LAS CARD
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

// AGREGO PRODUCTOS AL OBJETO DEL CARRITO
let btnCompra = document.querySelectorAll(".bag-btn");
// Obtengo producto por ID
for (let i = 0; i < btnCompra.length; i++) {
  btnCompra[i].addEventListener("click", (e) => {
    e.preventDefault();
    // Según ID almaceno el producto en el array
    let item = btnCompra[i].getAttribute("data-id");
    comprasTotales.push(filtroProd(productos, item));
    document.querySelector(".cart-items").innerHTML = comprasTotales.length;
  });
}

// MUESTRO CARRITO
document.querySelector(".cart-btn").addEventListener("click", (e) => {
  e.preventDefault();
  // Muestro carro
  document.querySelector(".bloque-carrito").classList.add("transparenteBcg");
  document.querySelector(".carrito").classList.add("showCart");
  // Cargo información de los objetos agregados
  let carrito = document.querySelector(".contenido-carrito");
  let saldo = parseInt(document.querySelector(".total-carrito").textContent);

  for (let itemProd of comprasTotales) {
    let templateCarrito = document.createElement("div");
    templateCarrito.classList.add("carrito-item");
    templateCarrito.innerHTML = `
    <img src=${itemProd.img} alt="prod"/>
    <div>
    <h4>${itemProd.ref} - ${itemProd.marca} ${itemProd.modelo}</h4>
    <h5>$${itemProd.precio}</h5>
    <span class="remove-item" data-id=${itemProd.id}>Remove<span>
    </div>
    <div>
    <i class="fas fa-chevron-up"></i>
    <p class="cant-item">"1"</p>
    <i class="fas fa-chevron-down"></i>
    </div>
    `;
    carrito.appendChild(templateCarrito);
    saldo += itemProd.precio;
  }
  // Muestro saldo total
  document.querySelector(".total-carrito").innerHTML = saldo;

  // REMUEVO ELEMENTO DESDE CARRITO
  let totalProductos = document.querySelectorAll(".carrito-item");
  let removerProd = document.querySelectorAll(".remove-item");

  for (let i = 0; i < removerProd.length; i++) {
    removerProd[i].addEventListener("click", (e) => {
      e.preventDefault();

      let idProd = removerProd[i].getAttribute("data-id");
      let indiceProd = comprasTotales.indexOf(
        filtroProd(comprasTotales, idProd)
      );
      let saldoNuevo = 0;
      // Remuevo elemento del Array
      comprasTotales.splice(indiceProd, 1);
      // Lo elimino desde el detalle de compra
      carrito.removeChild(totalProductos[i]);
      // actualizo saldo
      for (let item of comprasTotales) {
        saldoNuevo += item.precio;
      }
      document.querySelector(".total-carrito").innerHTML = saldoNuevo;
      // Actualizo contador carrito
      document.querySelector(".cart-items").innerHTML = comprasTotales.length;
    });
  }
});

// OCULTAR CARRITO
document.querySelector(".fin-carrito").addEventListener("click", (e) => {
  e.preventDefault();
  // Oculto carro
  document.querySelector(".bloque-carrito").classList.remove("transparenteBcg");
  document.querySelector(".carrito").classList.remove("showCart");
  // Elimino el contenido del carro, para que se genere como nuevo al mostrarlo
  document.querySelector(".contenido-carrito").innerHTML = "";
  document.querySelector(".total-carrito").innerHTML = "0";
});

// VACIAR CARRITO
document.querySelector(".limpiar-carro").addEventListener("click", (e) => {
  e.preventDefault();
  // Elimino el contenido del carro
  comprasTotales.splice((0)[comprasTotales.length]);
  // lista de prod
  document.querySelector(".contenido-carrito").innerHTML = "";
  // precio final
  document.querySelector(".total-carrito").innerHTML = "0";
  // contador de prod
  document.querySelector(".cart-items").innerHTML = "0";
});
