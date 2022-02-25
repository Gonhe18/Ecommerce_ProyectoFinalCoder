// Importo las funciones necesarias
import { obtencionprod, mostrarCarrito } from "./carrito.js";
import { procesoPago } from "./pago.js";

// Array que almacena cada compra
export let carrito = [];

// Recupero el localStorage
let carritoAlmacen = JSON.parse(localStorage.getItem("carrito")) || [];

// PRODUCTOS / CARRITO
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  // Si existe Storage lo recupero
  carrito = [...carritoAlmacen];
  // Actualizo contador carrito
  document.querySelector(".cart-items").innerHTML = carrito.length;
  // Genero las card en el index
  obtencionprod();
  // Muestro el carrito y aplico sus respectivas funciones
  mostrarCarrito();
});

// PAGOS
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  // Proceso de pago
  procesoPago(carrito)
})
