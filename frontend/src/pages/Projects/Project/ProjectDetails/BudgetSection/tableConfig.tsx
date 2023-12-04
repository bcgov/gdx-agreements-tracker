import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "recovery_area", headerName: "Recovery Area", flex: defaultFlex },
    { field: "deliverable_name", headerName: "Deliverable Name", flex: defaultFlex },
    { field: "detail_amount", headerName: "Detail Amount", flex: defaultFlex },
    { field: "q1_amount", headerName: "Q1 Amount", flex: defaultFlex },
    { field: "q1_recovered", headerName: "Q1 Recovered", flex: defaultFlex },
    { field: "q2_amount", headerName: "Q2 Amount", flex: defaultFlex },
    { field: "q2_recovered", headerName: "Q2 Recovered", flex: defaultFlex },
    { field: "q3_amount", headerName: "Q3 Amount", flex: defaultFlex },
    { field: "q3_recovered", headerName: "Q3 Recovered", flex: defaultFlex },
    { field: "q4_amount", headerName: "Q4 amount", flex: defaultFlex },
    { field: "q4_recovered", headerName: "Q4 Recovered", flex: defaultFlex },
    { field: "total", headerName: "Total", flex: defaultFlex },
    { field: "resource_type", headerName: "Resource Type", flex: defaultFlex },
    { field: "stob", headerName: "STOB", flex: defaultFlex },
    { field: "responsibility_centre", headerName: "Responsibility", flex: defaultFlex },
    { field: "service_line", headerName: "Service Line", flex: defaultFlex },
    { field: "fiscal_year", headerName: "Fiscal", flex: defaultFlex },
    { field: "program_area", headerName: "Program Area", flex: defaultFlex },
    { field: "contract_id", headerName: "Contract", flex: defaultFlex },
    { field: "notes", headerName: "Notes", flex: defaultFlex },
  ];

  const initialState = {};

  return { tableColumns, initialState };
};
