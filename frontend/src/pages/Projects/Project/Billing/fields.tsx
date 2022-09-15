import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditFields } from "types";

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
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditFields[] = [
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
      tableName: "jv",
      width: "half",
    },
    {
      fieldName: "quarter",
      fieldLabel: "Quarter",
      fieldType: "singleText",
      width: "full",
    },
    
  ];

