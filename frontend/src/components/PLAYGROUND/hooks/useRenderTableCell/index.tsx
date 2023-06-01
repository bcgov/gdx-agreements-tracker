import { Checkbox, Link } from "@mui/material";
import { GridCell, GridRenderCellParams } from "@mui/x-data-grid";

export const useRenderTableCell = (params: GridRenderCellParams) => {
  if (true === params.value || false === params.value) {
    return (
      <GridCell {...params}>
        <Checkbox disabled checked={params.value} />
      </GridCell>
    );
  }
  return <GridCell {...params} />;
};
