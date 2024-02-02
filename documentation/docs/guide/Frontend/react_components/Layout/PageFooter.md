# PageFooter

The `PageFooter` component is a React component that represents the footer of a page. It utilizes the Material-UI (MUI) library for styling and includes information such as the version number.

## Usage

The `PageFooter` component is designed to be used as the footer at the bottom of a page. It includes the version number from the `package.json` file. It does not take any additional props.

## Styling

The `PageFooter` component utilizes Material-UI `AppBar` and `Typography` components for its structure and styling. It has the following styling specifications:

- Position: Fixed at the bottom of the page.
- Background Color: `#fff`
- Text Color: `#000`
- Height: `35px`
- Typography Styles: Text aligned to the right, with a margin set to "auto" and a width of "99vw".

## Default Behavior

The `PageFooter` component renders a fixed-positioned footer at the bottom of the page, displaying the version number.

## Example

```jsx
import * as React from "react";
import { PageFooter } from "./PageFooter"; // Import the PageFooter component

function App() {
  return (
    <div>
      {/* Your page content goes here */}
      <PageFooter />
    </div>
  );
}

export default App;
