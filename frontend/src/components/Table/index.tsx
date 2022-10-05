import React, { useState } from "react";
import { DataGrid, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { Box, styled } from "@mui/material";
import { ITable } from "../../types";
import TableFooter from "./TableFooter";

const StyledBox = styled(Box)({
  overflowX: "scroll",
  height: "80vh",
  width: "100%",
});

export const Table = ({ columns, rows, loading, onRowClick }: ITable) => {
  const [total, setTotal] = useState(0);

  const index = columns.findIndex((object) => {
    return object.field === "invoice_total";
  });

  return (
    <StyledBox>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        paginationMode={"server"}
        hideFooter={!totalColumns || 0 === totalColumns.length}
        disableExtendRowFullWidth={true}
        sx={(theme) => ({
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: allowEdit ? theme.palette.primary.main : "#606060",
            color: theme.palette.primary.contrastText,
          },
          "& .MuiDataGrid-menuIconButton": {
            color: theme.palette.primary.contrastText,
          },
        })}
        onRowClick={onRowClick as GridEventListener<GridEvents.rowClick>}
        components={{
          Footer: () => {
            return <TableFooter total={total} index1={index} columns={columns} />;
          },
        }}
        onStateChange={(state) => {
          const visibleRows = state.filter.visibleRowsLookup;
          let visibleItems: number[] = [];
          for (const [id, value] of Object.entries(visibleRows)) {
            if (value === true) {
              visibleItems.push(+id);
            }
          }
          console.log(visibleItems);
          const res = rows.filter((item) => visibleItems.includes(item.id));
          const total = res.map((item) => item.invoice_total).reduce((a, b) => a + b, 0);
          console.log(total);
          setTotal(total);
        }}
      />
    </StyledBox>
  );
};
