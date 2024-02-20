# TotalsDisplay Component

The `TotalsDisplay` component renders a display for total values based on the data provided.

## Props

- `totals`: An object containing total values for different categories.

## Usage

```jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export const TotalsDisplay = ({ totals }) => {
  return (
    <Box>
      <Typography variant="h6">Totals</Typography>
      <Box>
        {Object.entries(totals).map(([category, total]) => (
          <Typography key={category}>
            {category}: {total}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
