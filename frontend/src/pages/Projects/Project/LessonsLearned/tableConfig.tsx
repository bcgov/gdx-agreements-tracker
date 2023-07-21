import { GridColDef } from "@mui/x-data-grid";

export const tableConfig = () => {
  const defaultFlex = 3;
  const tableColumns: GridColDef[] = [
    { field: "category", headerName: "Category", flex: defaultFlex },
    { field: "subcategory", headerName: "Lesson Sub Category", flex: defaultFlex },
    { field: "lesson", headerName: "Lesson", flex: defaultFlex },
    { field: "recommendations", headerName: "Recommendations", flex: defaultFlex },
  ];

  const initialState = {
    filter: {
      filterModel: {
        items: [{ columnField: "amount", operatorValue: "equals", value: "Active" }],
      },
    },
  };

  return { tableColumns, initialState };
};
