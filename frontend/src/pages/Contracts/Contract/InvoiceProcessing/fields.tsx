import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditFields } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} query The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (query: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Invoice Number", value: query?.data?.invoice_number },
    { width: "half", title: "Received Date", value: query?.data?.received_date },
    { width: "half", title: "Invoice Date", value: query?.data?.invoice_date },
    { width: "half", title: "Due Date", value: query?.data?.due_date },
    { width: "half", title: "Billing Period", value: query?.data?.billing_period },
    { width: "half", title: "Fiscal Year", value: query?.data?.fiscal?.label },
    { width: "half", title: "GL", value: query?.data?.is_gl },
    { width: "full", title: "Notes", value: query?.data?.notes },
  ];
};

/**
 * The edit fields.
 *
 * @returns {IEditFields[]}
 */
export const editFields: IEditFields[] = [
  {
    width: "half",
    fieldLabel: "Invoice Number",
    fieldName: "invoice_number",
    fieldType: "singleText",
  },
  { width: "half", fieldLabel: "Invoice Date", fieldName: "invoice_date", fieldType: "date" },
  { width: "half", fieldLabel: "Received Date", fieldName: "received_date", fieldType: "date" },
  { width: "half", fieldLabel: "Due Date", fieldName: "due_date", fieldType: "date" },
  {
    width: "half",
    fieldLabel: "Billing Period",
    fieldName: "billing_period",
    fieldType: "select",
    tableName: "generic",
  },
  {
    fieldName: "fiscal",
    fieldType: "select",
    fieldLabel: "Fiscal Year",
    width: "half",
    pickerName: "fiscal_year_option",
    tableName: "generic",
  },
  { width: "half", fieldLabel: "General Ledger", fieldName: "is_gl", fieldType: "checkbox" },
  { width: "full", fieldLabel: "Notes", fieldName: "notes", fieldType: "multiText" },
];

/**
 * Inital values for create form.
 */
export const initialValues = {
  invoice_number: "",
  invoice_date: "",
  received_date: "",
  due_date: "",
  billing_period: "",
  fiscal: "",
  is_gl: false,
  notes: "",
};
