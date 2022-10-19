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
    {
      width: "half",
      title: "Deliverables / Expense",
      value: query?.data?.contract_deliverable_id?.label,
    },
    { width: "half", title: "Fiscal Year", value: query?.data?.fiscal_year },
    { width: "half", title: "Amount", value: query?.data?.rate },
    { width: "half", title: "Amount Remaining", value: query?.data?.amount_remaining },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number}        contractId Id of contract to get deliverables for.
 * @returns {IEditFields[]}
 */
export const editFields: (contractId: number) => IEditFields[] = (contractId) => {
  return [
    {
      width: "half",
      fieldLabel: "Deliverables / Expense",
      fieldName: "contract_deliverable_id",
      fieldType: "select",
      tableName: "contracts",
      pickerName: "contract_deliverable",
      contractId: contractId,
    },
    { width: "half", fieldLabel: "Fiscal Year", fieldName: "fiscal_year", fieldType: "readonly" },
    { width: "half", fieldLabel: "Amount", fieldName: "rate", fieldType: "number" },
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
  contract_deliverable_id: "",
  rate: 0,
  unit_amount: 1,
};
