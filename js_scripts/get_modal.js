'use strict';

import {editProfile,loadImageProfile} from './edit_profile.js';

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

const editAvatar =  (userId, oldImage) => {
    document.querySelector('.avatar-button').onclick = () => {
        createModal('editAvatar', undefined);
        showModal();
        document.querySelectorAll('.upload-image-wrap button')[1].addEventListener('click', closeOverlay);
        document.querySelector('.upload-image-wrap input').addEventListener('click', () => loadImageProfile(userId, oldImage));
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
    } else if (type === 'editAvatar') {
        overlay.innerHTML = `
        <div class="modal">
            <form class="modal-avatar-change" enctype="multipart/form-data" accept="image/jpeg,image/png">
                <h2>Смена аватара</h2>
                <p>Загрузите JPG или PNG изображение до 5 Мб</p>
                <span class="upload-image-message"></span>
                <div class="upload-image-wrap">
                    <input type="file" name="avatar">
                    <button type="button" class="button-main avatar-button">Выбрать</button>
                    <button type="button" class="button-secondary upload-avatar-secondary">Отмена</button>
                </div>
            </form>
        </div>`; 
    } else if (type === 'increaseImg') {
        overlay.innerHTML = `
        <div class="modal modal-image">
            <img src="${data}">
        </div>`; 
    }
}

export {editProfileModal,editAvatar,increaseImg,closeOverlay};

