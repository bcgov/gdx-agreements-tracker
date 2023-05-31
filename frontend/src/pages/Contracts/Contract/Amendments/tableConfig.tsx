import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "contract", headerName: "Contract", flex: defaultFlex },
    { field: "amendment_date", headerName: "Amendment Date", flex: defaultFlex },
    { field: "amendment_type", headerName: "Amendment Type", flex: defaultFlex },
    { field: "description", headerName: "Description", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "contract", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
