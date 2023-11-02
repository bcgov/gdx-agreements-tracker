# ChipNav

The `ChipNav` component is a functional React component for rendering a navigation bar using chips. It accepts an array of navigation links and, optionally, a second array of right-aligned navigation links.

## Props

- `navLinks`: An array of `IChipNav` objects representing the primary navigation links.
- `navLinksRight`: An optional array of `IChipNav` objects representing right-aligned navigation links.

### `IChipNav` Object

Each object in the `navLinks` and `navLinksRight` arrays should adhere to the `IChipNav` interface, which typically includes the following properties:

- `key`: A unique key for the link.
- `url`: The URL to navigate to when the link is clicked.
- `name`: The label or text to display on the chip.

## Example Usage

```jsx
import * as React from "react";
import { ChipNav } from "./ChipNav"; // Import the ChipNav component

function MyComponent() {
  const primaryNavLinks = [
    { key: "link1", url: "/page1", name: "Page 1" },
    { key: "link2", url: "/page2", name: "Page 2" },
  ];

  const rightNavLinks = [
    { key: "profile", url: "/profile", name: "Profile" },
  ];

  return (
    <ChipNav navLinks={primaryNavLinks} navLinksRight={rightNavLinks} />
  );
}

export default MyComponent;
