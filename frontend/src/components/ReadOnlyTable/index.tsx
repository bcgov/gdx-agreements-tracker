import { Grid, Card, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "components/Loader";
import { useFormatTableData } from "hooks";

const ReadOnlyTable = ({
  apiEndPoint,
  tableName,
  title,
}: {
  apiEndPoint: string;
  tableName: string;
  title: string;
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
  };

  const tableData = useFormatTableData({
    apiEndPoint: apiEndPoint,
    tableName: tableName,
  });

  return tableData.isLoading ? (
    <Loader />
  ) : (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={12}>
      <Card>
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
