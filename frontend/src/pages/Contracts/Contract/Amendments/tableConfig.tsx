import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "amendment_number", headerName: "Amendment Number", flex: defaultFlex },
    {
      field: "amendment_date",
      headerName: "Amendment Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "amendment_types", headerName: "Amendment Type", flex: defaultFlex },
    { field: "description", headerName: "Description", flex: defaultFlex },
  ];

  return { tableColumns };
};
