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
    { width: "half", title: "Resource Assignment", value: query?.data?.contract_resource?.label },
    { width: "half", title: "Hours", value: query?.data?.unit_amount },
    { width: "half", title: "Rate", value: query?.data?.rate },
    { width: "half", title: "Amount", value: query?.data?.rate * query?.data?.unit_amount },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number}        invoiceId Id of invoice to get resources/deliverables for.
 * @returns {IEditFields[]}
 */
export const editFields: (invoiceId: number) => IEditFields[] = (invoiceId) => {
  return [
    {
      width: "half",
      fieldLabel: "Resource Assignment",
      fieldName: "contract_resource",
      fieldType: "select",
      tableName: "contracts",
      projectId: invoiceId,
    },
    { width: "half", fieldLabel: "Hours", fieldName: "hours", fieldType: "number" },
  ];
};

/**
 * Inital values for create form.
 */
export const initialValues = {
  contract_resource: "",
  hours: 0,
};
