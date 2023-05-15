import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = ({ rows, tableConfig, handleRowDoubleClick }: any) => {
  const { tableColumns, initialState } = tableConfig;
  const StyledBox = styled(Box)({
    overflowX: "scroll",
    maxHeight: "80vh",
    width: "100%",
  });

  const StyledDataGrid = styled(DataGrid)(() => ({
    //Remove cell selection border
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  }));

  return (
    <StyledBox>
      {rows && (
        <StyledDataGrid
          autoHeight
          columns={tableColumns}
          rows={rows}
          initialState={initialState}
          onRowDoubleClick={handleRowDoubleClick}
        />
      )}
    </StyledBox>
  );
};
