import { Grid, Card, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "components/Loader";
import { useFormatTableData } from "hooks";

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
    height: "400px",
  };

  const tableData = useFormatTableData({
    apiEndPoint: apiEndPoint,
    tableName: tableName,
  });

  return tableData.isLoading ? (
    <Loader />
  ) : (
    <Grid item xs={12} sm={12} md={mdSize} lg={lgSize} xl={xlSize}>
      <Card sx={{ height: "400px" }}>
        <CardHeader title={title} sx={{ backgroundColor: "#ededed" }} />
        <DataGrid
          columnVisibilityModel={{
            id: false,
          }}
          rows={tableData?.data?.rows}
          columns={tableData?.data?.columns}
          columnBuffer={0}
          sx={DataGridStyles}
          hideFooterPagination
          rowSelection={false}
        />
      </Card>
    </Grid>
  );
};

export default ReadOnlyTable;
