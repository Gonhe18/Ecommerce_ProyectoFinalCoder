const productos = [
    {
    id: 1,
    ref: "Teclado",
    marca: "HyperX",
    modelo: "Alloy Origins Core RGB",
    precio: 8190,
    img: "./img/Teclado.jpg",
  },
  {
    id: 2,
    ref: "Mouse",
    marca: "HyperX",
    modelo: "PulseFire Raid",
    precio: 2999,
    img: "./img/Mouse.jpg",
  },
  {
    id: 3,
    ref: "Auriculares",
    marca: "Corsair",
    modelo: "Virtuoso RGB",
    precio: 26290,
    img: "./img/Auriculares.jpg",
  },
  {
    id: 4,
    ref: "Monitor",
    marca: "Samsung",
    modelo: "G50 Curvo 144Hz",
    precio: 39190,
    img: "./img/Monitores.jpg",
  },
  {
    id: 5,
    ref: "Notebook",
    marca: "Asus",
    modelo: "X515EA",
    precio: 99990,
    img: "./img/Notebook.jpg",
  },
];

// Array de objetos con los medios de pagos y respectivos descuentos.
const medioDePago = [
  {
    ref: "EF",
    medioPago: "Efectivo",
    descuento: 25,
  },
  {
    ref: "TC",
    medioPago: "Tarjeta de Crédito",
    descuento: 15,
  },
  {
    ref: "DEB",
    medioPago: "Tarjeta de Débito",
    descuento: 10,
  },
];

export {
  productos,
  medioDePago
}