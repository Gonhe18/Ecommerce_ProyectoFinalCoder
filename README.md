# E-COMMERCE JS VANILLA  - CODERHOUSE

Sitio web creado como parte del proyecto final del curso de Desarrollo Frontend React, en esta primera parte el sitio esta armado solo con JavaScript Vanilla.

 Visita el sitio [Ecommerce](https://ecommerce-js-gonzabazzani.netlify.app/index.html "Ecommerce JS vanilla")
 
El mismo esta dividido en 2 secciones:

### **HOME** 
- Aquí podemos encontrar la totalidad de productos, extraídos de una API, en donde podemos filtrar por categoría. Cada card de producto nos muestra un breve detalle del mismo y nos habilita un botón para que podamos incluirlo al carrito, en caso de agregarlo, dicho botón se modifica indicando que el producto ya se encuentra en nuestro carrito.
- En la parte superior derecha de la pantalla tenemos el icono para acceder al carrito, el cual nos muestra el detalla de los productos seleccionados, dando la posibilidad de modificar la cantidad de ítems, eliminar un producto puntual o vaciar por completo el carrito. 
- Por último nos figura el saldo total, en base a precio y cantidad de los productos seleccionados. y además del botón para vaciar el carrito nos figura otra para finalizar la compra, derivandonos a la 2da sección.

### **PAGOS**
- En esta sección encontramos algunas funciones similares a la del carrito, ya que nos muestra el detalle del producto, tenemos la posibilidad de modificar la cantidad de ítems o eliminarlos del carrito, en caso de que el carrito quede vacio nos aparecerá una alerta indicandolo y redireccionandonos al home. 
- En la parte inferior de los productos seleccionados, tenemos la opción de volver al home y seguir comprando o de finalizar la compra. Si elegimos esta última opción nos habilita un menú con la 3 opciones de pago, cada una incluye un descuento determinado. Luego tenemos el detalle del saldo, en donde nos indica la cantidad total de productos seleccionados, el subtotal y al elegir un tipo de pago nos figurará el saldo que se descontará en base al porcentaje de descuento y por último el saldo final a abonar.
- Por último, una vez seleccionado el medio de pago, nos aparecerá el botón para pagar. Al presionarlo aparecerá una alerta que nos consulta si queremos pagar o seguir comprando, si elegimos esta 2da opción se cierra la alerta y nos permite seguir navegando por el sitio, en caso de pagar se actualizará la alerta indicando que el pago fue exitoso y nos redireccionará al home.

### DEPENDENCIAS:
-  **SASS**`v7.0.1` : Preprocesador CSS que permite incluir características que son propias de los lenguajes de programación, como como pueden ser variables, funciones, etc.

-  **SWEETALERT2**`v11.4.8` : Permite agregar alertas personalizadas.

- **TOASTIFY**`v8.2.0` : Permite agregar alertas personalizadas.

