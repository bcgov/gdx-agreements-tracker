import { LinearProgress } from "@mui/material";
import { IRowDoubleClickParams, ITableWithModal } from "types";
import FormModal from "../FormModal";
import { Table } from "../Table";
import { FormRenderer } from "components/FormRenderer";
import { GridRowParams } from "@mui/x-data-grid";

/* This is a functional component called `TableWithModal` that takes in an object with a `apiEndPoint`
property of type string as its only argument. It uses the `useFormControls` and `useFormatTableData`
hooks to manage state and fetch data from the API endpoint. It also uses the `TableConfig` function


to get the columns, initial state, and selected row for the table. */

export const TableWithModal = ({
  tableData,
  tableConfig,
  formControls,
  formConfig,
  formData,
  tableName,
}: ITableWithModal) => {
  const { handleCurrentRowData, open, handleClose, handleOpen } = formControls;

  const handleRowDoubleClick = (params: IRowDoubleClickParams) => {
    handleCurrentRowData(params.row);
    handleOpen();
  };

  const handleRowClick = (params: GridRowParams) => {
    handleCurrentRowData(params.row)
  }

  const { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl } =
    formConfig(formData);

  return tableData.isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Table
        rows={tableData.data ? tableData.data.data.data : []}
        tableConfig={tableConfig}
        handleRowDoubleClick={handleRowDoubleClick}
        handleRowClick={handleRowClick}
      />
      <FormModal open={open} handleClose={handleClose}>
        <FormRenderer
          tableName={tableName}
          readFields={readFields}
          editFields={editFields}
          postUrl={postUrl}
          updateUrl={updateUrl}
          query={formData}
          rowsToLock={rowsToLock}
        />
      </FormModal>
    </>
  );
};
