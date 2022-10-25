import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} reactQuery The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (reactQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Version", value: reactQuery?.data?.version },
    { width: "half", title: "Fiscal Year", value: reactQuery?.data?.fiscal_year?.label },
    { width: "half", title: "Initiation Date", value: reactQuery?.data?.initiation_date },
    { width: "half", title: "CR Contact", value: reactQuery?.data?.cr_contact },
    { width: "half", title: "Initiated By", value: reactQuery?.data?.initiated_by?.label },
    { width: "half", title: "Approval Date", value: reactQuery?.data?.approval_date },
    { width: "full", title: "Summary", value: reactQuery?.data?.summary },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number|undefined} projectId The project id, which allows for specific picker options to use only project related options.
 * @returns {Array}
 */
export const editFields: IEditField[] = [
  {
    fieldName: "fiscal_year",
    fieldType: "select",
    fieldLabel: "Fiscal Year",
    width: "half",
    pickerName: "fiscal_year_option",
  },
  {
    fieldName: "initiation_date",
    fieldType: "date",
    fieldLabel: "Initiation Date",
    width: "half",
  },
  {
    fieldName: "cr_contact",
    fieldType: "singleText",
    fieldLabel: "CR Contact",
    width: "half",
  },
  {
    fieldName: "initiated_by",
    fieldType: "select",
    fieldLabel: "Initiated By",
    width: "half",
    tableName: "change_request",
  },
  {
    fieldName: "approval_date",
    fieldType: "date",
    fieldLabel: "Approval Date",
    width: "half",
  },
  {
    fieldName: "summary",
    fieldType: "multiText",
    fieldLabel: "Summary",
    width: "full",
  },
];
