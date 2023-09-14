import { GridColDef } from "@mui/x-data-grid";
import { dateFormatter as valueFormatter } from "utils/formatDate";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "resource", headerName: "Resource", flex: defaultFlex },
    { field: "assignment_role", headerName: "Assignment Role", flex: defaultFlex },
    { field: "supplier_rate", headerName: "Supplier Rate", flex: defaultFlex },
    { field: "assignment_rate", headerName: "Assignment Rate", flex: defaultFlex },
    { field: "hours", headerName: "Hours", flex: defaultFlex },
    { field: "fees_for_resource", headerName: "Fees For Resource", flex: defaultFlex },
    { field: "start_date", headerName: "Start Date", valueFormatter, flex: defaultFlex },
    { field: "end_date", headerName: "End Date", valueFormatter, flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "fiscal", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
