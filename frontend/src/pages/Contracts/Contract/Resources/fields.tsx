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
    { width: "half", title: "Fiscal", value: query?.data?.fiscal?.label },
    { width: "half", title: "Resource", value: query?.data?.resource_id?.label },
    { width: "half", title: "Supplier Rate", value: query?.data?.supplier_rate_id?.label },
    { width: "half", title: "Assignment Role", value: query?.data?.assignment_role },
    { width: "half", title: "Assignment Rate", value: query?.data?.assignment_rate },
    { width: "half", title: "# Hours Req.", value: query?.data?.hours },
    { width: "half", title: "Start Date", value: query?.data?.start_date },
    { width: "half", title: "End Date", value: query?.data?.end_date },
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
    fieldLabel: "Fiscal",
    fieldName: "fiscal",
    fieldType: "select",
    pickerName: "fiscal_year_option",
  },
  {
    width: "half",
    fieldLabel: "Resource",
    fieldName: "resource_id",
    fieldType: "select",
    pickerName: "resource_option",
  },
  {
    width: "half",
    fieldLabel: "Supplier Rate",
    fieldName: "supplier_rate_id",
    fieldType: "select",
    pickerName: "supplier_rate_option",
  },
  {
    width: "half",
    fieldLabel: "Assignment Role",
    fieldName: "assignment_role",
    fieldType: "readonly",
  },
  {
    width: "half",
    fieldLabel: "Assignment Rate",
    fieldName: "assignment_rate",
    fieldType: "number",
  },
  {
    width: "half",
    fieldLabel: "# Hours Req.",
    fieldName: "hours",
    fieldType: "number",
  },
  {
    width: "half",
    fieldLabel: "Start Date",
    fieldName: "start_date",
    fieldType: "date",
  },
  {
    width: "half",
    fieldLabel: "End Date",
    fieldName: "end_date",
    fieldType: "date",
  },
];

/**
 * Inital values for create form.
 */
export const initialValues = {
  fiscal: "",
  resource_id: "",
  supplier_rate_id: "",
  assignment_rate: 0,
  hours: 0,
  start_date: null,
  end_date: null,
};
