import { IEditField } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} resourcesQuery The react query data for specific ministry.
 * @returns {Array}
 */
export const readFields = (resourcesQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Supplier", value: resourcesQuery?.data?.supplier_id.label },
    { width: "half", title: "Subcontractor", value: resourcesQuery?.data?.subcontractor_id.label },
    { width: "half", title: "First Name", value: resourcesQuery?.data?.resource_first_name },
    { width: "half", title: "Last Name", value: resourcesQuery?.data?.resource_last_name },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditField[] = [
  {
    fieldName: "supplier_id",
    fieldType: "select",
    fieldLabel: "Supplier",
    width: "half",
    pickerName: "supplier_option",
  },
  {
    fieldName: "subcontractor_id",
    fieldType: "select",
    fieldLabel: "Subcontractor",
    width: "half",
    pickerName: "subcontractor_option",
  },
  {
    fieldName: "resource_first_name",
    fieldType: "singleText",
    fieldLabel: "First Name",
    width: "half",
  },
  {
    fieldName: "resource_last_name",
    fieldType: "singleText",
    fieldLabel: "Last Name",
    width: "half",
  },
];
