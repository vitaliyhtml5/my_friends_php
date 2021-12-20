'use strict';

import {addAllFriends,addProfileFriend} from './add_content.js';
import {showAlert} from './components.js';

const showFriends = (userId, section) => {
    showAll(userId);

    async function showAll(userId) {
        const res = await fetch(`/my_friends_php/php_scripts/show_all_friends.php?id=${userId}`, {
            method: 'GET'
        });
        const result = await res.json();

        addAllFriends(userId, section, result);
    }
}

const showFriendProfile = (userId, result, section) => {
    const friendBox = document.querySelectorAll('.friend-box');
    
    friendBox.forEach((el, index) => {
        el.onclick = () => {
            showFriend(userId, result[index]);
        }
    });

    async function showFriend(userId, chosenFriend) {
        const res = await fetch(`/my_friends_php/php_scripts/show_friend.php?user_id=${userId}&friend_id=${chosenFriend.id}`, {
            method: 'GET'
        });
        const newsArr = await res.json();
        if (result) {
            addProfileFriend(userId, chosenFriend, newsArr, section, result);
        } else {
            showAlert('Something went wrong', 'unsuccessfull');
        }
    }
}

export {showFriends,showFriendProfile};