import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "program_area",
      headerName: "program_area",
      flex: defaultFlex,
    },
    { field: "service_line", headerName: "service_line", flex: defaultFlex },
    { field: "client", headerName: "client", flex: defaultFlex },
    { field: "contact", headerName: "contact", flex: defaultFlex },
    { field: "expense_authority_name", headerName: "expense_authority_name", flex: defaultFlex },
    { field: "stob", headerName: "stob", flex: defaultFlex },
    { field: "responsibility_centre", headerName: "responsibility_centre", flex: defaultFlex },
    { field: "project_code", headerName: "project_code", flex: defaultFlex },
    { field: "client_amount", headerName: "client_amount", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "program_area", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
