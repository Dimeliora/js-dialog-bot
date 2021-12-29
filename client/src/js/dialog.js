import { appState } from "./app-state";
import { dialogElms } from "./dom-elements";
import { webSocketsHandler } from "./websockets-handler";
import {
    enableSendButton,
    disableSendButton,
    scrollDialogsToBottom,
} from "./dialog-dom-helpers";
import { createUserMessageHTML } from "./template-creators";
import { alertHandle } from "./alerts-handler";

disableSendButton();

dialogElms.dialogStartBtnElm.addEventListener("click", () => {
    const { username, userAvatarImageUrl } = appState;

    dialogElms.greetingBlockElm.classList.add("greeting--hidden");

    dialogElms.greetingBlockElm.addEventListener("transitionend", () => {
        dialogElms.greetingBlockElm.style.setProperty("display", "none");
    });

    const ws = webSocketsHandler();

    dialogElms.dialogInputElm.addEventListener("input", ({ target }) => {
        if (target.value.trim().length > 0) {
            enableSendButton();
        } else {
            disableSendButton();
        }
    });

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
        dialogElms.dialogMessagesElm.insertAdjacentHTML(
            "beforeend",
            userMessageTemplate
        );

        scrollDialogsToBottom();

        ws.send(JSON.stringify({ message: messageText }));

        dialogElms.dialogInputElm.value = "";

        disableSendButton();
    });
});
