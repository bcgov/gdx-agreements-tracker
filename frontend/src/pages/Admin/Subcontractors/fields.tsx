import { IEditFields } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} subcontractorsQuery The react query data for specific subcontractor.
 * @returns {Array}
 */
export const readFields = (subcontractorsQuery: UseQueryResult<FormikValues>) => {
  return [
    {
      width: "half",
      title: "Subcontractor Name",
      value: subcontractorsQuery?.data?.subcontractor_name,
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
    fieldName: "subcontractor_name",
    fieldType: "singleText",
    fieldLabel: "Name",
    width: "half",
  },
];
