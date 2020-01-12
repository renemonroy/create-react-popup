# 🔩 create-react-popup

> An experimental use of compound components to create popup components.

### Features

- Eases the creation of Popup components through the Compound Component pattern
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

The next code shows the the flexibility to create multiple types of popups easily.

```jsx
import React from "react";
import createReactPopup from "create-react-popup";

const Popup = createReactPopup(); // This creates a context for this Popup

export default function HelloPopup() {
  return (
    <Popup position="trigger-bottom-left">
      {({ close }) => (
        <>
          {/* You can replace Fragment with whatever makes sense or add additional elements */}
          <Popup.Trigger>
            <button>Say Hello</button>
          </Popup.Trigger>
          <Popup.Content>
            <p>Hello there!</p>
          </Popup.Content>
        </>
      )}
    </Popup>
  );
}
```

#### `Popup`

Main wrapper of the behavior. The `position` means where to show the Content

#### `Popup.Content`

The element that will appear in a React portal

#### `Popup.Trigger` Anything that

The element that executes the opening of whatever the Content has
