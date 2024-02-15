import { GridColDef } from "@mui/x-data-grid";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "deliverable_name", headerName: "Deliverable Name", flex: defaultFlex },
    { field: "type", headerName: "Type", flex: defaultFlex },
    {
      field: "amount",
      headerName: "Amount",
      flex: defaultFlex,
      sortComparator: sortComparatorByCurrency(),
    },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "deliverable_name", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
