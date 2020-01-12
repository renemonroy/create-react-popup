# 🔩 create-react-popup

> An experimental use of compound components to create popup components.

### Features

- Eases the creation of Popup components through a compound pattern
- Uses React Portals to render the available Popups
- Creates a context on each Popup build to support multiple usage
- Has different positioning options

### Assumptions

This component might help you if your use case meets the following requirements:

- A Popup is anything that is rendered in an overlayed element (modal, tooltip, picker, etc)
- Each Popup always depends of a Content to show and a Trigger that shows that content
- Both, the Trigger and the Content, are elements that can be anything
- Each Popup Content automatically closes itself whenever the use clicks outside of it
- The Popup component needs flexibility for complex structure and styles

### Example

This is a simple example of how it works:

```jsx
import React from "react";
import { BlockPicker } from "react-color"; // Let's use this NPM package as content
import createReactPopup from "create-react-popup";

const ColorPopup = createReactPopup(); // This creates a context for this Popup

export default function InputColor({ color: defaultColor }) {
  const [color, setValue] = React.useColor(defaultColor);

  React.useEffect(() => {
    setValue(defaultColor);
  }, [defaultColor]); // Restart the color whenever the prop changes

  return (
    <ColorPopup position="trigger-bottom-left">
      {({ close }) => (
        <React.Fragment>
          {/* You can replace Fragment with whatever makes more sense */}
          <ColorPopup.Trigger>
            <input
              type="text"
              placeholder={defaultColor}
              value={color}
              readonly
            />
          </ColorPopup.Trigger>
          <ColorPopup.Content>
            <BlockPicker
              color={value}
              onChangeComplete={color => {
                setValue(color.hex);
                close(); // not required when clicking outside
              }}
              triangle="hide"
            />
          </ColorPopup.Content>
        </React.Fragment>
      )}
    </ColorPopup>
  );
}
```

### `Popup`

Main wrapper of the behavior. The `position` means where to show the Content

### `Popup.Content`

The element that will appear in a React portal

### `Popup.Trigger` Anything that

The element that executes the opening of whatever the Content has
