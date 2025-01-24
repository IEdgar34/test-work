export const stagesSwiper = (Swiper,Navigation,Pagination) => {
    const swiper = new Swiper(".stages-wiper", {
        // Optional parameters

        loop: true,
        spaceBetween: 20,
        slidesPerView: "auto",

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + ("") + "</span>";
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
};
