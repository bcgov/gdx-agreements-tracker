# TableHealthChip Component

The `TableHealthChip` component is a styled Chip component from MUI. It is used to display health status indicators in a table, such as colors indicating the status of a row or item.

## Props

- `colors`: An object containing the RGB values for the chip's background color. It should have the format `{ red: number, green: number, blue: number }`.

## Usage

```javascript
import React from "react";
import { TableHealthChip } from "./TableHealthChip";

const MyComponent = () => {
  const healthColors = { red: 255, green: 0, blue: 0 }; // Example RGB values for red color
  return (
    <div>
      <TableHealthChip colors={healthColors} label="Health Status" />
    </div>
  );
};
