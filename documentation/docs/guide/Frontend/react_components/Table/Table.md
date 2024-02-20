# Table

The `Table` component displays tabular data using the MUI DataGrid component. It allows for customization of columns, row selection, and provides a toolbar for actions such as adding new items.

## Props

- `rows`: An array of objects representing the data rows to be displayed in the table.
- `tableConfig`: An object containing configuration for the table, including `tableColumns` and `initialState`.
- `handleRowDoubleClick`: A function to handle double-click events on table rows.
- `handleRowClick` (optional): A function to handle single-click events on table rows.
- `handleTableNewButton`: A function to handle the click event on the "New" button in the table toolbar.

## Usage

```javascript
import React from "react";
import { Table } from "./Table";

const MyComponent = ({ rows, tableConfig, handleRowDoubleClick, handleRowClick, handleTableNewButton }) => {
  return (
    <div>
      <Table
        rows={rows}
        tableConfig={tableConfig}
        handleRowDoubleClick={handleRowDoubleClick}
        handleRowClick={handleRowClick}
        handleTableNewButton={handleTableNewButton}
      />
    </div>
  );
};
