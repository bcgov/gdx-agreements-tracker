import { LinearProgress } from "@mui/material";
import { IRowDoubleClickParams, ITableWithModal } from "types";
import FormModal from "../FormModal";
import { Table } from "../Table";
import { FormRenderer } from "components/FormRenderer";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormControls } from "hooks";

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
  // const { handleCurrentRowData, open, handleClose, handleOpen, handleFormType } = formControls;
  useFormControls();
  const handleTableNewButton = () => {
    formControls.handleFormType("new");
    formControls.handleOpen();
  };

  const handleRowDoubleClick = (params: IRowDoubleClickParams) => {
    formControls.handleCurrentRowData(params.row);
    formControls.handleOpen();
  };

  const handleRowClick = (params: GridRowParams) => {
    formControls.handleCurrentRowData(params.row);
  };

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
        handleTableNewButton={handleTableNewButton}
      />
      <FormModal open={formControls.open}>
        <FormRenderer
          formControls={formControls}
          tableName={tableName}
          readFields={readFields}
          editFields={editFields}
          postUrl={postUrl}
          updateUrl={updateUrl}
          query={formData}
          rowsToLock={rowsToLock}
          initialValues={initialValues}
        />
      </FormModal>
    </>
  );
};
