import * as React from "react";
import { BlockPicker } from "react-color";

import createReactPopup from "../index";

const Popup = createReactPopup();

const pickerContainerStyle = {
  borderRadius: "5px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
  display: "inline-block"
};

export default function InputColor({ position, label = "color" }: any) {
  const defVal = "#000000";
  const [value, setValue] = React.useState(defVal);
  return (
    <Popup position={position}>
      {({ close }) => (
        <div className="input-color">
          <label>{label}: </label>
          <Popup.Trigger>
            <input type="text" placeholder={defVal} value={value} readOnly />
          </Popup.Trigger>
          <Popup.Content>
            <div style={pickerContainerStyle}>
              <BlockPicker
                color={value}
                onChangeComplete={color => {
                  setValue(color.hex);
                  close(); // not required when clicking outside
                }}
                triangle="hide"
              />
            </div>
          </Popup.Content>
        </div>
      )}
    </Popup>
  );
}
