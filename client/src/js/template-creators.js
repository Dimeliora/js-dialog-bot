export const createBotMessageTextHTML = (message) =>
    `<pre class="message__text">${message}</pre>`;

export const createBotMessageHTML = () => `
    <div class="chat__message message">
        <div class="message__user">
            <div class="message__avatar">
                <img
                    src="/images/avatar-bot.webp"
                    alt="Аватар бота"
                    class="message__avatar-image"
                />
            </div>
            <div class="message__username">Бот</div>
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
