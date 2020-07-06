# 🔩 create-react-popup

> Use compound components to create popup components.

### Features

- Eases the creation of Popup components through the Compound Component pattern
- Uses React Portals to render the available Popups
- Creates a context on each Popup build to support multiple usage
- Has different positioning options

### Assumptions

This component might help you if your use case meets the following requirements:

- Each Popup always depends of a Content to show and a Trigger that shows that content
- Everything inside `Popup` will be rendered except `Popup.Content`, which will be in a Portal
- Then `Popup.Content` is anything that is rendered in an overlayed element (modal, tooltip, picker, etc)
- Both, the Trigger and the Content, are DOM elements of any kind
- The Popup component needs flexibility for complex structure and styles
- Each `Content` automatically closes itself whenever the use clicks outside of it

### Example

The next code shows the the flexibility to create multiple types of popups easily.

```jsx
import React from "react";
import createReactPopup from "create-react-popup";

const Popup = createReactPopup(); // This creates a new Popup with its own context

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

Then the Popup created could be used in your project as:

```jsx
function Example() {
  return (
    <div className="example">
      <p>The button below opens a simple popup saying "Hello there!"
      <HelloPopup />
    </div>
  );
}
```

#### `Popup`

Main wrapper of the behavior. The `position` means where to show the Content

#### `Popup.Content`

The element that will appear in a React portal

#### `Popup.Trigger`

The element that executes the opening of whatever the Content has
