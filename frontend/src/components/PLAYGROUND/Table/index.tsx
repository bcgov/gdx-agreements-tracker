import { DataGrid } from "@mui/x-data-grid";
import { TableConfig } from "../Pages/ProjectsSandbox/TableConfig";
import { useFormatTableData } from "./useFormatTable";
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = ({ apiEndPoint }: { apiEndPoint: string }) => {
  const { data, isLoading } = useFormatTableData({
    apiEndPoint: apiEndPoint,
  });
  const { tableColumns, initialState } = TableConfig();

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <DataGrid
          columns={tableColumns}
          rows={data.data.data}
          disableSelectionOnClick
          initialState={initialState}
        />
      )}
    </>
  );
};
