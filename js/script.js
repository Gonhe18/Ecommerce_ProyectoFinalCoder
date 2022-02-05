// Importo Objetos, clases y métodos necesarios.
import { productos, medioDePago } from "./productoPago.js";
import { datosCompra } from "./datosCompra.js";
import { CompraCte } from "./detalleCompra.js";

// Array que almacena cada compra
const comprasTotales = [];

// Muestro carrito
document.querySelector(".cart-btn").addEventListener("click", (e) => {
  e.preventDefault();

  document
    .querySelector(".bloque-carrito")
    .classList.add("transparenteBcg");
  document.querySelector(".carrito").classList.add("showCart");
});

// Oculto carrito
document.querySelector(".fin-carrito").addEventListener("click", (e) => {
  e.preventDefault();

  document
    .querySelector(".bloque-carrito")
    .classList.remove("transparenteBcg");
  document.querySelector(".carrito").classList.remove("showCart");
});

// Genero las card de los productos en base a la cantidad que existan
let tarjetas = document.querySelector(".card-prod");
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

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
});






// Para iniciar el programa consulto si desea hacer una compra
let hacerCompra = confirm("Desea hacer una compra?");

// Si el valor es true inicia el ciclo, ejecutando la función principal para la compra
while (hacerCompra == true) {
  // Se toman los datos que retorna la función.
  let [prodCompra, canalPago] = datosCompra();
  // Almaceno el precio del producto con descuento (lo hago acá para poder usar esa variable, ya que sino solo puedo manipular el precio real).
  let precioFinal =
    prodCompra.precio - (prodCompra.precio * canalPago.descuento) / 100;

  // Se crea objeto
  let compra1 = new CompraCte(
    prodCompra.ref,
    prodCompra.img,
    prodCompra.marca,
    prodCompra.modelo,
    prodCompra.precio,
    precioFinal,
    canalPago.medioPago,
    canalPago.descuento
  );

  // Se agrega al Array
  comprasTotales.push(compra1);

  // Se ejecuta el método que posee la clase para mostrar el detalle de la compra.
  compra1.descripcionCompra();

  // Por último se consulta si desea hacer nueva comprar, sino se cierra el ciclo.
  hacerCompra = confirm("Desea hacer una nueva compra?");
}

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
