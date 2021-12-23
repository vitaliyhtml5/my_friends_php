'use strict';

import {showAlert,showLoaderMain,closeLoaderMain,showFileMessage} from './components.js';
import {closeOverlay} from './get_modal.js';
import {getProfileData} from '../script.js';
import {checkEmptyData,checkLength} from './validate_data.js';

const createNews = userId => {
    const file = document.querySelector('.upload-image-wrap input');
    const textField = document.querySelector('.create-news textarea');
    
    file.addEventListener('change', handleFiles, false);
    
    function handleFiles() {
        const fileList = this.files;

        if (fileList[0].type != 'image/png' && fileList[0].type != 'image/jpeg') {
            showFileMessage('Неверный формат', false);
        } else if (fileList[0].size >= 5000000) {
            showFileMessage('Неверный размер файла', false);
        } else {
            showFileMessage(fileList[0].name, true);
            let uploadFile = file.files[0];
            let fileData = new FormData();
            fileData.append('image', uploadFile);
            document.querySelector('.upload-image-wrap button').onclick = () => uploadImage(fileData);
        }
    }
    async function uploadImage(fileData) {
        showLoaderMain();
        const res = await fetch('/my_friends_php/php_scripts/upload_news.php', {
            method: 'POST', 
            body: fileData
        });
        const result = await res.json();
        closeLoaderMain();

        if (result.message === 'Image was uploaded') {
            const data = {
                id: userId,
                text: textField.value,
                image: result.image
            }
            sendData(data);
        } else {
            showAlert(result.message, 'unsuccessfull');
        }
    }

    async function sendData(data) {
        const res = await fetch('/my_friends_php/php_scripts/add_news.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        closeLoaderMain();
        if (result.message === 'News was added') {
            getProfileData();
            closeOverlay();
            showAlert('Новость опубликована', 'successfull');
        } else if (result.message === 'Field should be filled') {
            showAlert('Поле не может быть пустым', 'unsuccessfull');
        } else if (result.message === 'Incorrect lengths of value') {
            showAlert('Максимальная длина - 400 символов', 'unsuccessfull');
        } else {
            showAlert('Что-то пошло не так', 'unsuccessfull');
        }
    }
}

const editNews = (newsId, textNew) => {
    const field = document.querySelector('.modal-news-edit textarea');
    const error = document.querySelector('.modal-news-edit .error-message');

    if (!checkEmptyData(field, error)) {
        return;
    } else if (!checkLength(field, error, 400)) {
        return;
    } else {
        sendEditData();
    }

    async function sendEditData() {
        showLoaderMain();
        const data = {
            news_id: newsId,
            text: textNew
        }
        const res = await fetch('/my_friends_php/php_scripts/edit_news.php', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        closeLoaderMain();

        if (result.message === 'News was edited') {
            getProfileData();
            closeOverlay();
            showAlert('Новость была изменена', 'successfull');
        } else {
            showAlert('Что-то пошло не так', 'unsuccessfull');
        }
    }
}

const removeNews = (newsId, newsImage) => {
    sendRemoveData();

    async function sendRemoveData() {
        showLoaderMain();
        const res = await fetch(`/my_friends_php/php_scripts/delete_news.php?news_id=${newsId}&news_image=${newsImage}`, {
            method: 'DELETE'
        });
        const result = await res.json();
        closeLoaderMain();

        if (result.message === 'News was deleted') {
            getProfileData();
            closeOverlay();
            showAlert('Новость была удалена', 'successfull');
        } else {
            showAlert('Что-то пошло не так', 'unsuccessfull');
        }
    }
}

function disableFields(field, button) {
    field.disabled = true;
    button.disabled = true;
}
function enableFields(field, button) {
    field.disabled = false;
    button.disabled = false;
}

export {createNews,removeNews,editNews,disableFields,enableFields};