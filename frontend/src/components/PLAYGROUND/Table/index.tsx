import { DataGrid } from "@mui/x-data-grid";
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = ({ columns, rows, initialState }: any) => {
  return (
    <>
      <DataGrid columns={columns} rows={rows} disableSelectionOnClick initialState={initialState} />
    </>
  );
};
