'use strict';

// Alerts
function showAlert(text,status) {
    const alert = document.querySelector('.alert');

    createAlert(alert,text);
    alert.style.animation = 'showAlert 3s forwards';
    closeAlert(alert);

    if (status === 'unsuccessfull') {
        alert.classList.add('unsuccess');
    } else {
        alert.classList.remove('unsuccess');
    }
}

function createAlert(alert,text) {
    alert.innerHTML = `
    <p>${text}</p>
    <button>X</button>`;
}

function closeAlert(alert) {
    setTimeout(() => alert.style.animation = 'none', 3000);
    document.querySelector('.alert button').onclick = () => alert.style.animation = 'none';
}

// Loader
const showLoaderMain = () => document.querySelector('.loader').style.display = 'block';
const closeLoaderMain = () => document.querySelector('.loader').style.display = 'none';

// Format date
const formatDate = (date) => {
    const dateArr = date.split('-').reverse();
    const newDate = dateArr.join('-');
    return newDate;
}

// Format image
const showFileMessage = (text, res) => {
    const fileText = document.querySelector('.upload-image-message');
    const uploadBtn = document.querySelector('.upload-image-wrap button');

    if (!res) {
        uploadBtn.textContent = 'Выбрать';
        fileText.classList.add('upload-image-error');
        uploadBtn.style.zIndex = '1';
    } else {
        uploadBtn.textContent = 'Загрузить';
        fileText.classList.remove('upload-image-error');
        uploadBtn.style.zIndex = '5';
    }
    fileText.textContent = text;
}

export {formatDate,showAlert,showLoaderMain,closeLoaderMain,showFileMessage};