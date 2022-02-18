const toggleFollow = ev => {
    console.log(ev);
    const elem = ev.currentTarget;
    const userId = elem.dataset.userId;
    console.log(elem.innerHTML);
    if (elem.innerHTML === 'follow'){
        followUser(userId, elem);
    }
    else {
        unfollowUser(elem.dataset.followingId, elem);
        
    }

}
const followUser = (userId, elem) => {
    const postData = {
        'user_id': userId
    };
    fetch('/api/following', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)

    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        elem.setAttribute('aria-checked', 'true');
        elem.innerHTML = 'unfollow';
        elem.classList.remove('follow');
        elem.classList.add('unfollow');
        elem.setAttribute('data-following-id', data.id);
    });
};

const unfollowUser = (followingId, elem) => {
    const deleteURL = `/api/following/${ followingId }`;
    fetch(deleteURL, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        elem.innerHTML = 'follow';
        elem.setAttribute('aria-checked', 'false');
        elem.classList.remove('unfollow');
        elem.classList.add('follow');
        elem.removeAttribute('data-following-id');
    })
}

const user2Html = user => {
    return `<div class="suggestion">
        <img src="${ user.thumb_url }"/>
        <div>
            <p class="username">${ user.username }</p>
            <p class="suggestion-text">suggested for you</p>
        </div>
        <div>
            <button 
            class="follow" 
            aria-label="Follow"
            aria-checked="false"
            data-user-id="${ user.id }" 
            onclick="toggleFollow(event);">follow</button>
        </div>
    </div>
    `;
};

const userSuggestions2Html = user => {
    return `<div>
                <div class="username_user">
                    <img class="profile_pic" src="${ user.image_url }"/>
                    <h2>${ user.username }</h2>
                </div>
                <p class="sfy">Suggestions for you</p>
            </div>`;
};

const getSuggestions = () => {
    fetch('api/profile')
        .then(response => response.json())
        .then(profile => {
            const profileUser = profile;
            fetch('api/suggestions')
                .then(response => response.json())
                .then(users => {
                    const html1 = userSuggestions2Html(profileUser);
                    const html2 = users.map(user2Html).join('\n');
                    const html = [html1, html2].join('\n');
                    document.querySelector('#suggestions').innerHTML = html;
        });
    });
};

getSuggestions();