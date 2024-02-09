import { Grid, Card, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "components/Loader";
import { useFormatTableData } from "hooks";
import { ReadTableToolbar } from "./ReadTableToolbar";
import { useRenderTableCell } from "hooks/useRenderTableCell";

const ReadOnlyTable = ({
  apiEndPoint,
  tableName,
  title,
  mdSize = 6,
  lgSize = 6,
  xlSize = 6,
}: {
  apiEndPoint: string;
  tableName: string;
  title: string;
  mdSize?: number;
  lgSize?: number;
  xlSize?: number;
}) => {
  const DataGridStyles = {
    //Remove cell selection border
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    ".MuiDataGrid-columnHeader": {
      background: "#444",
    },
    ".MuiDataGrid-iconSeparator, .MuiDataGrid-sortIcon, .MuiDataGrid-columnHeader, .MuiDataGrid-menuIcon,.MuiDataGrid-filterIcon,.MuiDataGrid-menuIconButton":
      {
        color: "#fff",
      },
    //  padding for the auto-height row cells
    "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "0.5rem" },
    "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "0.9375rem" },
    "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": { py: "1.375rem" },
    flex: "1 0 auto",
  };

  const tableData = useFormatTableData({
    apiEndPoint: apiEndPoint,
    tableName: tableName,
  });

  return tableData.isLoading ? (
    <Loader />
  ) : (
    <Grid item xs={12} sm={12} md={mdSize} lg={lgSize} xl={xlSize}>
      <Card>
        <CardHeader title={title} sx={{ backgroundColor: "#ededed" }} />
        <DataGrid
          getRowHeight={() => "auto"}
          slots={{ toolbar: () => <ReadTableToolbar />, cell: useRenderTableCell }}
          rows={tableData?.data?.rows}
          columns={tableData?.data?.columns}
          sx={DataGridStyles}
          hideFooterPagination
          rowSelection={false}
        />
      </Card>
    </Grid>
  );
};

export default ReadOnlyTable;
