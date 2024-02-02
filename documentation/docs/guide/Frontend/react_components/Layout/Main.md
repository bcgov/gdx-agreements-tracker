# Main

The `Main` component is a React component that renders the main content of the application. It uses the React Router to switch between different pages based on the URL. It also handles the authentication and authorization logic using Keycloak.

## Usage

The `Main` component is used to render the main content of the application. It uses the React Router to switch between different pages based on the URL. It also handles the authentication and authorization logic using Keycloak. The component does not take any props as input. The function returns a JSX element representing the main content of the application. The `Main` component is exported and can be imported into other files where it can be used as a building block for creating more complex components.

## Styling

The `Main` component utilizes Material-UI `Box`, `PageHeader`, `Sidebar`, `Outlet`, and `PageFooter` components for its structure and styling. It has the following styling specifications:

- The `Box` component is used to create a container that holds the header, sidebar, main content, and footer.
- The `PageHeader` component is used to create the header, which includes a title and a hamburger menu button that toggles the sidebar.
- The `Sidebar` component is used to create the sidebar, which contains a list of links to different pages.
- The `Outlet` component is used to render the content of the current page.
- The `PageFooter` component is used to create the footer.
- The `useDrawer` hook is used to manage the state of the sidebar.
- The `drawerWidth` variable is used to set the width of the sidebar.
- The `sx` prop is used to apply styles to the `Box` component. The `flexGrow`, `p`, `flex`, `display`, `flexDirection`, `boxSizing`, `width`, `ml`, and `mt` properties are used to control the layout and spacing of the main content.
- The `component` property is used to specify the type of HTML element that the `Box` component should render as. The `sx` prop is also used to apply styles to the `Box` component that contains the main content.

## Default Behavior

Regarding the default behavior of the `Main` component, it is a functional component and does not have any lifecycle methods. Therefore, it does not have any default behavior that can be overridden. The component simply renders the main content of the application as described above. If you want to modify the behavior of the component, you will need to modify the code of the component itself.

## Example

```jsx
import * as React from "react";
import { Main } from "./components/Main"; // Import the Main component

function App() {
  return (
    <div>
      {/* Your page content goes here */}
      <Main />
    </div>
  );
}

export default App;
```

##### For a current in-use example, see: [/routes/index.tsx](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/routes/index.tsx)
