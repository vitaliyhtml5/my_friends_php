'use strict'

const checkEmptyData = (field, error) => {
    let validation = false;

    if (field.value.length === 0) {
        error.style.display = 'block';
        field.classList.add('error-input');
        error.textContent = 'Can\'t be blank';
        validation = false;
        clearError(field, error);
    } else {
        validation = true;
    }
    return validation;
}

const checkLength = (field, error, length) => {
    let validation = false;

    if (field.value.length > length) {
        error.style.display = 'block';
        field.classList.add('error-input');
        error.textContent = `Max length is ${length} chars`;
        validation = false;
        clearError(field, error);
    } else {
        validation = true;
    }
    return validation;
}

const checkNumber = (field, error) => {
    let validation = false;
    let re = /^[0-9]{1,3}$/;

    if (!re.test(field.value)) {
        error.style.display = 'block';
        field.classList.add('error-input');
        error.textContent = `Only intergers can be put`;
        validation = false;
        clearError(field, error);
    } else {
        validation = true;
    }
    return validation;
}

function clearError(field, error) {
    field.addEventListener('input', () => {
        error.style.display = 'none';
        field.classList.remove('error-input');
    });
}

export {checkEmptyData,checkLength,checkNumber};