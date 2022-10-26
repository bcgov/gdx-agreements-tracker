import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} projectQuery The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (projectQuery: UseQueryResult<FormikValues>) => {
  return [
    {
      width: "half",
      title: "Agreement Type",
      value: projectQuery?.data?.data?.agreement_type?.label,
    },
    { width: "half", title: "Start Date", value: projectQuery?.data?.data?.agreement_start_date },
    { width: "half", title: "Signed Date", value: projectQuery?.data?.data?.agreement_signed_date },
    { width: "half", title: "End Date", value: projectQuery?.data?.data?.agreement_end_date },
    { width: "full", title: "Description", value: projectQuery?.data?.data?.description },
    { width: "full", title: "Notes", value: projectQuery?.data?.data?.notes },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: () => IEditField[] = () => {
  return [
    {
      fieldName: "agreement_type",
      fieldLabel: "Agreement Type",
      fieldType: "select",
      width: "half",
      tableName: "project",
    },
    {
      fieldName: "agreement_start_date",
      fieldLabel: "Agreement Start Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "agreement_signed_date",
      fieldLabel: "Agreement Signed Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "agreement_end_date",
      fieldLabel: "Agreement End Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "description",
      fieldLabel: "Description",
      fieldType: "multiText",
      width: "full",
    },
    {
      fieldName: "notes",
      fieldLabel: "Notes",
      fieldType: "multiText",
      width: "full",
    },
  ];
};
