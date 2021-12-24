'use strict';

import {editProfile,loadImageProfile} from './edit_profile.js';
import {createNews,removeNews,editNews,disableFields,enableFields} from './news.js';
import {checkEmptyData,checkLength} from './validate_data.js';

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

const addNews = userId => {
    document.querySelector('.add-news-btn').onclick = () => {
        createModal('addNews', undefined);
        showModal();

        const addNewsBtn = document.querySelector('.upload-image-wrap .avatar-button');
        const textField = document.querySelector('.create-news textarea');
        const errorField = document.querySelector('.create-news .error-message');
        const file = document.querySelector('.upload-image-wrap input');
        textField.addEventListener('input', () => enableFields(file,addNewsBtn));

        file.addEventListener('click', () => {
            if (!checkEmptyData(textField, errorField)) {
                disableFields(file,addNewsBtn);
            } else if (!checkLength(textField, errorField, 400)) {
                disableFields(file,addNewsBtn);
            } else {
                enableFields(file,addNewsBtn);
            }
        });
        document.querySelectorAll('.upload-image-wrap button')[1].addEventListener('click', closeOverlay);
        document.querySelector('.upload-image-wrap input').addEventListener('click', () => createNews(userId));
    }
}

const editNewsModal = data => {
    document.querySelectorAll('.edit-news').forEach((el,index) => {
        el.onclick = () => {
            createModal('editNews', undefined);
            showModal();

            document.querySelector('.modal-news-edit textarea').value = data[index+1].text;
            document.querySelectorAll('.modal-news-edit button')[1].addEventListener('click', closeOverlay);
            document.querySelectorAll('.modal-news-edit button')[0].addEventListener('click', () => editNews(data[index+1].news_id, document.querySelector('.modal-news-edit textarea').value));
        }
    });
}

const deleteNews = data => {
    document.querySelectorAll('.remove-news').forEach((el,index) => {
        el.onclick = () => {
            createModal('deleteNews', data[index+1].text);
            showModal();
            
            document.querySelectorAll('.modal-avatar-change button')[1].addEventListener('click', closeOverlay);
            document.querySelectorAll('.modal-avatar-change button')[0].addEventListener('click', () => removeNews(data[index+1].news_id, data[index+1].image));
        }
    });
}

const increaseImg = img => {
    img.forEach(el => {
        el.onclick = () => {
            createModal('increaseImg', el.src);
            showModal();
            document.querySelector('.modal-image button').addEventListener('click', closeOverlay);
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
    } else if (type === 'addNews') {
        overlay.innerHTML = `
        <div class="modal modal-news">
            <h2>Написать пост</h2>
            <form class="create-news modal-avatar-change" enctype="multipart/form-data" accept="image/jpeg,image/png">
                <label>
                    Текст:
                    <textarea></textarea>
                    <span class="error-message"></span>
                </label>
                <p>Загрузите JPG или PNG изображение до 5 Мб</p>
                <span class="upload-image-message"></span>
                <div class="upload-image-wrap">
                    <input type="file" name="image">
                    <button type="button" class="button-main avatar-button">Выбрать</button>
                    <button type="button" class="button-secondary upload-avatar-secondary">Отмена</button>
                </div>
            </form>
        </div>`; 
    } else if (type === 'editNews') {
        overlay.innerHTML = `
        <div class="modal modal-news modal-news-edit">
            <h2>Редактировать пост</h2>
            <label>
                Текст:
                <textarea></textarea>
                <span class="error-message"></span>
            </label>
            <div class="modal-btn-wrap">
                <button class="button-main">Подтвердить</button>
                <button class="button-secondary">Отмена</button>
            </div>
        </div>`; 
    } else if (type === 'deleteNews') {
        overlay.innerHTML = `
        <div class="modal modal-avatar-change">
            <h2>Удаление поста</h2>
            <p>Вы действительно хотите удалить пост <b class="remove-news-text">${data}</b></p>
            <div class="modal-btn-wrap">
                <button class="button-main button-remove">Подтвердить</button>
                <button class="button-secondary">Отмена</button>
            </div>
        </div>`; 
    } else if (type === 'increaseImg') {
        overlay.innerHTML = `
        <div class="modal modal-image">
            <img src="${data}">
            <button class="button-main">Закрыть</button>
        </div>`; 
    }
}

export {editProfileModal,editAvatar,addNews,editNewsModal,deleteNews,increaseImg,closeOverlay};

