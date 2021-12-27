import { appState } from "./app-state";
import { usernameElms } from "./dom-elements";
import { alertHandle } from "./alerts-handler";

usernameElms.usernameValueElm.textContent = appState.username;

const usernameChangeFormCallHandler = () => {
    usernameElms.usernameBlockElm.classList.add(
        "greeting__username-wrapper--show-form"
    );

    usernameElms.usernameInputElm.removeAttribute("tabindex");
    usernameElms.usernameSubmitElm.removeAttribute("tabindex");

    usernameElms.usernameInputElm.select();
};

usernameElms.usernameValueElm.addEventListener(
    "click",
    usernameChangeFormCallHandler
);

usernameElms.usernameValueElm.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        usernameChangeFormCallHandler();
    }
});

usernameElms.usernameFormElm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameElms.usernameInputElm.value;
    if (username.trim().length === 0) {
        alertHandle("Необходимо ввести имя пользователя.");
        usernameElms.usernameInputElm.focus();
        return;
    }

    appState.username = username;
    usernameElms.usernameValueElm.textContent = username;

    usernameElms.usernameBlockElm.classList.remove(
        "greeting__username-wrapper--show-form"
    );

    usernameElms.usernameInputElm.setAttribute("tabindex", "-1");
    usernameElms.usernameSubmitElm.setAttribute("tabindex", "-1");
});
