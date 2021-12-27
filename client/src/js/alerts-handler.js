import { v4 } from "uuid";

import { alertElms } from "./dom-elements";
import { createAlertHTML } from "./template-creators";

export const alertHandle = (message) => {
    const alertId = `alert-${v4()}`;
    const alertTemplate = createAlertHTML(alertId, message);

    alertElms.alertBlocknElm.insertAdjacentHTML("beforeend", alertTemplate);

    const alertElm = alertElms.alertBlocknElm.querySelector(`#${alertId}`);

    setTimeout(() => {
        alertElm.style.opacity = 0;

        alertElm.addEventListener("transitionend", () => {
            alertElm.remove();
        });
    }, 5000);
};
