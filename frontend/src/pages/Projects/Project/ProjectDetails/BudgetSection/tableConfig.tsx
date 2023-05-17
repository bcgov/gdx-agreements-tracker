import { GridColDef, GridInitialState } from "@mui/x-data-grid";
import { useRenderTableCell } from "components/PLAYGROUND/hooks/useRenderTableCell";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    {
      field: "q1_amount",
      headerName: "Q1 Amount",
      flex: defaultFlex,
    },
    { field: "q1_recovered", headerName: "Service Line", flex: defaultFlex },
    { field: "q2_amount", headerName: "Client", flex: defaultFlex },
    { field: "q2_recovered", headerName: "Financial Contact", flex: defaultFlex },
    { field: "q3_amount", headerName: "Expense Authority Name", flex: defaultFlex },
    { field: "q3_recovered", headerName: "STOB", flex: defaultFlex },
    { field: "q4_amount", headerName: "Responsibility Centre", flex: defaultFlex },
    { field: "q4_recovered", headerName: "Project Code", flex: defaultFlex },
    { field: "deliverable_name", headerName: "Deliverable Name", flex: defaultFlex },
    { field: "notes", headerName: "Notes", flex: defaultFlex },
    { field: "detail_amount", headerName: "Detail Amount", flex: defaultFlex },
    { field: "recovery_area", headerName: "Recovery Area", flex: defaultFlex },
    { field: "resource_type", headerName: "Resource Type", flex: defaultFlex },
    { field: "stob", headerName: "STOB", flex: defaultFlex },
    { field: "client", headerName: "Client Coding", flex: defaultFlex },
    { field: "co_number", headerName: "Contract", flex: defaultFlex },
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