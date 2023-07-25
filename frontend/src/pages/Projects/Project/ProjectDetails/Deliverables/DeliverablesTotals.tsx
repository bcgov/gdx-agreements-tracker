import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useFormatTableData } from "hooks";
import { useParams } from "react-router-dom";
import { Loader } from "components";

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

/**
 * Renders a component that displays project deliverables totals and totals by fiscal year.
 *
 * @component
 * @returns {JSX.Element} JSX element representing the component.
 */

const DeliverablesTotals = (): JSX.Element => {
  const { projectId } = useParams();

  const tableDataByFiscal = useFormatTableData({
    apiEndPoint: `/projects/${projectId}/deliverables/totalsByFiscal`,
    tableName: "",
  });

  const tableData = useFormatTableData({
    apiEndPoint: `/projects/${projectId}/deliverables/totals`,
    tableName: "",
  });

  return tableData.isLoading || tableDataByFiscal.isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={12}>
        {tableData?.data?.rows?.map((row: { [key: string]: string }, index: number) => {
          return (
            <Card key={index}>
              <CardHeader title="Totals" sx={{ backgroundColor: "#ededed" }} />
              <CardContent>
                <Grid container spacing={2}>
                  {Object.keys(row).map((key) => (
                    <Grid item xs={12} key={key}>
                      <Typography variant="subtitle1" component="div">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (str) => str.toUpperCase())}
                      </Typography>
                      <Typography variant="h6" component="div">
                        {row[key]}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
      <Box
        sx={{
          height: "5vh",
        }}
      />
      <Grid item xs={12} sm={12} md={6} lg={6} xl={12}>
        <Card>
          <CardHeader title="Totals By Fiscal" sx={{ backgroundColor: "#ededed" }} />
          <DataGrid
            columnVisibilityModel={{
              id: false,
            }}
            rows={tableDataByFiscal?.data?.rows}
            columns={tableDataByFiscal?.data?.columns}
            columnBuffer={0}
            sx={DataGridStyles}
            hideFooterPagination
            rowSelection={false}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DeliverablesTotals;
