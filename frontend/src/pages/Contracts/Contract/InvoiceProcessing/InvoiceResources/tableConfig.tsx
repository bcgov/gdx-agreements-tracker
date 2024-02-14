import { GridColDef } from "@mui/x-data-grid";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "resource_assignment", headerName: "Resource Assignment", flex: defaultFlex },
    { field: "hours", headerName: "Hours", flex: defaultFlex },
    { field: "rate", headerName: "Rate", flex: defaultFlex, sortComparator: sortComparatorByCurrency(), },
    { field: "amount", headerName: "Amount", flex: defaultFlex, sortComparator: sortComparatorByCurrency(), },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "resource_assignment", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
