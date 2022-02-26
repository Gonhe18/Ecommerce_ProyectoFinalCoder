// SCROLLUP
let up = document.querySelector(".up");
window.onscroll = function () {
  up.classList.toggle("show", window.scrollY >= 500);
};
up.onclick = function () {
  window.scrollTo({ behavior: "smooth", top: 505 });
};

// RELOJ
let reloj = document.querySelector('.reloj')
let fecha = document.querySelector('.fecha')

const semana = ['Domingo', 'Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const relojDigital = () => {
  setInterval(() => {
     let d = new Date()
     let hora = d.getHours() <= 9 ? "0" + d.getHours() : d.getHours();
     let minutos = d.getMinutes() <= 9 ? "0" + d.getMinutes() : d.getMinutes();
     let segundos = d.getSeconds() <= 9 ? "0" + d.getSeconds() : d.getSeconds();
     let dia = d.getDay()
     let mes = d.getMonth()
     let anio = d.getFullYear()

     reloj.innerHTML = `${hora}:${minutos}:${segundos}`
     fecha.innerHTML = `${semana[dia]} ${dia}, ${meses[mes]} ${anio}`
  }, 1000)
}

