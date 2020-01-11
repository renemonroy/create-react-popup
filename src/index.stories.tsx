import * as React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";

import InputColor from "./examples/InputColor";
import InputColorStory from "./examples/InputColor.mdx";

/**
 * Some Styles
 * --------------------------------------------------------------------------
 */

const exampleContainerStyle = {
  fontFamily: "sans-serif",
  margin: "50px auto",
  width: "400px",
  textAlign: "center"
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
 * Stories for Popups created above
 * --------------------------------------------------------------------------
 */

export function InputColorExample() {
  const pos = select("Position", positionOptions, "trigger-bottom-right");
  return <InputColor label="Color" position={pos} />;
}

InputColorExample.story = { ...InputColorStory, name: "Input Color" };
