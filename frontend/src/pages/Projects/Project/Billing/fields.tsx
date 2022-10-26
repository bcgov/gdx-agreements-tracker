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
    {
      width: "full",
      title: "Journal Voucher Number",
      value: reactQuery?.data?.jv_number,
    },
    {
      width: "full",
      title: "Billed Date",
      value: reactQuery?.data?.billed_date,
    },
    {
      width: "full",
      title: "Amount",
      value: reactQuery?.data?.amount,
    },
    {
      width: "half",
      title: "Fiscal Year",
      value: reactQuery?.data?.fiscal_year_id.label,
    },
    {
      width: "half",
      title: "Quarter",
      value: reactQuery?.data?.quarter,
    },
    {
      width: "half",
      title: "Program Area",
      value: reactQuery?.data?.client_coding_id?.label,
    },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number|undefined} projectId The project id, which allows for specific picker options to use only project related options.
 * @returns {Array}
 */
export const editFields: (projectId: number | undefined) => IEditField[] = (projectId) => {
  return [
    {
      fieldName: "jv_number",
      fieldLabel: "Journal Voucher Number",
      fieldType: "singleText",
      width: "full",
    },
    {
      fieldName: "billed_date",
      fieldLabel: "Billed Date",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "amount",
      fieldLabel: "Amount",
      fieldType: "singleText",
      width: "full",
    },
    {
      fieldName: "fiscal_year_id",
      fieldLabel: "Fiscal Year",
      fieldType: "select",
      pickerName: "fiscal_year_option",
      width: "half",
    },
    {
      fieldName: "quarter",
      fieldLabel: "Quarter",
      fieldType: "number",
      width: "half",
    },
    {
      fieldName: "client_coding_id",
      fieldLabel: "Program Area",
      fieldType: "select",
      pickerName: "client_coding_option",
      projectId: projectId,
      width: "half",
    },
  ];
};
