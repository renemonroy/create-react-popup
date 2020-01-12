import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  IPopupBasicProps,
  IPopupContentCoords,
  IPopupContentProps,
  IPopupContext,
  IPopupProps,
  IPopupTriggerProps
} from "./index.interfaces";

import { createRootElement } from "./index.utils";

export default function createReactPopup() {
  const popupRootEl = createRootElement();
  /**
   * Context for a Popup
   * -------------------------------------------------------------------
   */
  const popupContext = React.createContext<IPopupContext>({
    active: false,
    position: "trigger-bottom-left",
    setPopupState: () => {},
    triggerClientRect: null,
    onClose: () => {},
    onTrigger: () => {}
  });

  /**
   * Popup Trigger
   * -------------------------------------------------------------------
   */
  function PopupTrigger({
    children = <button>Trigger</button>
  }: IPopupTriggerProps): JSX.Element {
    const ctx = React.useContext<IPopupContext>(popupContext);

    async function handleClick(e: MouseEvent) {
      let triggerClientRect = null;

      if (e && e.currentTarget) {
        const node = e.target as HTMLElement;
        triggerClientRect = node.getBoundingClientRect();
      }

      ctx.setPopupState &&
        (await ctx.setPopupState({ ...ctx, active: true, triggerClientRect }));

      ctx.onTrigger();
    }

    return React.cloneElement(children, { onClick: handleClick });
  }

  /**
   * Popup Content
   * -------------------------------------------------------------------
   */
  function PopupContent({
    children = <p>Content</p>
  }: IPopupContentProps): JSX.Element | null {
    const ref = React.useRef<any>(null);
    const ctx = React.useContext<IPopupContext>(popupContext);
    const [coords, setCoords] = React.useState<IPopupContentCoords | null>(
      null
    );

    function updateCoords(clientRect: ClientRect) {
      const clRect: ClientRect = clientRect;
      let left = 0 + window.scrollX;
      let top = 0 + window.scrollY;
      switch (ctx.position) {
        case "trigger-top-left":
          left += clRect.left;
          top += clRect.top - ref.current.clientHeight;
          break;
        case "trigger-top-right":
          left += clRect.right - ref.current.clientWidth;
          top += clRect.top - ref.current.clientHeight;
          break;
        case "trigger-bottom-right":
          left += clRect.right - ref.current.clientWidth;
          top += clRect.top + clRect.height;
          break;
        case "trigger-bottom-left":
        default:
          left += clRect.left;
          top += clRect.top + clRect.height;
      }
      setCoords({ left, top });
    }

    async function handleClickOutside(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target)) return;
      ctx.setPopupState && (await ctx.setPopupState({ ...ctx, active: false }));
      setCoords(null);
      if (ctx.active && ctx.triggerClientRect) ctx.onClose();
    }

    React.useEffect(() => {
      if (ctx.active && ctx.triggerClientRect)
        updateCoords(ctx.triggerClientRect);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ctx.active, ctx.position]);

    return ctx.active
      ? ReactDOM.createPortal(
          React.Children.map(children, child =>
            React.cloneElement(child, {
              ref,
              style: {
                ...child.props.style,
                position: "relative",
                visibility: ctx.active && coords != null ? "visible" : "hidden",
                ...coords
              }
            })
          ),
          popupRootEl
        )
      : null;
  }

  /**
   * Popup
   * -------------------------------------------------------------------
   */
  function Popup({
    children = () => null,
    position = "trigger-top-left",
    active = false,
    onClose = () => {},
    onTrigger = () => {}
  }: IPopupProps): JSX.Element {
    // Create a Popup state to pass as context
    const [popupState, setPopupState] = React.useState<IPopupBasicProps>({
      position,
      active,
      onClose,
      onTrigger
    });

    // Re render if a specified prop changes
    React.useEffect(() => {
      setPopupState({ ...popupState, position });
    }, [position]);

    const value = { ...popupState, setPopupState };

    // Return `children` props as function and share state
    return (
      <popupContext.Provider value={value}>
        {children({
          ...popupState,
          close: async () => {
            await setPopupState({ ...popupState, active: false });
            popupState.onClose();
          }
        })}
      </popupContext.Provider>
    );
  }

  Popup.Trigger = PopupTrigger;
  Popup.Content = PopupContent;

  return Popup;
}
