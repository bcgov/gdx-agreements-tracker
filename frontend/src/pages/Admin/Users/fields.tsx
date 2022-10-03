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
    { width: "half", title: "Email", value: userQuery?.data?.email },
    { width: "half", title: "Name", value: userQuery?.data?.name },
    { width: "full", title: "User Role", value: userQuery?.data?.role_id.label },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditFields[] = [
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
  {
    fieldName: "role_id",
    fieldType: "select",
    fieldLabel: "User Role",
    width: "full",
    tableName: "users",
  },
];
