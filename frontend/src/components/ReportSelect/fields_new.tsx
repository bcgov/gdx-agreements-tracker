import { IEditField } from "types";

export const editFields: IEditField[] = [
  {
    fieldName: "fiscal",
    fieldType: "select",
    fieldLabel: "Fiscal",
    width: "half",
    pickerName: "fiscal_year_option",
  },
  {
    fieldName: "project",
    fieldType: "select",
    fieldLabel: "Project #",
    width: "half",
    pickerName: "project_option",
  },
  {
    fieldName: "quarter",
    fieldType: "select",
    fieldLabel: "Quarter",
    width: "half",
    tableName: "generic",
  },
  {
    fieldName: "portfolio",
    fieldType: "multiselect",
    fieldLabel: "Portfolio",
    width: "half",
    pickerName: "portfolio_option",
  },
  {
    fieldName: "contract",
    fieldType: "select",
    fieldLabel: "Contract",
    width: "half",
    pickerName: "contract_option",
  },
];

export const initialValues = {
  fiscal: "",
  project: "",
};
