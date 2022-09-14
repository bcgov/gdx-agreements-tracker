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
      title: "Amount",
      value: reactQuery?.data?.amount,
    },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "jv_number",
      fieldLabel: "Journal Voucher Number",
      fieldType: "singleText",
      width: "full",
    },
    {
      fieldName: "amount",
      fieldLabel: "Amount",
      fieldType: "singleText",
      width: "full",
    },
  ];
};
