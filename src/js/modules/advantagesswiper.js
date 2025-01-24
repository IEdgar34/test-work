export const advantagesSwiper = (Swiper, Navigation, Pagination) => {
    let advantageSwiper;
    function init() {
        if (window.innerWidth <= 430) {
            if (!advantageSwiper) {
                advantageSwiper = new Swiper(".advantages-swiper", {
                    // Optional parameters

                    loop: true,
                    spaceBetween: 20,
                    slidesPerView: "auto",

                    // If we need pagination
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '">' + "" + "</span>";
                        },
                    },
                    modules: [Navigation, Pagination],
                    // Navigation arrows
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },

                    // And if we need scrollbar
                });
            }
        } else {
            if (advantageSwiper) {
                advantageSwiper.destroy(true, true);
                advantageSwiper = null;
            }
        }
    }
    init();
    window.addEventListener("resize", init);
};
