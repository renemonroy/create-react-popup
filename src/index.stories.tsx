/// <reference types="@storybook/react" />

import * as React from "react";
import { BlockPicker } from "react-color";
import { withKnobs, select } from "@storybook/addon-knobs";

import createReactPopup from "./index";

const ColorPopup = createReactPopup();

/**
 * Some Styles
 * --------------------------------------------------------------------------
 */

const exampleContainerStyle = {
  fontFamily: "sans-serif",
  margin: "150px auto",
  width: "400px",
  textAlign: "center"
} as React.CSSProperties;

const contentContainerStyle = {
  borderRadius: "5px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
  display: "inline-block"
} as React.CSSProperties;

/**
 * Some Available Options for Knobs
 * --------------------------------------------------------------------------
 */

const positionOptions = [
  "trigger-bottom-left",
  "trigger-bottom-right",
  "trigger-top-left",
  "trigger-top-right"
];

/**
 * Main Stories Configuration
 * --------------------------------------------------------------------------
 */

export default {
  title: "Popup Examples",
  decorators: [
    withKnobs,
    (story: any) => <div style={exampleContainerStyle}>{story()}</div>
  ]
};

/**
 * First Example (InputColor)
 * --------------------------------------------------------------------------
 * @description An Input that triggers a Color Picker when click on it.
 */

function InputColor({ position, label = "color" }: any) {
  const defVal = "#000000";
  const [value, setValue] = React.useState(defVal);
  return (
    <ColorPopup position={position}>
      {({ close }) => (
        <div className="input-color">
          <label>{label}: </label>
          <ColorPopup.Trigger>
            <input type="text" placeholder={defVal} value={value} readOnly />
          </ColorPopup.Trigger>
          <ColorPopup.Content>
            <div style={contentContainerStyle}>
              <BlockPicker
                color={value}
                onChangeComplete={color => {
                  setValue(color.hex);
                  close(); // not required when clicking outside
                }}
                triangle="hide"
              />
            </div>
          </ColorPopup.Content>
        </div>
      )}
    </ColorPopup>
  );
}

/**
 * Stories for Popups created above
 * --------------------------------------------------------------------------
 */

export function InputWithColorPicker() {
  const pos = select("Position", positionOptions, "trigger-bottom-left");
  return <InputColor label="Color" position={pos} />;
}
