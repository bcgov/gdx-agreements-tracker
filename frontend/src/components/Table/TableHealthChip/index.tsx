import { Chip } from "@mui/material";
import { Irgb } from "types";

export const TableHealthChip = ({ rgb }: Irgb) => {
  const { red, green, blue, health_name } = rgb;

  const chipStyles = {
    backgroundColor: `rgb(${red},${green},${blue})`,
    fontWeight: "bold",
    border: "solid 1px red",
    borderRadius: "4px",
    maxHeight: "1.6rem", // make them square in spite of the auto-height on the row cells.
  };

  return <Chip sx={chipStyles} label={health_name} />;
};
