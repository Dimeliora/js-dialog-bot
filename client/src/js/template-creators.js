export const createBotMessageTextHTML = (message) =>
    `<pre class="message__text">${message}</pre>`;

export const createBotMessageHTML = () => `
    <div class="dialog__message message">
        <div class="message__user">
            <div class="message__avatar">
                <img
                    src="/images/avatar-bot.webp"
                    alt="Аватар бота"
                    class="message__avatar-image"
                />
            </div>
            <div class="message__username">Оракул</div>
        </div>
        <div class="message__content" data-message-content>
            <div class="preloader">
                <div class="preloader__block"></div>
                <div class="preloader__block"></div>
                <div class="preloader__block"></div>
            </div>
        </div>
    </div>
`;

export const createUserMessageHTML = (username, message, avatarUrl = null) => {
    let avatarImageSrc = "/images/avatar-user-default.webp";
    if (avatarUrl !== null) {
        avatarImageSrc = avatarUrl;
    }

    return `
        <div class="dialog__message message message--user">
            <div class="message__user">
                <div class="message__avatar">
                    <img
                        src="${avatarImageSrc}"
                        alt="Аватар пользователя"
                        class="message__avatar-image"
                    />
                </div>
                <div class="message__username">${username}</div>
            </div>
            <div class="message__content">
                <pre class="message__text">${message}</pre>
            </div>
        </div>
    `;
};

export const createAlertHTML = (id, message) => `
    <div class="alert__item" id="${id}">
        <svg class="alert__item-icon">
            <use href="/icons/icon-sprite.svg#alert-error" />
        </svg>
        <span>${message}</span>
    </div>
`;
