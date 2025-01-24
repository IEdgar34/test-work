export const formHandler = () => {
    const inputs = document.querySelectorAll(".form__input ,.validate");
    const form = document.getElementById("contactForm");
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

    function sender(e) {
        const form = e.target;
        const formData = new FormData(form);

        fetch("formhandler.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                inputs.forEach((item) => (item.value = ""));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        //
        Array.from(inputs).forEach((item) => {
            valid.push(validationRules[item.getAttribute("name")](item.value, item));
        });

        if (valid.includes(false)) {
        } else {
            sender(e);
        }
    });
};
