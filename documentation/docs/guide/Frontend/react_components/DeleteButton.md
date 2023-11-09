# DeleteButton

The `DeleteButton` component is a custom React component that provides a delete button with integrated confirmation dialog functionality. It utilizes the Material-UI (MUI) library for styling and interaction.

## Usage

The `DeleteButton` component is designed to handle delete actions with an integrated confirmation dialog. It extends the Material-UI `Button` component and takes the following props:

- `handleDelete`: A function that will be called when the user confirms the delete action.
- Other props: All other props from the Material-UI `Button` component, excluding `onClick` and `endIcon`.

## Styling

The `DeleteButton` component utilizes Material-UI `Button` component for its structure and styling. It has the following styling specifications:

- Color: `error`
- Variant: `contained`
- Icon: Delete icon from Material-UI

## Default Behavior

When the user clicks the delete button, a confirmation dialog will be displayed asking, "Are you sure you want to delete?" The user can confirm or cancel the delete action through the dialog.

## Example

```jsx
import * as React from "react";
import { DeleteButton } from "./DeleteButton"; // Import the DeleteButton component

function App() {
  const handleDelete = () => {
    // Handle the delete logic here
  };

  return (
    <div>
      <DeleteButton handleDelete={handleDelete} />
    </div>
  );
}

export default App;
