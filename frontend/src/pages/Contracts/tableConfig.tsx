import { GridInitialState } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import LineBreak from "utils/LineBreak";

export const tableConfig = () => {
  const defaultFlex = 4;
  const smallFlex = 3;
  const largeFlex = 4;

  const tableColumns = [
    {
      field: "contract_number",
      headerName: "Contract Number",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Contract", "Number"),
    },
    {
      field: "co_version",
      headerName: "CO Version",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("CO", "Version"),
    },
    { field: "description", headerName: "Description", flex: largeFlex },
    { field: "supplier", headerName: "Supplier", flex: defaultFlex },
    {
      field: "start_date",
      headerName: "Start Date",
      valueFormatter: dateFormatter,
      flex: largeFlex,
    },
    {
      field: "end_date",
      headerName: "End Date",
      valueFormatter: dateFormatter,
      flex: largeFlex,
    },
    { field: "max_amount", headerName: "Max Amount", flex: defaultFlex },
    { field: "remaining_amount", headerName: "Remaining Amount", flex: defaultFlex },
    { field: "status", headerName: "Status", flex: defaultFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    { field: "project_number", headerName: "Project Number", flex: defaultFlex },
    { field: "portfolio_name", headerName: "Portfolio Name", flex: defaultFlex },
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
