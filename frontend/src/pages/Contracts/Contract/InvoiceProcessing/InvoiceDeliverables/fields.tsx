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
    { width: "half", title: "Deliverables / Expense", value: query?.data?.resource_id },
    //{ width: "half", title: "Type", value: query?.data?.hours },
    { width: "half", title: "Amount", value: query?.data?.rate * query?.data?.rate },
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
    fieldLabel: "Deliverables / Expense",
    fieldName: "deliverable_id",
    fieldType: "singleText",
  },
];

/**
 * Inital values for create form.
 */
export const initialValues = {
  deliverable_id: "",
};
