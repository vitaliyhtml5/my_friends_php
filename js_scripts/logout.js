'use strict';

import {showAlert} from './components.js';

const logout = () => {
    document.querySelector('.menu .logout').addEventListener('click', () => {
        logoutUser();
    });
    async function logoutUser() {
        const res = await fetch('/my_friends_php/php_scripts/logout.php', {
            method: 'GET'
        });
        const result = await res.json();
        
        if (result.message === 'User is logged out') {
            window.location.href = '/my_friends_php/login.html';
        } else {
            showAlert(result.message,'unsuccessfull');
        }
    }
}

export {logout};