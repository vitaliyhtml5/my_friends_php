'use strict';

import {addContent} from './js_scripts/add_content.js';
import {editProfileModal,closeOverlay} from './js_scripts/get_modal.js';
import {showLoaderMain,closeLoaderMain} from './js_scripts/components.js';

getProfileData();
async function getProfileData() {
    showLoaderMain();
    const res = await fetch('./php_scripts/profile_data.php');
    const data = await res.json();
    closeLoaderMain();
    if (data.message === 'Access is not allowed') {
        window.location.href = '/my_friends_php/login.html';
    } else {
        changeMenu(data);   
    }
}

function changeMenu(data) {
    const menu = document.querySelectorAll('.menu li');
    const section = document.querySelectorAll('.content-section');
    addContent(data, section[0]);
    editProfileModal(data[0]);
    
    menu.forEach((el, index) => {
        el.onclick = () => {
            menu.forEach(el => el.classList.remove('menu-selected'));
            section.forEach(el => {
                el.style.display = 'none';
                el.innerHTML = ``;
            });
            el.classList.add('menu-selected');
            section[index].style.display = 'block';

            if (index === 0) {
                getProfileData();
            }
        }
    });
}

export {getProfileData};