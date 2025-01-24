export const questionsOpen = () => {
    const btns = document.querySelectorAll(".list__item-open")
    btns.forEach(item => {
        item.addEventListener("click",(e) => {

            item.classList.toggle("list__item-open_active")
            item.closest(".questions__list-item").classList.toggle("questions__list-item_active")
        })
    })


}