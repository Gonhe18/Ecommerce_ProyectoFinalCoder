// Clase referenciando los datos de la compra
class CompraCte {
  constructor(
    categoria,
    imagen,
    marca,
    modelo,
    precioReal,
    precioDesc,
    medioPago,
    descuento
  ) {
    this.categoria = categoria;
    this.imagen = imagen;
    this.marca = marca;
    this.modelo = modelo;
    this.precioReal = parseFloat(precioReal);
    this.precioDesc = parseFloat(precioDesc);
    this.medioPago = medioPago;
    this.descuento = descuento;
  }

  descripcionCompra() {
    alert(
      `Compraste: ${this.categoria} - ${this.marca} ${this.modelo} \nValor: $${
        this.precioReal
      } \nPor abonar con '${this.medioPago}' tenes un descuento del ${
        this.descuento
      }% \nPrecio final: $${this.precioDesc.toFixed(2)}`
    );
  }
}

export {
  CompraCte
}
