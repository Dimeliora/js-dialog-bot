import { appState } from "./app-state";
import { dialogElms } from "./dom-elements";
import { scrollDialogsToBottom } from "./dialog-dom-helpers";
import {
    createBotMessageHTML,
    createBotMessageTextHTML,
} from "./template-creators";
import { alertHandle } from "./alerts-handler";

const WS_URL = "ws://localhost:3000";

export const webSocketsHandler = () => {
    const ws = new WebSocket(WS_URL);

    const { username } = appState;

    ws.onopen = () => {
        dialogElms.dialogSpinnerElm.classList.add("dialog__spinner--hidden");
        dialogElms.dialogBlockElm.classList.add("dialog__wrapper--visible");

        ws.send(JSON.stringify({ username }));
    };

    ws.onerror = () => {
        alertHandle("Произошла ошибка соединения. Попробуйте ещё раз позже.");
    };

    ws.onclose = () => {
        alertHandle("Соединение было разорвано. Попробуйте ещё раз позже.");
    };

    ws.onmessage = (e) => {
        const { isPending, message, keepAlive } = JSON.parse(e.data);

        if (keepAlive) {
            return;
        }

        if (isPending) {
            const botMessageTemplate = createBotMessageHTML();
            dialogElms.dialogMessagesElm.insertAdjacentHTML(
                "beforeend",
                botMessageTemplate
            );

            scrollDialogsToBottom();

            return;
        }

        if (!appState.isDialogStarted) {
            const [hrs, mins] = new Date().toLocaleTimeString().split(":");

            dialogElms.dialogStartTimeElm.textContent = `Сегодня в ${hrs}:${mins}`;

            appState.isDialogStarted = true;
        }

        const botMessageContent =
            dialogElms.dialogMessagesElm.lastElementChild.querySelector(
                "[data-message-content]"
            );
        botMessageContent.innerHTML = createBotMessageTextHTML(message);
        botMessageContent.scrollIntoView();
    };

    return ws;
};
