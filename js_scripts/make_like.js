'use srtict';

import {showAlert} from './components.js';

const makeLike = (userId, data, page) => {
    const likeBtn = document.querySelectorAll('.like-icon');

    likeBtn.forEach((el, index) => {
        if (page === 'main') index++;
        el.onclick = () => {
            if (el.classList.contains('like-icon-checked')) {
                el.classList.remove('like-icon-checked');
                setLike(+userId, +data[index].news_id, 'removeLike', el);
            } else {
                el.classList.add('like-icon-checked');
                setLike(+userId, +data[index].news_id, 'addLike', el);
            }
        }
    });

    async function setLike(users_id, news_id, action, el) {
        let data = {
            users_id,
            news_id,
            action: (action === 'addLike') ? 'add' : 'remove'
        }

        const res = await fetch('/my_friends_php/php_scripts/set_like.php', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await res.json();

        if (result.message === 'Like was added' || result.message === 'Like was removed') {
            el.textContent = result.likes;
        } else {
            showAlert('Что-то пошло не так', 'unsuccessfull');
        }
    }
}

export {makeLike};