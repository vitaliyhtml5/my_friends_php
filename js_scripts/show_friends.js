'use strict';

import {addAllFriends,addProfileFriend} from './add_content.js';
import {showAlert,showLoaderMain,closeLoaderMain} from './components.js';

const showFriends = (userId, section) => {
    showAll(userId);
    showLoaderMain();

    async function showAll(userId) {
        const res = await fetch(`/my_friends_php/php_scripts/show_all_friends.php?id=${userId}`, {
            method: 'GET'
        });

        const result = await res.json();
        closeLoaderMain();
        addAllFriends(userId, section, result);
    }
}

const showFriendProfile = (userId, result, section) => {
    const friendBox = document.querySelectorAll('.friend-box');
    
    friendBox.forEach((el, index) => {
        el.onclick = () => {
            showLoaderMain();
            showFriend(userId, result[index]);
        }
    });

    async function showFriend(userId, chosenFriend) {
        const res = await fetch(`/my_friends_php/php_scripts/show_friend.php?user_id=${userId}&friend_id=${chosenFriend.id}`, {
            method: 'GET'
        });

        const newsArr = await res.json();
        closeLoaderMain();

        if (result) {
            addProfileFriend(userId, chosenFriend, newsArr, section, result);
        } else {
            showAlert('Что-то пошло не так', 'unsuccessfull');
        }
    }
}

export {showFriends,showFriendProfile};