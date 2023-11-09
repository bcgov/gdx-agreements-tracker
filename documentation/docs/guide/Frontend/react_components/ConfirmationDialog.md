# Confirmation Dialog

The `ConfirmationDialog` component is a reusable React component designed to display a confirmation dialog with customizable title and body text. It utilizes the Material-UI (MUI) library for styling and interaction.

## Usage

The `ConfirmationDialog` component is used to prompt the user for confirmation before taking a specific action. It takes the following props:

- `handleConfirm`: A function that will be called when the user confirms the action.
- `title`: A string that represents the title of the confirmation dialog.
- `body`: A string that represents the body text or description of the confirmation dialog.

## Styling

The `ConfirmationDialog` component utilizes Material-UI `Dialog`, `DialogContent`, `DialogContentText`, `DialogTitle`, and `DialogActions` components for its structure and interaction. It also leverages Material-UI `Button` components for confirmation and cancellation actions.

- The confirmation button is styled with the color `success` and an outlined variant, displaying a check circle icon.
- The cancellation button is styled with the color `error` and an outlined variant, displaying a cancel icon.
- The dialog is associated with the primary color defined in the Material-UI theme.

## Default Behavior

The `ConfirmationDialog` component is closed by default. It can be triggered to open programmatically by calling the `openDialog` method through the component's ref.

## Example

```jsx
import * as React from "react";
import { ConfirmationDialog } from "./ConfirmationDialog"; // Import the ConfirmationDialog component

function App() {
  const confirmationDialogRef = React.useRef();

  const handleConfirmation = () => {
    // Handle the confirmation logic here
  };

  return (
    <div>
      <button
        onClick={() => confirmationDialogRef.current.openDialog()}
      >
        Show Confirmation Dialog
      </button>
      <ConfirmationDialog
        ref={confirmationDialogRef}
        handleConfirm={handleConfirmation}
        title="Confirmation Required"
        body="Are you sure you want to proceed?"
      />
    </div>
  );
}

export default App;
