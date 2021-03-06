// SlideShow
function SlideShow(optionSlide) {
    const slides = document.querySelector(optionSlide.slide).children;
    const prev = document.querySelector(optionSlide.prev);
    const next = document.querySelector(optionSlide.next);
    const indicator = document.querySelector(optionSlide.indicator);
    // const slides = document.querySelector('.slider').children;
    // const prev = document.querySelector('.prev');
    // const next = document.querySelector('.next');
    // const indicator = document.querySelector('.indicator');
    let index = 0;

    prev.addEventListener("click", function() {
        prevSlide();
        updateCircleIndicator();
        resetTimer();
    })

    next.addEventListener("click", function() {
        nextSlide();
        updateCircleIndicator();
        resetTimer();

    })

    // create circle indicators


    function circleIndicator() {
        for (let i = 0; i < slides.length; i++) {
            const div = document.createElement("div");
            div.setAttribute("onclick", "indicateSlide(this)")
            div.id = i;

            if (i == 0) {
                div.className = "active";
            }
            indicator.appendChild(div);
        }
    }
    circleIndicator();

    function indicateSlide(e) {
        index = e.id;
        changeSlide();
        updateCircleIndicator();
        resetTimer();
    }

    function updateCircleIndicator() {
        for (let i = 0; i < indicator.children.length; i++) {
            indicator.children[i].classList.remove("active");
        }
        indicator.children[index].classList.add("active");
    }

    function prevSlide() {
        if (index == 0) {
            index = slides.length - 1;
        } else {
            index--;
        }
        changeSlide();
    }

    function nextSlide() {
        if (index == slides.length - 1) {
            index = 0;
        } else {
            index++;
        }
        changeSlide();
    }

    function changeSlide() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }

        slides[index].classList.add("active");
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(autoPlay, 5000);
    }


    function autoPlay() {
        nextSlide();
        updateCircleIndicator();
    }

    let timer = setInterval(autoPlay, 5000);

}


// Validate


function Validator(options) {
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add('invalid');
            inputElement.parentElement.classList.remove('valid-success');
        } else {
            errorElement.innerHTML = '';
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.classList.add('valid-success');
        }
        return !errorMessage;
    }


    var formElement = document.querySelector(options.form);


    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                alert('????ng k?? th??nh c??ng')
            }
        }

        options.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                inputElement.onchange = function() {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerHTML = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}


Validator.isRequired = (selector) => {
    return {
        selector,
        test: (value) => {
            let regex = /^[^\d+]*[\d+]{0}[^\d+]*$/;
            if (value.trim() == '') {
                value = 'B???n ch??a nh???p th??ng tin';
            } else if (!regex.test(value)) {
                value = 'B???n ???? nh???p sai, vui l??ng nh???p l???i'
            } else value = undefined;

            return value;
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector,
        test: (value) => {
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value.trim() == '') {
                value = 'B???n ch??a nh???p th??ng tin';
            } else if (!regex.test(value)) {
                value = 'B???n ???? nh???p sai, vui l??ng nh???p l???i'
            } else value = undefined;

            return value;

        }
    }
}

Validator.isPassword = (selector) => {
    return {
        selector,
        test: (value) => {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
            if (value.trim() == '') {
                value = 'Kh??ng ???????c ????? tr???ng m???t kh???u';
            } else if (!regex.test(value)) {
                value = 'M???t kh???u t??? 8-32 k?? t???, ??t nh???t 1 ch??? hoa, 1 ch??? th?????ng v?? 1 ch??? s???'
            } else value = undefined;

            return value;
        }
    }
}

Validator.isCheckPassword = (selector, checkPassword) => {
    return {
        selector,
        test: (value) => {
            if (value.trim() == '') {
                value = 'Kh??ng ???????c ????? tr???ng m???t kh???u';
            }
            return value === checkPassword() ? undefined : 'M???t kh???u nh???p l???i kh??ng ????ng';
        }
    }
}