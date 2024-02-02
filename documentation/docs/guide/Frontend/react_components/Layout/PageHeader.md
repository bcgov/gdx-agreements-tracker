# PageHeader

The `PageHeader` component is a React component that represents the header of a page. It utilizes the Material-UI (MUI) library for styling and includes features such as a menu toggle button, page title, and a sign-out button.

## Usage

The `PageHeader` component is designed to be used as the header at the top of a page. It takes a prop `handleDrawerToggle` to handle the toggle of the sidebar menu.

## Styling

The `PageHeader` component utilizes Material-UI `AppBar`, `Toolbar`, `IconButton`, and `Typography` components for its structure and styling. It has the following styling specifications:

- Background Color: `#fff`
- Width: Adjusted based on the presence of a sidebar menu (`calc(100% - ${drawerWidth}px)`)
- Margin Left: Adjusted based on the presence of a sidebar menu (`${drawerWidth}px`)
- Title Text Color: `#000`

## Default Behavior

The `PageHeader` component renders a responsive header with a menu toggle button, page title, and a sign-out button.

## Example

```jsx
import * as React from "react";
import { PageHeader } from "./PageHeader"; // Import the PageHeader component

function App() {
  const handleDrawerToggle = () => {
    // Handle the sidebar toggle logic here
  };

  return (
    <div>
      <PageHeader handleDrawerToggle={handleDrawerToggle} />
      {/* Your page content goes here */}
    </div>
  );
}

export default App;
