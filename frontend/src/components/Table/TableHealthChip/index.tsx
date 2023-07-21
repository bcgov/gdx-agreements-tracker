import { Chip } from "@mui/material";
import { Irgb } from "types";

export const TableHealthChip = ({ rgb }: Irgb) => {
  const { red, green, blue, health_name } = rgb;

  const chipStyles = {
    backgroundColor: `rgb(${red},${green},${blue})`,
    fontWeight: "bold",
    height: "45%",
    border: "solid 1px red",
    borderRadius: "4px",
  };

  return <Chip sx={chipStyles} label={health_name} />;
};
