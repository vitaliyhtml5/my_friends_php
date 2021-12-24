'use strict';

import {checkEmptyData} from './validate_data.js';
import {showAlert} from './components.js';

document.querySelector('.login-form').addEventListener('submit', e => {
    e.preventDefault();

    const input = document.querySelectorAll('.login-form input');
    const error = document.querySelectorAll('.login-form .error-message');

    const data = {
        user: input[0].value,
        password: input[1].value,
        remember: input[2].checked
    }

    if (!checkEmptyData(input[0], error[0]) || !checkEmptyData(input[1], error[1])) {
        return;
    } else {
        makeLogin();
    }

    async function makeLogin() {
        const res = await fetch('/my_friends_php/php_scripts/login.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.message === 'Access is allowed') {
            window.location.href = '/my_friends_php/index.html';
        } else {
            showAlert('Что-то пошло не так', 'unsuccessfull');
        }
    }
});