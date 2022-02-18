// Obtengo los productos
import { productos } from "./productoPago.js";
// Importo las funciones necesarias
import { generoCard, addProdCarrito, mostrarCarrito } from "./carrito.js";

// Array que almacena cada compra
export let carrito = [];

// Variables
let tarjetas = document.querySelector(".card-prod");
let categoria = document.getElementById("category");

// Recupero el localStorage
let carritoAlmacen = JSON.parse(localStorage.getItem("carrito")) || [];

// Función principal
window.addEventListener("load", (e) => {
  e.preventDefault();
  // Si existe Storage lo recupero
  carrito = [...carritoAlmacen];
  // Actualizo contador carrito
  document.querySelector(".cart-items").innerHTML = carrito.length;
  // Genero las card en el index
  generoCard(productos);
  // Filtro de productos
  filtroProductos()
  // Agrego las card al objeto
  addProdCarrito();
  // Muestro el carrito y aplico sus respectivas funciones
  mostrarCarrito();
});

// Filtro por producto en index
export const filtroProductos = () => {
  categoria.addEventListener("click", (e) => {
    let filtro = productos.filter((item) => item.ref === e.target.value);
    if (filtro != "") {
      tarjetas.innerHTML = "";
      generoCard(filtro);
      addProdCarrito();
    } else {
      tarjetas.innerHTML = "";
      generoCard(productos);
      addProdCarrito();
    }
  });
}