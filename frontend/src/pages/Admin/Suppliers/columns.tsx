import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "jobTitle", headerName: "Job Title", width: 150 },
  { field: "MinistryId", headerName: "Ministry ID", width: 150 },
  { field: "Notes", headerName: "Notes", width: 150 },
];
