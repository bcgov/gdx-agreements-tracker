import { GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns = [
    {
      field: "contract_number",
      headerName: "Contract Number",
      flex: defaultFlex,
    },
    { field: "description", headerName: "Description", flex: defaultFlex },
    { field: "supplier", headerName: "Supplier", flex: defaultFlex },
    { field: "start_date", headerName: "Start Date", flex: defaultFlex },
    { field: "end_date", headerName: "End Date", flex: defaultFlex },
    { field: "status", headerName: "Status", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "project_number", headerName: "Project Number", flex: defaultFlex },
    { field: "project_name", headerName: "Project Name", flex: defaultFlex },
  ];

  const initialState: GridInitialState = {
    filter: {
      filterModel: {
        items: [{ field: "status", operator: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
