import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditFields } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} userQuery The react query data for specific resource.
 * @returns {Array}
 */
export const readFields = (userQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "email", value: userQuery?.data?.email },
    { width: "half", title: "name", value: userQuery?.data?.name },
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
      fieldName: "email",
      fieldType: "singleText",
      fieldLabel: "Email",
      width: "half",

    },
    {
      fieldName: "name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
    },
  ];
};
