// /* This is a functional component called `TableWithModal` that takes in an object with a `apiEndPoint`
// property of type string as its only argument. It uses the `useFormControls` and `useFormatTableData`
// hooks to manage state and fetch data from the API endpoint. It also uses the `TableConfig` function
// to get the columns, initial state, and selected row for the table. */

// interface ITableWithModal {
//   tableData: { data: any, isLoading: boolean }
//   formFields?: {
//     initialValues: {}
//     readFields: {}[];
//     editFields: IEditField[];
//   },
//   tableConfig: {}
// }
// const TableWithModal = ({ tableData, formFields, tableConfig }: ITableWithModal) => {

//   return tableData.isLoading ? (
//     <LinearProgress />
//   ) : (
//     <>
//       <Table rows={tableData.data.data.data} tableConfig={tableConfig} />
//       <FormModal open={open} handleClose={handleClose}>
//         <div>e</div>
//       </FormModal>
//     </>
//   );
// };

// export default TableWithModal;
import { SetStateAction, useState } from "react";
import { Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback } from "react";

export const TableWithModal = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const handleClose = () => setSelectedRow(null);


  const handleCellClick = (params: any) => {
    setSelectedRow(params.row.id);
  };

  const getRowId = (row: any) => row.id;

  const getRowParams = useCallback(
    (params) => ({
      onClick: () => {
        if (params.field === 'id') {
          handleCellClick(params);
        }
      },
    }),
    [handleCellClick]
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={[]}
        columns={[]}
        getRowId={getRowId}
        getRowParams={getRowParams}
      />
      {selectedRow && (
        // <Modal handleClose={handleClose} selectedRow={selectedRow} />
        <div>3</div>
      )}
    </div>
  );
}