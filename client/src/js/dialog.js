import { appState } from "./app-state";
import { dialogElms } from "./dom-elements";
import {
    createBotMessageHTML,
    createBotMessageTextHTML,
} from "./template-creators";

const WS_URL = "ws://localhost:3000";

dialogElms.dialogStartBtnElm.addEventListener("click", () => {
    const { username } = appState;

    dialogElms.greetingBlockElm.classList.add("greeting--hidden");

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        ws.send(JSON.stringify({ username }));
    };

    ws.onerror = () => {
        alert("Произошла ошибка соединения. Попробуйте ещё раз позже.");
    };

    ws.onclose = () => {
        alert("Соединение было разорвано. Попробуйте ещё раз позже.");
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
            dialogElms.dialogDialogElm.scrollTop =
                dialogElms.dialogDialogElm.scrollHeight;
            return;
        }

        const botMessageContent =
            dialogElms.dialogDialogElm.lastElementChild.querySelector(
                "[data-message-content]"
            );
        botMessageContent.innerHTML = createBotMessageTextHTML(message);
    };
});
