import { appState } from "./app-state";
import { dialogElms } from "./dom-elements";

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
    };
});
