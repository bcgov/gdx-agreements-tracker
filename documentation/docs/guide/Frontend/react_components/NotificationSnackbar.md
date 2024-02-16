# Notification Snackbar

The `NotificationSnackBar` component is a React component that displays a snackbar with an alert message and a color based on the severity. It utilizes the Material-UI (MUI) library for styling and includes features such as auto-hide duration, on-close callback, and responsive width.

## Usage

The `NotificationSnackBar` component is designed to display a snackbar with an alert message and a color based on the severity. It takes the following props:

- `snackbarMessage`: A string representing the message to display in the alert.
- `snackbarOpen`: A boolean indicating whether the snackbar is open or not.
- `snackbarType`: A string representing the severity of the alert, which can be one of `"error"`, `"warning"`, `"info"`, or `"success"`.
- `handleSnackbar`: A function that takes a boolean parameter and handles the snackbar open state.

## Styling

The `NotificationSnackBar` component utilizes Material-UI `Snackbar`, `Alert`, and `sx` components for its structure and styling. It has the following styling specifications:

- Snackbar: Auto-hide duration of 2000 milliseconds, and on-close callback that calls the `handleSnackbar` function with `false` as the argument.
- Alert: Filled variant, severity based on the `snackbarType` prop, and width of 100%.

## Default Behavior

The `NotificationSnackBar` component renders a snackbar with an alert message and a color based on the severity, and hides itself after 2000 milliseconds or when the user clicks on the close icon.

## Example

```jsx
import * as React from "react";
import { NotificationSnackBar } from "./NotificationSnackBar"; // Import the NotificationSnackBar component

function App() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false); // State for snackbar open
  const [snackbarMessage, setSnackbarMessage] = React.useState(""); // State for snackbar message
  const [snackbarType, setSnackbarType] = React.useState("info"); // State for snackbar type

  const handleSnackbar = (status) => {
    setSnackbarOpen(status); // Set the snackbar open state
  };

  const handleClick = () => {
    setSnackbarMessage("Hello, world!"); // Set the snackbar message
    setSnackbarType("success"); // Set the snackbar type
    setSnackbarOpen(true); // Open the snackbar
  };

  return (
    <div>
      <button onClick={handleClick}>Show Snackbar</button>
      <NotificationSnackBar
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
        snackbarType={snackbarType}
        handleSnackbar={handleSnackbar}
      />
    </div>
  );
}

export default App;
```
