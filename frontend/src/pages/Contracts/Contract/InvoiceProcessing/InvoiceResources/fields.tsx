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
      title: "Resource Assignment",
      value: query?.data?.contract_resource_id?.label,
    },
    { width: "half", title: "Fiscal Year", value: query?.data?.fiscal_year },
    { width: "half", title: "Hours", value: query?.data?.unit_amount },
    { width: "half", title: "Rate", value: query?.data?.rate },
    { width: "half", title: "Amount", value: query?.data?.rate * query?.data?.unit_amount },
    { width: "half", title: "Amount Remaining", value: query?.data?.amount_remaining },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number}       contractId Id of contract to get resources for.
 * @returns {IEditField[]}
 */
export const editFields: (contractId: number) => IEditField[] = (contractId) => {
  return [
    {
      width: "half",
      fieldLabel: "Resource Assignment",
      fieldName: "contract_resource_id",
      fieldType: "select",
      pickerName: "contract_resource",
      contractId: contractId,
    },
    { width: "half", fieldLabel: "Fiscal Year", fieldName: "fiscal_year", fieldType: "readonly" },
    { width: "half", fieldLabel: "Hours", fieldName: "unit_amount", fieldType: "number" },
    { width: "half", fieldLabel: "Rate", fieldName: "rate", fieldType: "readonly" },
    {
      width: "half",
      fieldLabel: "Amount Remaining",
      fieldName: "amount_remaining",
      fieldType: "readonly",
    },
  ];
};

/**
 * Inital values for create form.
 */
export const initialValues = {
  contract_resource_id: "",
  unit_amount: 0,
};
