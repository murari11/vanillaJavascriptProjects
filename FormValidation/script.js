const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);

const checkRequired = (inputArr) => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    })
}

const checkLength = (input, min, max) => {
    if (input.value.length < min)
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    else if (input.value.length > max)
        showError(input, `${getFieldName(input)} must be less then ${max} characters`);
    else showSuccess(input);
}

const checkEmail = (input) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) showSuccess(input);
    else showError(input, 'Email is not valid');
}

const checkPasswordMatch = (input, input2) => {
    if (input.value !== input2.value)
        showError(input2, 'Password do not match');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
})