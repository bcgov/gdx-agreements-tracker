import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = ({ columns, rows, tableConfig }: any) => {


  const { tableColumns, initialState, selectedRow } = tableConfig
  console.log('tableColumns', tableColumns)
  const StyledBox = styled(Box)({
    overflowX: "scroll",
    maxHeight: "80vh",
    width: "100%",
  });
  return (
    <StyledBox>
      <DataGrid
       autoHeight
        columns={tableColumns}
        rows={rows}
        initialState={initialState}
      />
    </StyledBox>
  );
};
