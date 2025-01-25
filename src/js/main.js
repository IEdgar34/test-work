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
    advantagesSwiper(Swiper, Navigation, Pagination)
    menuOpen();
    yMapsInit();
    questionsOpen();
    formHandler()
   
});
