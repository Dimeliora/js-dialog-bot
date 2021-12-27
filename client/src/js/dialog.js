import { appState } from './app-state';
import { dialogElms } from './dom-elements';
import {
    createBotMessageHTML,
    createBotMessageTextHTML,
    createUserMessageHTML,
} from './template-creators';
import { alertHandle } from './alerts-handler';

const WS_URL = 'ws://localhost:3000';

const enableSendButton = () => {
    dialogElms.dialogSubmitElm.classList.remove('dialog__submit--hidden');
    dialogElms.dialogSubmitElm.disabled = false;
};

const disableSendButton = () => {
    dialogElms.dialogSubmitElm.classList.add('dialog__submit--hidden');
    dialogElms.dialogSubmitElm.disabled = true;
};

const scrollDialogsToBottom = () => {
    dialogElms.dialogMessagesElm.scrollTop =
        dialogElms.dialogMessagesElm.scrollHeight;
};

disableSendButton();

dialogElms.dialogStartBtnElm.addEventListener('click', () => {
    const { username, userAvatarImageUrl } = appState;

    dialogElms.greetingBlockElm.classList.add('greeting--hidden');
    dialogElms.dialogBlockElm.classList.add('dialog--visible');

    dialogElms.greetingBlockElm.addEventListener('transitionend', () => {
        dialogElms.greetingBlockElm.style.setProperty('display', 'none');
    });

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        ws.send(JSON.stringify({ username }));
    };

    ws.onerror = () => {
        alertHandle('Произошла ошибка соединения. Попробуйте ещё раз позже.');
    };

    ws.onclose = () => {
        alertHandle('Соединение было разорвано. Попробуйте ещё раз позже.');
    };

    ws.onmessage = (e) => {
        const { isPending, message } = JSON.parse(e.data);

        if (isPending) {
            const botMessageTemplate = createBotMessageHTML();
            dialogElms.dialogMessagesElm.insertAdjacentHTML(
                'beforeend',
                botMessageTemplate
            );

            scrollDialogsToBottom();

            return;
        }

        if (!appState.isDialogStarted) {
            const [hrs, mins] = new Date().toLocaleTimeString().split(':');

            dialogElms.dialogStartTimeElm.textContent = `Сегодня в ${hrs}:${mins}`;

            appState.isDialogStarted = true;
        }

        const botMessageContent =
            dialogElms.dialogMessagesElm.lastElementChild.querySelector(
                '[data-message-content]'
            );
        botMessageContent.innerHTML = createBotMessageTextHTML(message);

        scrollDialogsToBottom();
    };

    dialogElms.dialogInputElm.addEventListener('input', ({ target }) => {
        if (target.value.trim().length > 0) {
            enableSendButton();
        } else {
            disableSendButton();
        }
    });

    dialogElms.dialogFormElm.addEventListener('submit', (e) => {
        e.preventDefault();

        const messageText = dialogElms.dialogInputElm.value;
        if (messageText.trim().length === 0) {
            alertHandle('Сообщение не может быть пустым.');
            return;
        }

        const userMessageTemplate = createUserMessageHTML(
            username,
            messageText,
            userAvatarImageUrl
        );
        dialogElms.dialogMessagesElm.insertAdjacentHTML(
            'beforeend',
            userMessageTemplate
        );

        scrollDialogsToBottom();

        ws.send(JSON.stringify({ message: messageText }));

        dialogElms.dialogInputElm.value = '';
        dialogElms.dialogInputElm.focus();

        disableSendButton();
    });
});
