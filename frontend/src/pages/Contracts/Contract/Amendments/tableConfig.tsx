import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "contract", headerName: "Amendment Number", flex: defaultFlex },
    {
      field: "amendment_date",
      headerName: "Amendment Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
    },
    { field: "amendment_type", headerName: "Amendment Type", flex: defaultFlex },
    { field: "description", headerName: "Description", flex: defaultFlex },
  ];

  return { tableColumns };
};
