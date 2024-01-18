import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "version", headerName: "Version", flex: defaultFlex },
    {
      field: "init_date",
      headerName: "Initiation Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "types", headerName: "Types", flex: defaultFlex },
    { field: "summary", headerName: "Summary", flex: defaultFlex },
  ];

  return { tableColumns };
};
