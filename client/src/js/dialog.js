import { appState } from "./app-state";
import { dialogElms } from "./dom-elements";
import {
    createBotMessageHTML,
    createBotMessageTextHTML,
    createUserMessageHTML,
} from "./template-creators";
import { alertHandle } from "./alerts-handler";

const WS_URL = "ws://localhost:3000";

dialogElms.dialogSubmitElm.disabled = true;

const scrollDialogsToBottom = () => {
    dialogElms.dialogDialogElm.scrollTop =
        dialogElms.dialogDialogElm.scrollHeight;
};

dialogElms.dialogStartBtnElm.addEventListener("click", () => {
    const { username, userAvatarImageUrl } = appState;

    dialogElms.greetingBlockElm.classList.add("greeting--hidden");

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        ws.send(JSON.stringify({ username }));
    };

    ws.onerror = () => {
        alertHandle("Произошла ошибка соединения. Попробуйте ещё раз позже.");
    };

    ws.onclose = () => {
        alertHandle("Соединение было разорвано. Попробуйте ещё раз позже.");
    };

    ws.onmessage = (e) => {
        const { isPending, message } = JSON.parse(e.data);

        if (!appState.isDialogStarted) {
            const [hrs, mins] = new Date().toLocaleTimeString().split(":");

            dialogElms.dialogStartTimeElm.textContent = `Сегодня в ${hrs}:${mins}`;

            appState.isDialogStarted = true;
        }

        if (isPending) {
            const botMessageTemplate = createBotMessageHTML();
            dialogElms.dialogDialogElm.insertAdjacentHTML(
                "beforeend",
                botMessageTemplate
            );
            scrollDialogsToBottom();
            return;
        }

        const botMessageContent =
            dialogElms.dialogDialogElm.lastElementChild.querySelector(
                "[data-message-content]"
            );
        botMessageContent.innerHTML = createBotMessageTextHTML(message);
        scrollDialogsToBottom();

        dialogElms.dialogSubmitElm.disabled = false;
    };

    dialogElms.dialogFormElm.addEventListener("submit", (e) => {
        e.preventDefault();

        const messageText = dialogElms.dialogInputElm.value;
        if (messageText.trim().length === 0) {
            alertHandle("Сообщение не может быть пустым.");
            return;
        }

        const userMessageTemplate = createUserMessageHTML(
            username,
            messageText,
            userAvatarImageUrl
        );
        dialogElms.dialogDialogElm.insertAdjacentHTML(
            "beforeend",
            userMessageTemplate
        );
        scrollDialogsToBottom();

        ws.send(JSON.stringify({ message: messageText }));

        dialogElms.dialogInputElm.value = "";
        dialogElms.dialogInputElm.focus();

        dialogElms.dialogSubmitElm.disabled = true;
    });
});
