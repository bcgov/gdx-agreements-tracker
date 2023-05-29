import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "resource_assignment", headerName: "Resource Assignment", flex: defaultFlex },
    { field: "hours", headerName: "Hours", flex: defaultFlex },
    { field: "rate", headerName: "Rate", flex: defaultFlex },
    { field: "amount", headerName: "Amount", flex: defaultFlex },
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
