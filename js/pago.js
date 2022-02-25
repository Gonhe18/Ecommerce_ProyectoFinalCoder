// Importación
import { filtroProd } from "./carrito.js";

// Variables
const cantProd = document.querySelector(".cantProd");
const subTotal = document.querySelector(".subTotal");
const saldoDesc = document.querySelector(".descuento");
const total = document.querySelector(".total");
const tipoPago = document.querySelectorAll("input");
const mjsDescuento = document.querySelector(".mjsDescuento");
const btnFinCompra = document.querySelector(".btn-finCompra");
const btnPago = document.querySelector(".btnPago");

// Importo carrito desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito"));

export const procesoPago = (carrito) => {
  detalleCompra(carrito);
  modifElement();
  eliminarProd();
  mediosDePago();
  finCompra();
};

// OBTENGO MEDIOS DE PAGO DESDE API
const mediosDePago = async () => {
  const resp = await fetch("./api/medioPago.json");
  const pago = await resp.json();
  finalizarPago(pago);
};

// MUESTRO PRODUCTOS EN EL CARRITO
const detalleCompra = (products) => {
  let detalle = document.querySelector(".detalleCompra");
  products.forEach((item) => {
    let bloqueProd = document.createElement("div");
    bloqueProd.setAttribute("class", "conjuntoProd");
    bloqueProd.innerHTML = `
      <div class="img-producto">
        <img src="${item.img}" alt="Imagen ${item.categoria}" data-id='${item.id}'>
      </div>
      <div class="cant-producto">
        <div class= modifProd>
          <i class="fas fa-chevron-up aumentar" data-up=${item.id} ></i>
          <p class="cant-item">${item.cantidad}</p>
          <i class="fas fa-chevron-down disminuir" data-down=${item.id}></i>
        </div>
        <span class="remove-item" data-id=${item.id}>Remove<span>
      </div>
      <h4>${item.categoria}</h4>
      <h4>${item.marca}</h4>
      <h4>${item.modelo}</h4>
      <h4>$${item.precio}</h4>
    `;
    detalle.appendChild(bloqueProd);
    saldoCompra();
  });
};

// DATOS SOBRE CANTIDAD Y SALDO A ABONAR
const saldoCompra = (desc) => {
  let acumCant = 0;
  let saldoProd = 0;
  let acumDesc = 0;
  carrito.forEach((prod) => {
    let indiceProd = carrito.indexOf(filtroProd(carrito, prod.id));
    if (carrito.length > 0) {
      // Cantidad de productos
      cantProd.innerHTML = acumCant += carrito[indiceProd].cantidad;
      // Subtotal, total de productos por valor de cada uno
      subTotal.innerHTML = `$${(saldoProd +=
        carrito[indiceProd].precio * carrito[indiceProd].cantidad).toFixed(2)}`;
      // Descuento, si se selecciona medio de pago se muestra el descuento que tendría
      desc != undefined
        ? (saldoDesc.innerHTML = `$${(acumDesc +=
            ((carrito[indiceProd].precio * desc) / 100) *
            carrito[indiceProd].cantidad).toFixed(2)}`)
        : (saldoDesc.innerHTML = 0);
      // Saldo final, subtotal menos descuento
      saldoDesc != 0
        ? (total.innerHTML = `$${(saldoProd - acumDesc).toFixed(2)}`)
        : (total.innerHTML = subTotal.textContent);
    }
  });
};

// MENSAJE DE DESCUENTO
const msjDesc = (medioDePago) => {
  tipoPago.forEach((item) => {
    item.addEventListener("click", (e) => {
      document.querySelector(".btn-finalizar").classList.remove("oculto");
      if (e.target.id == medioDePago[0].ref) {
        mjsDescuento.innerHTML = `<p>Por abonar en ${medioDePago[0].medioPago} tienes un descuento del ${medioDePago[0].descuento}%</p>`;
        saldoCompra(medioDePago[0].descuento);
      }
      if (e.target.id == medioDePago[1].ref) {
        mjsDescuento.innerHTML = `<p>Por abonar con ${medioDePago[1].medioPago} tienes un descuento del ${medioDePago[1].descuento}%</p>`;
        saldoCompra(medioDePago[1].descuento);
      }
      if (e.target.id == medioDePago[2].ref) {
        mjsDescuento.innerHTML = `<p>Por abonar con ${medioDePago[2].medioPago} tienes un descuento del ${medioDePago[2].descuento}%</p>`;
        saldoCompra(medioDePago[2].descuento);
      }
    });
  });
};

