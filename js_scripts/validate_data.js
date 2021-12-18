'use strict'

function checkEmptyData(field, error) {
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

function clearError(field, error) {
    field.addEventListener('input', () => {
        error.style.display = 'none';
        field.classList.remove('error-input');
    });
}

export {checkEmptyData};