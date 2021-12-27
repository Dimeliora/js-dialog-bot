import { dialogElms } from "./dom-elements";

dialogElms.dialogStartBtnElm.addEventListener("click", () => {
    dialogElms.greetingBlockElm.classList.add("greeting--hidden");
});
