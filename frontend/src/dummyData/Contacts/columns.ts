import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "jobTitle", headerName: "Job Title", flex: 1 },
  { field: "MinistryId", headerName: "Ministry ID", flex: 1 },
  { field: "Notes", headerName: "Notes", flex: 1 },
];
