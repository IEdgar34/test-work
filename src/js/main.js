import "../sass/style.scss";
import { menuOpen } from "./modules/menu";
import { questionsOpen } from "./modules/questions";
import { formHandler } from "./modules/formhandler";
window.addEventListener("DOMContentLoaded", () => {
    menuOpen();
    questionsOpen();
    formHandler();
});
