export const questionsOpen = () => {
    const items = document.querySelectorAll(".questions__list-item");

    items.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (e.target.matches(".questions__list-item") || e.target.matches(".list__item-open") || e.target.matches(".list__item-title")) {
                console.log(e.target);
                item.querySelector(".list__item-content").classList.toggle("list__item-content_active");
                item.querySelector(".list__item-open").classList.toggle("list__item-open_active");
            }
        });
    });
};
