import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useFormatTableData } from "hooks";
import { useParams } from "react-router-dom";
import { Loader } from "components";
import { red } from "@mui/material/colors";
import bcgovTheme from "bcgovTheme";

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

  const headerTitleStyles = {
    color: bcgovTheme.palette.primary.main,
    fontWeight: "bold",
  };

  return tableData.isLoading || tableDataByFiscal.isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        {tableData?.data?.rows?.map((row: { [key: string]: string }, index: number) => {
          return (
            <Card key={index}>
              <CardHeader
                avatar={<Typography sx={headerTitleStyles}>Totals</Typography>}
                sx={{ backgroundColor: "#ededed" }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  {Object.keys(row).map((key) => (
                    <Grid item xs={12} key={key}>
                      <Typography variant="subtitle2">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (str) => str.toUpperCase())}:
                      </Typography>
                      <Typography sx={{fontWeight:"bold"}} variant="subtitle2">{row[key]}</Typography>
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
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card>
          <CardHeader
            avatar={<Typography sx={headerTitleStyles}>Totals by Fiscal</Typography>}
            sx={{ backgroundColor: "#ededed" }}
          />
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
