# TableWithModal Component

The `TableWithModal` component renders a table with a modal dialog box. It uses hooks to manage state and fetch data from API endpoints.

## Props

- `tableConfig`: The configuration for the table.
- `formControls`: The controls for the form.
- `formConfig`: The configuration for the form.
- `tableName`: The name of the table.
- `tableDataApiEndPoint`: The API endpoint for the table data.
- `formDataApiEndpoint`: The API endpoint for the form data.
- `handleRowDoubleClick`: The function to call when a row is double-clicked.

## Hooks Used

- `useFormSubmit`: Manages form submission, including handling deletes.
- `useFormatTableData`: Formats table data from the API endpoint.

## Components Used

- `Table`: Renders the table component.
- `FormRenderer`: Renders the form component.
- `FormDialog`: Renders the modal dialog for the form.

## Usage

```jsx
import { LinearProgress } from "@mui/material";
import { IRowDoubleClickParams, ITableWithModal } from "types";
import { Table } from "../Table";
import { FormRenderer } from "components/Forms/FormRenderer";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormSubmit, useFormatTableData } from "hooks";
import FormDialog from "components/Forms/FormDialog";

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
        rows={tableData?.data?.rows}
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
