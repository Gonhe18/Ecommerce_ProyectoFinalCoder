// Importo las funciones necesarias
import { obtencionprod } from "./carrito.js";
import { procesoPago } from "./pago.js";
import { relojDigital } from "./extras.js";

// Array que almacena cada compra
export let carrito = [];

// Recupero el localStorage
let carritoAlmacen = JSON.parse(localStorage.getItem("carrito")) || [];

// PRODUCTOS / CARRITO
window.addEventListener("load", (e) => {
  e.preventDefault();
  // Si existe Storage lo recupero
  carrito = [...carritoAlmacen];
  // Genero las card en el index
  obtencionprod();
  // Gestión pagos
  procesoPago(carrito);
  // Muestro relojDigital
  relojDigital();
});
