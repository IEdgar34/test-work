import IMask from "imask";
export const formHandler = () => {
    const inputs = document.querySelectorAll(".form__input ,.validate");
    const form = document.getElementById("contactForm");
    const formBtn = document.querySelector(".forms__btn");
    const phone = document.querySelector("input[name='phone']");
    let valid = [];

    const validationRules = {
        name(value, item) {
            if (value != "") {
                return true;
            } else {
                item.style.border = "2px solid red";
                setTimeout(() => (item.style.border = "none"), 3000);
                return false;
            }
        },
        phone(value, item) {
            if (/^\+\d{1,1}\(\d{3,3}\)\-\d{3,3}\-\d{2,2}\-(?:\d{2,2}|\d{2,}\_)$/g.test(value)) {
                return true;
            } else {
                item.style.border = "2px solid red";
                setTimeout(() => (item.style.border = "none"), 3000);
                return false;
            }
        },
    };

    async function sender(e) {
        try {
            const form = e.target;
            const formData = new FormData(form);
            const response = await fetch("formhandler.php", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                let c = await response.text();
                throw new Error(c);
            }

            let c = await response.text();
            if (c.split(":")[0] === `Ошибка при отправке письма`) {
                throw new Error(c);
            }
        } catch (err) {
            if (err instanceof TypeError && !navigator.online) {
                throw new TypeError("Ошибка сети");
            } else if (err instanceof SyntaxError) {
                throw new SyntaxError("Ошибка синтаксиса");
            } else {
                throw err;
            }
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        //
        Array.from(inputs).forEach((item) => {
            valid.push(validationRules[item.getAttribute("name")](item.value, item));
        });

        if (valid.includes(false)) {
        } else {
            loadingStart();
            sender(e)
                .then((e) => {
                    console.log("Сообщение отправлено");
                    inputs.forEach((item) => (item.value = ""));
                    formBtn.innerText = "Записаться";
                })
                .catch((err) => {
                    console.log(err);
                    formBtn.innerText = "Записаться";
                });
        }
    });

    function loadingStart() {
        formBtn.innerText = "";
        const div = document.createElement("div");
        const img = document.createElement("img");
        div.classList.add("loading");
        img.src = "images/loading.gif";
        div.append(img);
        formBtn.append(div);
    }

    const element = document.getElementById("input[name='phone']");
    const maskOptions = {
        mask: "+{7}(000)-000-00-00",
    };
    const mask = IMask(phone, maskOptions);
};
