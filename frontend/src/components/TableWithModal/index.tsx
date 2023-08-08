import { LinearProgress } from "@mui/material";
import { IRowDoubleClickParams, ITableWithModal } from "types";
import FormModal from "../Forms/FormModal";
import { Table } from "../Table";
import { FormRenderer } from "components/Forms/FormRenderer";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormControls, useFormatTableData } from "hooks";

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
  // const { handleCurrentRowData, open, handleClose, handleOpen, handleFormType } = formControls;
  useFormControls();
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
      <FormModal open={formControls.open}>
        <FormRenderer
          formControls={formControls}
          tableName={tableName}
          formConfig={formConfig}
          formDataApiEndpoint={formDataApiEndpoint}
        />
      </FormModal>
    </>
  );
};
