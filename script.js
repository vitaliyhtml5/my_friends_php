'use strict';

import {addContent,addAllNews} from './js_scripts/add_content.js';
import {editProfileModal} from './js_scripts/get_modal.js';
import {showLoaderMain,closeLoaderMain} from './js_scripts/components.js';
import {makeLike} from './js_scripts/make_like.js';
import {showFriends} from './js_scripts/show_friends.js';
import {logout} from './js_scripts/logout.js';

getProfileData();
logout();
async function getProfileData() {
    showLoaderMain();
    const res = await fetch('php_scripts/profile_data.php', {
        method: 'GET'
    });
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
    makeLike(data[0].id, data, 'main');
    
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
            } else if (index === 1) {
                showFriends(data[0].id, section[1]);
            } else if (index === 2) {
                addAllNews(data[0].id, section[2]);
            }
        }
    });
}

export {getProfileData};