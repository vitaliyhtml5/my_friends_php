'use strict';

import {checkEmptyData,checkLength,checkNumber} from './validate_data.js';
import {showAlert,showLoaderMain,closeLoaderMain} from './components.js';
import {closeOverlay} from './get_modal.js';
import {getProfileData} from '../script.js';

const editProfile = (userId) => {
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

export {editProfile};