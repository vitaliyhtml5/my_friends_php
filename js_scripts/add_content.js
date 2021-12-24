'use strict';

import {formatDate,showLoaderMain,closeLoaderMain} from './components.js';
import {showFriendProfile} from './show_friends.js';
import {makeLike} from './make_like.js';
import {increaseImg} from './get_modal.js';

const addContent = (data, section) => {
    section.innerHTML = `
    <div class="profile-wrap">
        <div class="avatar-profile">
            <img src="img/avatars/${data[0].avatar}" alt="Profile avatar">
            <button class="button-main avatar-button">Сменить аватар</button>
        </div>
        <div class="profile-data">
            <ul class="profile-menu">
                <li class="profile-name"><span>${data[0].first_name}</span> <span>${data[0].last_name}</span></li>
                <li><span>${data[0].age}</span> лет</li>
                <li>${data[0].hobby}</li>
            </ul>
        </div>
        <button class="edit-profile" title="Редактировать профиль"></button>
    </div>
    <div class="profile-news">
        <button class="button-main add-news-btn">Написать пост</button>
        <div class="profile-post-wrap"></div>
    </div>`;
    addNews();
    function addNews() {
        const news = document.querySelector('.profile-post-wrap');
        news.innerHTML = ``;

        if (data.length === 1) {
            news.innerHTML = `
            <div class="news-info-empty">
                <img src="img/news-empty.svg" alt="Пост не добавлен">
                <b>Напишите свой первый пост</b>
            </div>`;
        } else {
            for (let i = 1; i < data.length; i++) {
                news.innerHTML += `
                <div class="profile-post">
                    <div class="news-info">
                        <span class="edit-news" title="Редактировать пост"></span>
                        <span class="remove-news" title="Удалить пост"></span>
                        <span class="news-date">${formatDate(data[i].created)}</span>
                    </div>
                    <p>${data[i].text}</p>
                    <img class="news-img" src="img/news/${data[i].image}" alt="News">
                    <span class="like-icon">${data[i].likes}</span>
                </div>`;
                if (data[i].liked) {
                    document.querySelectorAll('.like-icon')[i-1].classList.add('like-icon-checked');
                } else {
                    document.querySelectorAll('.like-icon')[i-1].classList.remove('like-icon-checked');
                }
                increaseImg(document.querySelectorAll('.news-img'));
            }
        }
    }
}

const addAllFriends = (userId, section, result) => {
    section.innerHTML = ``;

    for (let i in result) {
        section.innerHTML += `
        <div class="all-friends-wrap">
            <div class="friend-box">
                <img class="avatar-wrap" src="img/avatars/${result[i].avatar}" alt="${result[i].first_name} ${result[i].last_name}">
                <ul class="friend-main-data">
                    <li class="profile-name"><span>${result[i].first_name}</span> <span>${result[i].last_name}</span></li>
                    <li><span>${result[i].age}</span> лет</li>
                </ul>
                <span class="friend-data-hobby">${result[i].hobby}</span>
            </div>
        </div>`;
    }
    showFriendProfile(userId, result, section);
}

const addProfileFriend = (userId, chosenFriend, data, section, result) => {
    section.innerHTML = ``;

    section.innerHTML = `
    <div class="profile-wrap">
        <div class="avatar-profile">
            <img src="img/avatars/${chosenFriend.avatar}" alt="Profile avatar">
        </div>
        <div class="profile-data">
            <ul class="profile-menu">
                <li class="profile-name"><span>${chosenFriend.first_name}</span> <span>${chosenFriend.last_name}</span></li>
                <li><span>${chosenFriend.age}</span> лет</li>
                <li>${chosenFriend.hobby}</li>
            </ul>
        </div>
        <span class="link-back">Назад</span>
    </div>
    <div class="profile-news">
        <div class="profile-post-wrap"></div>
    </div>`;

    addNews();

    function addNews() {
        const news = document.querySelector('.profile-post-wrap');
        news.innerHTML = ``;

        if (data.length === 0) {
            news.innerHTML = `
            <div class="news-info-empty">
                <img src="img/news-empty.svg" alt="Пост не добавлен">
                <b>Пост ещё не добавлен</b>
            </div>`;
        } else {
            for (let i = 0; i < data.length; i++) {
                news.innerHTML += `
                <div class="profile-post">
                    <div class="news-info">
                        <span class="news-date">${formatDate(data[i].created)}</span>
                    </div>
                    <p>${data[i].text}</p>
                    <img class="news-img" src="img/news/${data[i].image}" alt="News">
                    <span class="like-icon">${data[i].likes}</span>
                </div>`;
                if (data[i].liked) {
                    document.querySelectorAll('.like-icon')[i].classList.add('like-icon-checked');
                } else {
                    document.querySelectorAll('.like-icon')[i].classList.remove('like-icon-checked');
                }
            }
            makeLike(userId, data);
            increaseImg(document.querySelectorAll('.news-img'));
        }
        
        document.querySelector('.link-back').onclick = () => addAllFriends(userId, section, result);
    }
}

const addAllNews = (userId, section) => {
    showNews();
    showLoaderMain();
    async function showNews() {
        const res = await fetch(`/my_friends_php/php_scripts/show_all_news.php?user_id=${userId}`, {
            method: 'GET'
        });
        const data = await res.json();
        closeLoaderMain();
        addNews(data);
    }
    function addNews(data) {
        section.innerHTML = ``;
        
        for (let i = 0; i < data.length; i++) {
            section.innerHTML += `
            <div class="profile-post-wrap">
                <div class="profile-post">
                    <div class="post-info">
                        <div class="author-news">
                            <img class="avatar-wrap" src="img/avatars/${data[i].avatar}" alt="${data[i].first_name} ${data[i].last_name}">
                            <span><b>${data[i].first_name}</b> <b>${data[i].last_name}</b></span>
                        </div>
                        <span class="news-date">${data[i].created}</span>
                    </div>
                    <p>${data[i].text}</p>
                    <img class="news-img" src="img/news/${data[i].image}" alt="News">
                    <span class="like-icon">${data[i].likes}</span>
                </div>
            </div>`;
            if (data[i].liked) {
                document.querySelectorAll('.like-icon')[i].classList.add('like-icon-checked');
            } else {
                document.querySelectorAll('.like-icon')[i].classList.remove('like-icon-checked');
            }
        }

        makeLike(userId, data);
        increaseImg(document.querySelectorAll('.news-img'));
    }
}

export {addContent,addAllFriends,addProfileFriend,addAllNews};