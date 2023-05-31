import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "portfolio", headerName: "portfolio", flex: defaultFlex },
    { field: "responsibility", headerName: "responsibility", flex: defaultFlex },
    { field: "service_line", headerName: "service_line", flex: defaultFlex },
    { field: "cas_project_number", headerName: "CAS Project #", flex: defaultFlex },
    { field: "asset_tag", headerName: "asset_tag", flex: defaultFlex },
    { field: "wip_number", headerName: "WIP #", flex: defaultFlex },
    { field: "qualified_receiver", headerName: "qualified_receiver", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "portfolio", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
