import { POPUP_ROOT_NAME } from "./index.constants";

export function createRootElement(): HTMLDivElement {
  let popupRootEl: HTMLDivElement;

  const existingPopupRootEl = document.getElementById(
    POPUP_ROOT_NAME
  ) as HTMLDivElement;

  if (existingPopupRootEl) {
    popupRootEl = existingPopupRootEl;
  } else {
    popupRootEl = document.createElement("div") as HTMLDivElement;
    popupRootEl.id = POPUP_ROOT_NAME;
    popupRootEl.style.cssText =
      "position: absolute; top: 0; left: 0; height: 0; width: 0;";
    document.body.appendChild(popupRootEl);
  }

  return popupRootEl;
}
