import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;

  const tableColumns: GridColDef[] = [
    { field: "portfolio", headerName: "Portfolio", flex: defaultFlex },
    { field: "cas_project_number", headerName: "CAS Project #", flex: defaultFlex },
    { field: "responsibility", headerName: "Responsibility", flex: defaultFlex },
    { field: "service_line", headerName: "Service Line", flex: defaultFlex },
    { field: "stob", headerName: "STOB", flex: defaultFlex },
    { field: "qualified_receiver", headerName: "Qualified Receiver", flex: defaultFlex },
    { field: "recovery_info", headerName: "Recovery Info", flex: defaultFlex },
  ];

  return { tableColumns };
};
