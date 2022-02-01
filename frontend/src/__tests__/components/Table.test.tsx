import React from "react";
import ReactDOM from "react-dom";
import { Table } from "../../components";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "jobTitle", headerName: "Job Title", width: 150 },
  { field: "MinistryId", headerName: "Ministry ID", width: 150 },
  { field: "Notes", headerName: "Notes", width: 150 },
];

const rows: GridRowsProp = [
  {
    lastName: "James",
    firstName: "Fred",
    jobTitle: "Sr. Developer",
    MinistryId: "AEST",
    Notes: "",
    id: 1,
  },
  {
    lastName: "Jascob",
    firstName: "Sierra",
    jobTitle: "Scrum Master",
    MinistryId: "AEST",
    Notes: "",
    id: 2,
  },
  {
    lastName: "Jackie",
    firstName: "Frank",
    jobTitle: "Product Owner",
    MinistryId: "CITZ",
    Notes: "",
    id: 3,
  },
  {
    lastName: "Jefferson",
    firstName: "James",
    jobTitle: "UX Designer",
    MinistryId: "CITZ",
    Notes: "",
    id: 4,
  },
  {
    lastName: "John",
    firstName: "Marston",
    jobTitle: "Director",
    MinistryId: "TRAN",
    Notes: "",
    id: 5,
  },
];

it("renders <Table/> without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Table columns={columns} rows={rows} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
