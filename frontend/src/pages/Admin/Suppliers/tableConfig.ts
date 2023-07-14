import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "supplier_name", headerName: "Supplier Name", flex: defaultFlex },
    { field: "signing_authority", headerName: "Signing Authority", flex: defaultFlex },
    { field: "financial_contact", headerName: "Financial Contact", flex: defaultFlex },
    { field: "province", headerName: "Province", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "supplier_name", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
