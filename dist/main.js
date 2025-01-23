/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/modules/menu.js
var menuOpen = function menuOpen() {
  var btn = document.querySelector(".header__open-menu");
  var menu = document.querySelector(".header__nav-wrapper");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    btn.classList.toggle("header__open-menu_active");
    menu.classList.toggle("header__nav-wrapper_active");
    document.body.classList.toggle("overflow");
  });
};
;// ./src/js/main.js


window.addEventListener("DOMContentLoaded", function () {
  menuOpen();
});
/******/ })()
;
//# sourceMappingURL=main.js.map