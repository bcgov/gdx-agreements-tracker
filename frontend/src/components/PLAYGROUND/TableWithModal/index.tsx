import { LinearProgress } from "@mui/material";
import { useFormControls } from "hooks";
import FormModal from "../FormModal";
import { Table } from "../Table";
import { useFormatTableData } from "../Table/useFormatTable";
import InputForm from "../InputForm";
import { TableConfig } from "../Pages/ProjectsSandbox/TableConfig";

/* This is a functional component called `TableWithModal` that takes in an object with a `apiEndPoint`
property of type string as its only argument. It uses the `useFormControls` and `useFormatTableData`
hooks to manage state and fetch data from the API endpoint. It also uses the `TableConfig` function
to get the columns, initial state, and selected row for the table. */
const TableWithModal = ({ apiEndPoint }: { apiEndPoint: string }) => {
  const { handleClose, formType, open } = useFormControls();

  const { data, isLoading } = useFormatTableData({
    apiEndPoint: apiEndPoint,
  });

  const { tableColumns, initialState } = TableConfig();
  return isLoading ? (
    <LinearProgress />
  ) : (
    <>
      {/* <Table columns={tableColumns} rows={data.data.data} initialState={initialState} /> */}
      {/* TODO add this button back in future iteration. */}
      {/* <Button
        onClick={() => {
          handleOpen();
          handleEditMode(true);
          handleFormType("new");
        }}
        variant="contained"a
      >
        Add New
      </Button> */}
      <FormModal open={open} handleClose={handleClose}>
        {"new" === formType && <InputForm formType={formType} />}
        {/* {formType === "read" && <ReadForm fields={selectedRow} />} */}
        {"edit" === formType && <InputForm formType={formType} />}
      </FormModal>
    </>
  );
};

export default TableWithModal;
