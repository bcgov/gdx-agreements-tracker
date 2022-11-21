import { Chip, styled } from "@mui/material";
import React from "react";

export const TableHealthChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "colors",
})(({ colors }: { colors: { red: number; green: number; blue: number } }) => {
  return {
    backgroundColor: `rgb(${colors.red},${colors.green},${colors.blue})`,
    fontWeight: "bold",
    width: "25%",
    height: "35%",
    border: "solid 3px #dbcad7",
    borderRadius: "4px",
  };
});
