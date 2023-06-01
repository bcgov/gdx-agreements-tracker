import { Chip } from "@mui/material";
import { Irgb } from "types";

export const TableHealthChip = ({ rgb }: Irgb) => {
  const { red, green, blue } = rgb;

  const chipStyles = {
    backgroundColor: `rgb(${red},${green},${blue})`,
    fontWeight: "bold",
    width: "25%",
    height: "35%",
    borderRadius: "4px",
  };

  return <Chip sx={chipStyles} />;
};
