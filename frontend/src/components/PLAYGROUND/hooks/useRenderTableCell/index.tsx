import { Checkbox, Chip, Link } from "@mui/material";
import { GridCell, GridRenderCellParams } from "@mui/x-data-grid";
import { TableHealthChip } from "./TableHealthChip";

export const useRenderTableCell = (params: GridRenderCellParams) => {
  if ("boolean" === typeof params.value) {
    return (
      <GridCell {...params}>
        <Checkbox disabled checked={params.value} />
      </GridCell>
    );
  }

  if (
    params.value &&
    params.value.red !== undefined &&
    params.value.green !== undefined &&
    params.value.blue !== undefined
  ) {
    return (
      <GridCell {...params}>
        {" "}
        <TableHealthChip rgb={params.value} />
      </GridCell>
    );
  }

  return <GridCell {...params} />;
};
