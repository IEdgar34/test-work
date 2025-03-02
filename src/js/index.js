import Swiper from "swiper";
import "swiper/css";
import { stagesSwiper } from "./modules/stagesswiper";
import { gallerySwiper } from "./modules/galleryswiper";
import { advantagesSwiper } from "./modules/advantagesswiper";
import { Navigation, Pagination } from "swiper/modules";
import { yMapsInit } from "./modules/ymapsinit";

window.addEventListener("DOMContentLoaded", () => {
    stagesSwiper(Swiper, Navigation, Pagination);
    gallerySwiper(Swiper, Navigation, Pagination);
    advantagesSwiper(Swiper, Navigation, Pagination);
    /*  yMapsInit(); */
});
