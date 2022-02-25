let up = document.querySelector(".up");
window.onscroll = function () {
  up.classList.toggle("show", window.scrollY >= 500);
};
up.onclick = function () {
  window.scrollTo({ behavior: "smooth", top: 515 });
};