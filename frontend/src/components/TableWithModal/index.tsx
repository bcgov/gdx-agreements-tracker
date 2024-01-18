import { LinearProgress } from "@mui/material";
import { IRowDoubleClickParams, ITableWithModal } from "types";
import { Table } from "../Table";
import { FormRenderer } from "components/Forms/FormRenderer";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormSubmit, useFormatTableData } from "hooks";
import FormDialog from "components/Forms/FormDialog";

/* This is a functional component called `TableWithModal` that takes in an object with a `apiEndPoint`
property of type string as its only argument. It uses the `useFormControls` and `useFormatTableData`
hooks to manage state and fetch data from the API endpoint. It also uses the `TableConfig` function


to get the columns, initial state, and selected row for the table. */

export const TableWithModal = ({
  tableConfig,
  formControls,
  formConfig,
  tableName,
  tableDataApiEndPoint,
  formDataApiEndpoint,
  handleRowDoubleClick = (params: IRowDoubleClickParams) => {
    formControls.handleCurrentRowData(params.row);
    formControls.handleOpen();
  },
}: ITableWithModal) => {
  const { handleDelete } = useFormSubmit();

  const handleTableNewButton = () => {
    formControls.handleFormType("new");
    formControls.handleOpen();
  };

  const tableData = useFormatTableData({
    apiEndPoint: tableDataApiEndPoint,
    tableName,
  });

  const handleRowClick = (params: GridRowParams) => {
    formControls.handleCurrentRowData(params.row);
  };

  return tableData.isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Table
        rows={tableData?.data.rows}
        tableConfig={tableConfig}
        handleRowDoubleClick={handleRowDoubleClick}
        handleRowClick={handleRowClick}
        handleTableNewButton={handleTableNewButton}
      />
      <FormDialog
        open={formControls.open}
        handleClose={formControls.handleClose}
        deleteUrl={formConfig(formControls.currentRowData?.id).deleteUrl as string}
        handleDelete={handleDelete}
      >
        <FormRenderer
          formControls={formControls}
          tableName={tableName}
          formConfig={formConfig}
          formDataApiEndpoint={formDataApiEndpoint}
        />
      </FormDialog>
    </>
  );
};
