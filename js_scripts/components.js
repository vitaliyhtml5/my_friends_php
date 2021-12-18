'use strict';

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

export {showAlert};