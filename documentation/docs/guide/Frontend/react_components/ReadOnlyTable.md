# ReadOnlyTable

The `ReadOnlyTable` is a React component that fetches and displays data in a table format from a specified API endpoint. It leverages the Material-UI (MUI) library for its styling and includes features such as a custom toolbar, cell rendering, and a responsive grid layout.

## Usage

The `ReadOnlyTable` component is designed to display a table of data from an API endpoint with a specified title and size. It accepts the following props:

- `apiEndPoint`: A string that represents the API endpoint from which the data is fetched.
- `tableName`: A string that represents the name of the table to be displayed in the toolbar.
- `title`: A string that represents the title of the table to be displayed in the card header.
- `mdSize`, `lgSize`, `xlSize`: Optional numbers that represent the grid size for medium, large, and extra-large screens respectively. Each defaults to 6 if not provided.

## Styling

The `ReadOnlyTable` component uses Material-UI's `Grid`, `Card`, `CardHeader`, `sx`, and `DataGrid` components for its structure and styling. It has the following styling specifications:

- Grid: Implements a responsive grid layout based on the `mdSize`, `lgSize`, and `xlSize` props.
- Card: Encapsulates the table and the card header.
- CardHeader: Displays the `title` prop with a background color of `#ededed`.
- DataGrid: Displays the data fetched from the `apiEndPoint` prop with the following customizations:
  - Toolbar: Utilizes the `ReadTableToolbar` component to display the `tableName` prop and a search box.
  - Cell: Uses the `useRenderTableCell` hook to render the cell content based on the data type.
  - Styles: Overrides the default styles of the data grid, such as removing the cell selection border, changing the color of the icons and headers, and adjusting the padding of the cells.

## Default Behavior

The `ReadOnlyTable` component, by default, renders a grid item containing a card with a table of data fetched from the `apiEndPoint` prop. It also displays a custom toolbar with the `tableName` prop and a search box, and renders the cell content based on the data type. The footer pagination and the row selection are hidden.

## Example

```jsx
import React from "react";
import ReadOnlyTable from "./ReadOnlyTable"; // Import the ReadOnlyTable component

function App() {
  return (
    <div>
      <ReadOnlyTable
        apiEndPoint="/api/users"
        tableName="Users"
        title="User List"
        mdSize={8}
        lgSize={8}
        xlSize={8}
      />
    </div>
  );
}

export default App;
```
