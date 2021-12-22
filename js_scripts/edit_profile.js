'use strict';

import {checkEmptyData,checkLength,checkNumber} from './validate_data.js';
import {showAlert,showLoaderMain,closeLoaderMain,showFileMessage} from './components.js';
import {closeOverlay} from './get_modal.js';
import {getProfileData} from '../script.js';

const editProfile = userId => {
    const input = document.querySelectorAll('.modal-profile input');
    const error = document.querySelectorAll('.modal-profile input+span');
    if (!checkEmptyData(input[0], error[0]) || !checkEmptyData(input[1], error[1]) || !checkEmptyData(input[2], error[2]) || !checkEmptyData(input[3], error[3])) {
        return;
    } else if (!checkLength(input[0], error[0], 20) || !checkLength(input[1], error[1], 20) || !checkLength(input[3], error[3], 20)) {
        return;
    } else if (!checkLength(input[2], error[2], 3)) {
        return;
    } else if (!checkNumber(input[2], error[2])) {
        return;
    } else {
        editProfileData();
    }
    
    async function editProfileData() {
        const data = {
            id: userId,
            first_name: input[0].value,
            last_name: input[1].value,
            age: input[2].value,
            hobby: input[3].value,
        }
        showLoaderMain();
        const res = await fetch('/my_friends_php/php_scripts/edit_profile.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        closeLoaderMain();
        if (result.message === 'Profile was updated') {
            getProfileData();
            closeOverlay();
            showAlert(result.message, 'successfull');
        } else {
            showAlert(result.message, 'unsuccessfull');
        }
    }
}

const loadImageProfile = (userId,oldImage) => {
    const file = document.querySelector('.upload-image-wrap input');
    file.addEventListener('change', handleFiles, false);
    
    function handleFiles() {
        const fileList = this.files;
        if (fileList[0].type != 'image/png' && fileList[0].type != 'image/jpeg') {
            showFileMessage('Incorrect format', false);
        } else if (fileList[0].size >= 5000000) {
            showFileMessage('Incorrect size', false);
        } else {
            showFileMessage(fileList[0].name, true);
            let uploadFile = file.files[0];
            let fileData = new FormData();
            fileData.append('avatar', uploadFile);
            document.querySelector('.upload-image-wrap button').onclick = () => uploadImage(fileData);
        }
    }
    async function uploadImage(fileData) {
        showLoaderMain();
        const res = await fetch('/my_friends_php/php_scripts/upload-avatar.php', {
            method: 'POST', 
            body: fileData
        });
        const result = await res.json();
        closeLoaderMain();

        if (result.message === 'Image was uploaded') {
            const data = {
                id: userId,
                image: result.image,
                old_image: oldImage
            }
            sendData(data);
        } else {
            showAlert(result.message, 'unsuccessfull');
        }
    }

    async function sendData(data) {
        const res = await fetch('/my_friends_php/php_scripts/edit_avatar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        closeLoaderMain();
        if (result.message === 'Avatar was changed') {
            getProfileData();
            closeOverlay();
            showAlert('Аватар был изменён', 'successfull');
        } else {
            showAlert('Something went wrong', 'unsuccessfull');
        }
    }
}

export {editProfile,loadImageProfile};