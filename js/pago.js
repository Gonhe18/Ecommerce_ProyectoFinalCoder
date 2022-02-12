// -------------------------------------------------------------------------
// Importo carrito desde el localStorage
let carrito = JSON.parse(localStorage.getItem("carrito"));

// Función para filtra productos por id
// let filtroProd = (arr, prod) => {
//   return arr.find((el) => el.id == prod);
// };

const detalleCompra = (products) => {
  let detalle = document.querySelector(".detalleCompra");

  products.forEach((producto) => {
    detalle.innerHTML =
      detalle.innerHTML +
      `
       <div class="producto eliminar"><img src="${producto.img}" alt="Imagen ${producto.categoria}" data-id='${producto.id}'></div>
       <div class="producto">${producto.cantidad}</div>
       <div class="producto">${producto.categoria}</div>
       <div class="producto">${producto.marca}</div>
       <div class="producto">${producto.modelo}</div>
       <div class="producto">$${producto.precio}</div>
    `;
  });
};

detalleCompra(carrito);


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
