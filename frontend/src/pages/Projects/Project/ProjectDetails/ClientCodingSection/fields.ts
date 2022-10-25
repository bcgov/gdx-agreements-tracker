import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} query The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (query: UseQueryResult<FormikValues>) => {
  return [
    {
      width: "half",
      title: "Program Area",
      value: query?.data?.program_area,
    },
    { width: "half", title: "Service Line", value: query?.data?.service_line },
    { width: "half", title: "Client", value: query?.data?.client },
    { width: "half", title: "Financial Contact", value: query?.data?.contact_id?.label },
    {
      width: "half",
      title: "Expense Authority Name",
      value: query?.data?.expense_authority_name,
    },
    { width: "half", title: "STOB", value: query?.data?.stob },
    {
      width: "half",
      title: "Responsibility Centre",
      value: query?.data?.responsibility_centre,
    },
    { width: "half", title: "Project Code", value: query?.data?.project_code },
    { width: "half", title: "Client_amount", value: query?.data?.client_amount },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditField[] = [
  {
    width: "half",
    fieldLabel: "Program Area",
    fieldName: "program_area",
    fieldType: "singleText",
  },
  { width: "half", fieldLabel: "Service Line", fieldName: "service_line", fieldType: "singleText" },
  { width: "half", fieldLabel: "Client", fieldName: "client", fieldType: "singleText" },
  {
    width: "half",
    fieldLabel: "Financial Contact",
    fieldName: "contact_id",
    fieldType: "select",
    pickerName: "contact_option",
  },
  {
    width: "half",
    fieldLabel: "Expense Authority Name",
    fieldName: "expense_authority_name",
    fieldType: "singleText",
  },
  { width: "half", fieldLabel: "STOB", fieldName: "stob", fieldType: "singleText" },
  {
    width: "half",
    fieldLabel: "Responsibility Centre",
    fieldName: "responsibility_centre",
    fieldType: "singleText",
  },
  { width: "half", fieldLabel: "Project Code", fieldName: "project_code", fieldType: "singleText" },
  {
    width: "half",
    fieldLabel: "Client Amount",
    fieldName: "client_amount",
    fieldType: "number",
  },
];

/**
 * Inital values for create form.
 */
export const initialValues = {
  program_area: "",
  service_line: "",
  client: "",
  contact_id: "",
  expense_authority_name: "",
  stob: "",
  responsibility_centre: "",
  project_code: "",
  client_amount: 0,
};
