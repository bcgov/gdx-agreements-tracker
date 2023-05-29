import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";


export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "resource_assignment", headerName: "resource_assignment", flex: defaultFlex },
    { field: "hours", headerName: "hours", flex: defaultFlex },
    { field: "rate", headerName: "rate", flex: defaultFlex },
    { field: "amount", headerName: "amount", flex: defaultFlex },
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
