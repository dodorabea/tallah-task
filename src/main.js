// Import Swiper styles first
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper JS
import Swiper from 'swiper';

// Add your custom CSS imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/assets/scss/main.scss';





// Function to load HTML into an element
function loadHTML(id, file, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // Execute callback after loading
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}

loadHTML("header", "/header.html", () => {
  initializeMenu();
});
loadHTML("taps", "/taps.html");
loadHTML("grid", "/grid.html", () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 16,
    breakpoints: {
      0: {
        slidesPerView: 1.25,
      },
      400: {
        slidesPerView: 1.5,
      },
      880: {
        slidesPerView: 2.75,
      },
      1025: {
        slidesPerView: 3,
      },
      1366: {
        slidesPerView: 3.25,
      },
      1440: {
        slidesPerView: 4.2,
      },
    },
  });
});
loadHTML("help", "/help.html");
loadHTML("footer", "/footer.html");
function initializeMenu() {
  const menu = document.querySelector(".menu");
  const menuInner = menu.querySelector(".menu-inner");
  const menuArrow = menu.querySelector(".menu-arrow");
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");

  function toggleMenu() {
     menu.classList.toggle("is-active");
     overlay.classList.toggle("is-active");
  }

  function showSubMenu(children) {
     let subMenu = children.querySelector(".submenu");
     if (!subMenu) return;
     subMenu.classList.add("is-active");
     subMenu.style.animation = "slideLeft 0.35s ease forwards";

     const menuTitle = children.querySelector("img").parentNode.childNodes[0].textContent;
     menu.querySelector(".menu-title").textContent = menuTitle;
     menu.querySelector(".menu-header").classList.add("is-active");
  }

  function hideSubMenu() {
     let subMenu = menu.querySelector(".submenu.is-active");
     if (!subMenu) return;
     subMenu.style.animation = "slideRight 0.35s ease forwards";
     setTimeout(() => {
        subMenu.classList.remove("is-active");
     }, 300);
     menu.querySelector(".menu-title").textContent = "";
     menu.querySelector(".menu-header").classList.remove("is-active");
  }

  function toggleSubMenu(e) {
     if (!menu.classList.contains("is-active")) return;
     if (e.target.closest(".menu-dropdown")) {
        const children = e.target.closest(".menu-dropdown");
        showSubMenu(children);
     }
  }

  window.addEventListener("resize", () => {
     if (window.innerWidth >= 992 && menu.classList.contains("is-active")) {
        toggleMenu();
     }
  });
  burger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  menuArrow.addEventListener("click", hideSubMenu);
  menuInner.addEventListener("click", toggleSubMenu);
}

