import { productos, medioDePago} from './productoPago.js'

const datosCompra = () => {
  // Función que me permite filtrar por el producto elegido y obtener sus datos
  let filtro = (arr, prod) => {
    return arr.find((el) => el.ref == prod);
  };

  //            PRODUCTO
  // Consulto el producto que se desea comprar
  let producto = prompt(
    "Ingrese el producto que desea comprar: \n-Teclado \n-Mouse \n-Auriculares \n-Monitor \n-Notebook"
  ).toUpperCase();

  // Ejecuto filtro y almaceno objeto completo
  let prodCompra = filtro(productos, producto);

  // Creo ciclo para validar que se ingrese un producto correcto
  while (prodCompra == undefined) {
    producto = prompt(
      "Producto no disponible, ingrese el producto que desea comprar: \n-Teclado \n-Mouse \n-Auriculares \n-Monitor \n-Notebook"
    ).toUpperCase();
    prodCompra = filtro(productos, producto);
  }

  //            PAGO
  // Solicito la referencia del tipo de pago
  let tipoPago = prompt(
    "Eliga medio de pago: \nEF: Efectivo \nDEB: Débito \nTC: Crédito"
  ).toUpperCase();

  // Ejecuto nuevamente el filtro pero para obtener el tipo de pago y descuento correspondiente
  let canalPago = filtro(medioDePago, tipoPago);

  // Validación de que se ingrese dato correcto
  while (canalPago == undefined) {
    tipoPago = prompt(
      "Medio de pago inexistente. Ingrese: \nEF: para efectivo \nDEB: para débito \nTC: para crédito"
    ).toUpperCase();
    canalPago = filtro(medioDePago, tipoPago);
  }

  // Retorno el objeto completo del producto y del medio de pago.
  return [prodCompra, canalPago];
};

export {
  datosCompra
}