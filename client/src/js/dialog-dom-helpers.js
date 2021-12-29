import { dialogElms } from "./dom-elements";

export const enableSendButton = () => {
    dialogElms.dialogSubmitElm.classList.remove("dialog__submit--hidden");
    dialogElms.dialogSubmitElm.disabled = false;
};

export const disableSendButton = () => {
    dialogElms.dialogSubmitElm.classList.add("dialog__submit--hidden");
    dialogElms.dialogSubmitElm.disabled = true;
};

export const scrollDialogsToBottom = () => {
    dialogElms.dialogMessagesElm.scrollTop =
        dialogElms.dialogMessagesElm.scrollHeight;
};