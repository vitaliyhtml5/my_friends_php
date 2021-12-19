'use strict';

import {formatDate} from './components.js';

function addContent(data, section) {
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
        <button class="button-main">Написать пост</button>
        <div class="profile-post-wrap"></div>
    </div>`;
    addNews();
    function addNews() {
        const news = document.querySelector('.profile-post-wrap');
        if (data.length === 1) {
            console.log('EMPTY STATE');
            // EMPTY STATE
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
                    <img src="img/news/${data[i].image}" alt="News">
                    <span class="like-icon">${data[i].likes}</span>
                </div>`;
                if (!data[i].liked) {
                    document.querySelectorAll('.like-icon')[i-1].classList.add('like-icon-checked');
                } else {
                    document.querySelectorAll('.like-icon')[i-1].classList.remove('like-icon-checked');
                }
            }
        }
    }
}

export {addContent};