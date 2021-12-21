'use strict';

import {editProfile} from './edit_profile.js';

const overlay = document.querySelector('.overlay');
const editProfileModal = data =>  {
    document.querySelector('.edit-profile').onclick = () => {
        createModal('editProfile', data);
        showModal();
        const  btnModal = document.querySelectorAll('.modal-btn-wrap button');
        btnModal[1].addEventListener('click', closeOverlay);
        btnModal[0].addEventListener('click', () => editProfile(data.id));
    }
}

const increaseImg = img => {
    img.forEach(el => {
        el.onclick = () => {
            createModal('increaseImg', el.src);
            showModal();
            overlay.addEventListener('click',closeOverlay);
        }
    });
}

function showModal() {
    overlay.style.animation = 'openModal 0.8s forwards';
    document.addEventListener('keydown', e => {
        if (e.code === 'Escape') closeOverlay();
    });
}

const closeOverlay = () => {
    overlay.style.animation = 'closeModal 0.5s forwards';
    overlay.innerHTML = ``;
}

function createModal(type, data) {
    overlay.innerHTML = ``;
    if (type === 'editProfile') {
        overlay.innerHTML = `
        <div class="modal modal-profile">
            <h2>Редактировать профиль</h2>
            <label>Имя:
                <input type="text" value="${data.first_name}">
                <span class="error-message"></span>
            </label>
            <label>Фамилия:
                <input type="text" value="${data.last_name}">
                <span class="error-message"></span>
            </label>
            <label>Возраст:
                <input type="text" value="${data.age}">
                <span class="error-message"></span>
            </label>
            <label>Хобби:
                <input type="text" value="${data.hobby}">
                <span class="error-message"></span>
            </label>
            <div class="modal-btn-wrap">
                <button class="button-main">Подтвердить</button>
                <button class="button-secondary">Отмена</button>
            </div>
        </div>`;
    } else if (type === 'increaseImg') {
        overlay.innerHTML = `
        <div class="modal modal-image">
            <img src="${data}">
        </div>`; 
    }
}

export {editProfileModal,increaseImg,closeOverlay};

