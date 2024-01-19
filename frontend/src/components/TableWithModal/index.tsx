import { LinearProgress } from "@mui/material";
import { IRowDoubleClickParams, ITableWithModal } from "types";
import { Table } from "../Table";
import { FormRenderer } from "components/Forms/FormRenderer";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormSubmit, useFormatTableData } from "hooks";
import FormDialog from "components/Forms/FormDialog";

/**
 * A component that renders a table with a modal dialog box.
 *
 * This component uses the `useFormControls` and `useFormatTableData` hooks
 * hooks to manage state and fetch data from the API endpoint.
 * It also uses the `TableConfig` function to get the columns,
 * initial state, and selected row for the table.
 *
 * @param   {object}      props                      - The properties passed to this component.
 * @param   {object}      props.tableConfig          - The configuration for the table.
 * @param   {object}      props.formControls         - The controls for the form.
 * @param   {Function}    props.formConfig           - The configuration for the form.
 * @param   {string}      props.tableName            - The name of the table.
 * @param   {string}      props.tableDataApiEndPoint - The API endpoint for the table data.
 * @param   {string}      props.formDataApiEndpoint  - The API endpoint for the form data.
 * @param   {Function}    props.handleRowDoubleClick - The function to call when a row is double-clicked.
 * @returns {JSX.Element}                            - The rendered component.
 */
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
}: ITableWithModal): JSX.Element => {
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

  const deleteUrl = tableData.isLoading
    ? formConfig(formControls.currentRowData?.id)?.deleteUrl
    : "";

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
        deleteUrl={deleteUrl as string}
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
