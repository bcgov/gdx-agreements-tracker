import { GridInitialState } from "@mui/x-data-grid";
import { dateFormatter } from "utils/formatDate";
import LineBreak from "utils/LineBreak";
import { sortComparatorByCurrency } from "utils/sortComparatorByCurrency";

export const tableConfig = () => {
  const defaultFlex = 3;
  const midFlex = 4;
  const largeFlex = 5;

  const tableColumns = [
    {
      field: "contract_number",
      headerName: "Contract Number",
      flex: midFlex,
      renderHeader: (): JSX.Element => LineBreak("Contract", "Number"),
    },
    {
      field: "co_version",
      headerName: "CO Version",
      flex: defaultFlex,
    },
    { field: "description", headerName: "Description", flex: largeFlex },
    { field: "supplier", headerName: "Supplier", flex: defaultFlex },
    {
      field: "start_date",
      headerName: "Start Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Start", "Date"),
    },
    {
      field: "end_date",
      headerName: "End Date",
      valueFormatter: dateFormatter,
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("End", "Date"),
    },
    {
      field: "max_amount",
      headerName: "Max Amount",
      flex: midFlex,
      renderHeader: (): JSX.Element => LineBreak("Max", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    {
      field: "remaining_amount",
      headerName: "Remaining Amount",
      flex: midFlex,
      renderHeader: (): JSX.Element => LineBreak("Remaining", "Amount"),
      sortComparator: sortComparatorByCurrency(),
    },
    { field: "status", headerName: "Status", flex: midFlex },
    { field: "fiscal", headerName: "Fiscal", flex: defaultFlex },
    {
      field: "project_number",
      headerName: "Project Number",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Project", "Number"),
    },
    {
      field: "portfolio_name",
      headerName: "Portfolio Name",
      flex: defaultFlex,
      renderHeader: (): JSX.Element => LineBreak("Portfolio", "Name"),
    },
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
