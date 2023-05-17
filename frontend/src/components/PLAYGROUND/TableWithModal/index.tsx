import { LinearProgress, Modal } from "@mui/material";
import {IRowDoubleClickParams, ITableWithModal } from "types";
import FormModal from "../FormModal";
import { Table } from "../Table";
import { FormRenderer } from "components/FormRenderer";


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
}: ITableWithModal) => {
  const { handleCurrentRowData, open, handleClose, handleOpen } = formControls;

  const handleRowDoubleClick = (params: IRowDoubleClickParams) => {
    handleCurrentRowData(params.row);
    handleOpen();
  };

  const { readFields, editFields, initialValues, rowsToLock, queryKey, postUrl, updateUrl } =
    formConfig(formData);

  return tableData.isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Table
        rows={tableData.data.data.data}
        tableConfig={tableConfig}
        handleRowDoubleClick={handleRowDoubleClick}
      />
      <FormModal open={open} handleClose={handleClose}>
        <FormRenderer
          queryKey={queryKey}
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