// AUMENTO/DISMINUYO CANT DE PRODUCTOS
const modifElement = () => {
  let modifProd = document.querySelectorAll(".conjuntoProd");
  for (let i = 0; i < modifProd.length; i++) {
    modifProd[i].addEventListener("click", (e) => {
      // Obtengo los productos por ID
      let prdAum = filtroProd(carrito, e.target.dataset.up);
      let prdDism = filtroProd(carrito, e.target.dataset.down);
      let indProd;

      if (e.target.classList.contains("aumentar")) {
        indProd = carrito.indexOf(prdAum);
        prdAum.cantidad = carrito[indProd].cantidad + 1;
        document.querySelectorAll(".cant-item")[indProd].innerHTML =
          prdAum.cantidad;
      }
      if (e.target.classList.contains("disminuir")) {
        indProd = carrito.indexOf(prdDism);
        if (prdDism.cantidad > 1) {
          prdDism.cantidad = carrito[indProd].cantidad - 1;
          document.querySelectorAll(".cant-item")[indProd].innerHTML =
            prdDism.cantidad;
        } else {
          carrito.splice(indProd, 1);
          document.querySelector(".detalleCompra").removeChild(modifProd[i]);
          document.querySelector(".medioPago").classList.add("invisible");
          carritoVacio();
        }
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      saldoCompra();
    });
  }
};

// REMUEVO PRODUCTOS
const eliminarProd = () => {
  const remItem = document.querySelectorAll(".remove-item");
  remItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      let indiceProd = carrito.indexOf(
        filtroProd(carrito, e.target.dataset.id)
      );
      // Remuevo elemento del Array
      carrito.splice(indiceProd, 1);
      // Lo elimino desde el detalle de compra
      document
        .querySelector(".detalleCompra")
        .removeChild(document.querySelectorAll(".conjuntoProd")[indiceProd]);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      document.querySelector(".medioPago").classList.add("invisible");
      saldoCompra();
      carritoVacio();
    });
  });
};

// HABILITA MEDIOS DE PAGOS
const finCompra = () => {
  btnFinCompra.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".medioPago").classList.remove("invisible");
  });
};

// FINALIZO GESTIÓN, CONFIRMACIÓN DE PAGO
const finalizarPago = (mPago) => {
  // Muestro msj de descuento y habilito btn para pago
  msjDesc(mPago);

  btnPago.addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
      html: '<img src="./img/ico/icono-pago.png" style= "width: 120px"/>',
      title: "¿Desea finalizar la compra?",
      text: "Confirme el pago o siga comprando!!",
      showCancelButton: true,
      confirmButtonColor: "#357C3C",
      confirmButtonText: "Pagar",
      cancelButtonColor: "#B33030",
      cancelButtonText: "Seguir comprando",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          html: '<img src="./img/ico/icon-pago-exitoso.png" style= "width: 120px"/>',
          title: "Pago realizado con éxito!!",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          window.location = "./index.html";
        });
        // Elimino todos los elementos del localStorage
        localStorage.clear();
      }
    });
  });
};

// SI EL CARRITO ESTA VACIO VUELVE AL INDEX AUTOMÁTICAMENTE
const carritoVacio = () => {
  if (carrito.length === 0) {
    Swal.fire({
      html: '<img src="./img/ico/carrito-vacio.png" style= "width: 175px"/>',
      title: "Carrito vacío",
      timerProgressBar: true,
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(function () {
      window.location = "./index.html";
    });
  }
};
