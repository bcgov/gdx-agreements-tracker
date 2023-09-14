import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter as valueFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "init_date", headerName: "Initiation Date", valueFormatter, flex: defaultFlex },
    { field: "summary", headerName: "Summary", flex: defaultFlex },
    { field: "types", headerName: "Types", flex: defaultFlex },
    { field: "version", headerName: "Version", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "init_date", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
