export const menuOpen = () => {
    const btn = document.querySelector(".header__open-menu");
    const menu = document.querySelector(".header__nav-wrapper");

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        btn.classList.toggle("header__open-menu_active");
        menu.classList.toggle("header__nav-wrapper_active");
        document.body.classList.toggle("overflow");
    });
};
