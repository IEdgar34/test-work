import "../sass/style.scss";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { stagesSwiper } from "./modules/stagesswiper";
import { gallerySwiper } from "./modules/galleryswiper";
import { menuOpen } from "./modules/menu";
import { yMapsInit } from "./modules/ymapsinit";
import { questionsOpen } from "./modules/questions";
import { advantagesSwiper } from "./modules/advantagesswiper";
import { formHandler } from "./modules/formhandler";
window.addEventListener("DOMContentLoaded", () => {
    stagesSwiper(Swiper, Navigation, Pagination);
    gallerySwiper(Swiper, Navigation, Pagination);
    advantagesSwiper(Swiper, Navigation, Pagination);
    menuOpen();
    /*  yMapsInit(); */
    questionsOpen();
    formHandler();

    //

    const elemImg = document.querySelector(".forms__content-images img");
    const elemImgClening = document.querySelector(".cleaning__img-wrap img");
    function changeImage() {
        window.innerWidth <= 600 ? (elemImg.src = "images/forms-mod-min.webp") : (elemImg.src = "images/form-images-min.webp");
        window.innerWidth <= 430 ? (elemImgClening.src = "images/cleaning-mob-min.webp") : (elemImgClening.src = "images/cleaning-min.webp");
    }

    window.addEventListener("resize", changeImage);
});
