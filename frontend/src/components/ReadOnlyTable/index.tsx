// HOOKS
import { useFormatTableData, useRenderTableCell } from "hooks";

// COMPONENTS
import { Loader } from "components/Loader";
import { ReadTableToolbar } from "./ReadTableToolbar";
import { Grid, Card, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// TYPES
import { IReadOnlyTableProps } from "types";

// STYLES
const styles = {
  dataGrid: {
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
  },
  cardHeader: {
    backgroundColor: "#ededed",
  },
};

/**
 * This component displays a table of data from an API endpoint with a specified title and size.
 *
 * @param   {object}      props             - The props of the component.
 * @param   {string}      props.apiEndPoint - The API endpoint to fetch the data from.
 * @param   {string}      props.tableName   - The name of the table to display in the toolbar.
 * @param   {string}      props.title       - The title of the table to display in the card header.
 * @param   {number}      props.mdSize      - The grid size for medium screens.
 * @param   {number}      props.lgSize      - The grid size for large screens.
 * @param   {number}      props.xlSize      - The grid size for extra-large screens.
 * @returns {JSX.Element}                   The ReadOnlyTable component.
 */
const ReadOnlyTable = ({
  apiEndPoint,
  tableName,
  title,
  mdSize = 6,
  lgSize = 6,
  xlSize = 6,
}: IReadOnlyTableProps) => {
  const tableData = useFormatTableData({
    apiEndPoint: apiEndPoint,
    tableName: tableName,
  });

  return tableData.isLoading ? (
    <Loader />
  ) : (
    <Grid item xs={12} sm={12} md={mdSize} lg={lgSize} xl={xlSize}>
      <Card>
        <CardHeader title={title} sx={styles.cardHeader} />
        <DataGrid
          getRowHeight={() => "auto"}
          slots={{ toolbar: () => <ReadTableToolbar />, cell: useRenderTableCell }}
          rows={tableData?.data?.rows}
          columns={tableData?.data?.columns}
          sx={styles.dataGrid}
          hideFooterPagination
          rowSelection={false}
        />
      </Card>
    </Grid>
  );
};

export default ReadOnlyTable;
