// Importo Objetos, clases y métodos necesarios.
import { productos, medioDePago } from "./productoPago.js";
import { datosCompra } from "./datosCompra.js";
import { CompraCte } from "./detalleCompra.js";

// Array que almacena cada compra
const comprasTotales = [];

// MUESTRO CARRITO
document.querySelector(".cart-btn").addEventListener("click", (e) => {
  e.preventDefault();
  // Muestro carro
  document.querySelector(".bloque-carrito").classList.add("transparenteBcg");
  document.querySelector(".carrito").classList.add("showCart");

  // Cargo información de los objetos agregados
  let carrito = document.querySelector(".contenido-carrito");
  let saldo = parseInt(document.querySelector(".total-carrito").textContent);
  for (let item of comprasTotales) {
    let templateCarrito = document.createElement("div");
    templateCarrito.classList.add("carrito-item");
    templateCarrito.innerHTML = `
    <img src=${item.img} alt="prod"/>
    <div>
    <h4>${item.ref} - ${item.marca} ${item.modelo}</h4>
    <h5>$${item.precio}</h5>
    <span class="remove-item" data-id=${item.id}>Remove<span>
    </div>
    <div>
    <i class="fas fa-chevron-up"></i>
    <p class="cant-item">1</p>
    <i class="fas fa-chevron-down"></i>
    </div>
    `;
    carrito.appendChild(templateCarrito);
    saldo += item.precio;
  }
  document.querySelector(".total-carrito").innerHTML = saldo;

  let totalProductos = document.querySelectorAll(".carrito-item");
  let removerProd = document.querySelectorAll(".remove-item");

  for (let i = 0; i < removerProd.length; i++) {
    console.log(totalProductos[i]);
    removerProd[i].addEventListener("click", (e) => {
      e.preventDefault();

      // Remuevo elemento del Array
      comprasTotales.splice(removerProd[i], 1);
      // Lo elimino desde el detalle de compra
      // totalProductos[i].innerHTML = "";
    });
  }
});

// OCULTAR CARRITO
document.querySelector(".fin-carrito").addEventListener("click", (e) => {
  e.preventDefault();
  // Oculto carro
  document.querySelector(".bloque-carrito").classList.remove("transparenteBcg");
  document.querySelector(".carrito").classList.remove("showCart");
  // Elimino el contenido del carro, para que se genere en base al objeto de prod
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

window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

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
      let filtroProd = (arr, prod) => {
        return arr.find((el) => el.id == prod);
      };
      comprasTotales.push(filtroProd(productos, item));
      document.querySelector(".cart-items").innerHTML = comprasTotales.length;
    });
  }
});

// Para iniciar el programa consulto si desea hacer una compra
// let hacerCompra = confirm("Desea hacer una compra?");

// Si el valor es true inicia el ciclo, ejecutando la función principal para la compra
// while (hacerCompra == true) {
// Se toman los datos que retorna la función.
// let [prodCompra, canalPago] = datosCompra();
// Almaceno el precio del producto con descuento (lo hago acá para poder usar esa variable, ya que sino solo puedo manipular el precio real).
// let precioFinal =
//   prodCompra.precio - (prodCompra.precio * canalPago.descuento) / 100;

// Se crea objeto
// let compra1 = new CompraCte(
//   prodCompra.ref,
//   prodCompra.img,
//   prodCompra.marca,
//   prodCompra.modelo,
//   prodCompra.precio,
//   precioFinal,
//   canalPago.medioPago,
//   canalPago.descuento
// );

// Se agrega al Array
// comprasTotales.push(compra1);

// Se ejecuta el método que posee la clase para mostrar el detalle de la compra.
// compra1.descripcionCompra();

// Por último se consulta si desea hacer nueva comprar, sino se cierra el ciclo.
// hacerCompra = confirm("Desea hacer una nueva compra?");
// }

// Al finalizar el ciclo, si existió una compra muestro el detalle de la compra, la cantidad de productos comprados y precio final a abonar.
// if (comprasTotales.length > 0) {
//   let detalle = document.querySelector(".table");

//   // Ciclo en donde se carga el detalle de cada compra que se realiza
//   for (let i = 0; i < comprasTotales.length; i++) {
//     let cant = 1;
//     let tablaDetalle = document.createElement("tbody");
//     tablaDetalle.innerHTML = `
//       <tr>
//         <th scope="row">${cant + i}</th>
//         <td><img src="${
//           comprasTotales[i].imagen
//         }" class='img-detalle' alt="Imagen Ejemplo"></td>
//         <td>${comprasTotales[i].categoria}</td>
//         <td>${comprasTotales[i].marca}</td>
//         <td>${comprasTotales[i].modelo}</td>
//         <td>$${comprasTotales[i].precioReal}</td>
//         <td>$${comprasTotales[i].precioDesc}</td>
//       </tr>
//   `;
//     detalle.appendChild(tablaDetalle);
//   }
//   // Acumulador del saldo total a abonar
//   let sumaTotal = comprasTotales.reduce(
//     (acc, prod) => acc + prod.precioDesc,
//     0
//   );

//   // Muestro detalle final, total de productos comprados y precio a abonar
//   let detalleFinal = document.createElement("tfoot");
//   detalleFinal.innerHTML = `
//       <tr>
//         <th scope="row">#</th>
//         <td colspan="2">Total Productos</td>
//         <td>${comprasTotales.length}</td>
//         <td colspan="2">Total a abonar</td>
//         <td>$${sumaTotal.toFixed(2)}</td>
//       </tr>
//   `;
//   detalle.appendChild(detalleFinal);
// } else {
//   // Si no se realizan compras se indica mediante mensaje
//   let msj = document.createElement("p");
//   msj.innerHTML = "No se ha realizado ninguna compra";
//   detalle.appendChild(msj);
// }

// ------------------------------------------------
