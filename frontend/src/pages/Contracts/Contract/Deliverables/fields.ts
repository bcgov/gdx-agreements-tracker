import { IEditFields } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

export const readFields = (query: UseQueryResult<FormikValues>) => {
  return [
    {
      value: query?.data?.deliverable_name,
      title: "Deliverable Name",
      width: "half",
    },
    {
      value: query?.data?.is_expense,
      title: "Expense",
      width: "half",
    },
    {
      value: query?.data?.description,
      title: "Description",
      width: "full",
    },    
    {
      value: query?.data?.completion_date,
      title: "Completion Date",
      width: "half",
    },
    {
      value: query?.data?.deliverable_amount,
      title: "Deliverable Amount",
      width: "half",
    },
    {
      value: query?.data?.deliverable_status.label,
      title: "Deliverable Status",
      width: "half",
    },
    {
      value: query?.data?.project_deliverable_id.label,
      title: "Project Deliverable",
      width: "half",
    },    
    {
      value: query?.data?.fiscal.label,
      title: "Fiscal",
      width: "half",
    },
    {
      value: query?.data?.comments,
      title: "Comments",
      width: "full",
    },
  ];
};

export const editFields: IEditFields[] = [
  {
    fieldName: "deliverable_name",
    fieldType: "singleText",
    fieldLabel: "Deliverable",
    width: "half",
    tableName: "contract_amendment",
  },
  {
    fieldName: "is_expense",
    fieldType: "checkbox",
    fieldLabel: "Expense",
    width: "half",
  },
  {
    fieldName: "description",
    fieldType: "multiText",
    fieldLabel: "Description",
    width: "full",
  },  
  {
    fieldName: "completion_date",
    fieldType: "date",
    fieldLabel: "Completion Date",
    width: "half",
  },
  {
    fieldName: "deliverable_amount",
    fieldType: "number",
    fieldLabel: "Deliverable Amount",
    width: "half",
  },
  {
    fieldName: "deliverable_status",
    fieldType: "select",
    fieldLabel: "Deliverable Status",
    width: "half",
    tableName: "contracts",
  },
  {
    fieldName: "project_deliverable_id",
    fieldType: "select",
    fieldLabel: "Project Deliverable",
    width: "half",
    tableName: "contracts",
  },  
  {
    fieldName: "fiscal",
    fieldType: "select",
    fieldLabel: "Fiscal Year",
    width: "half",
    tableName: "generic",
  },
  {
    fieldName: "comments",
    fieldType: "multiText",
    fieldLabel: "Comments",
    width: "full",
  },
];

export const createFormInitialValues = {
  deliverable_name: "",
  is_expense: false,
  completion_date: "",
  deliverable_amount: 0,
  deliverable_status: "",
  project_deliverable_id: "",
  comments: "",
  fiscal: "",
};
