import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditFields } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} projectQuery The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (projectQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Agreement Type", value: projectQuery?.data?.agreement_type?.label },
    { width: "half", title: "Start Date", value: projectQuery?.data?.agreement_start_date },
    { width: "half", title: "Signed Date", value: projectQuery?.data?.agreement_signed_date },
    { width: "half", title: "End Date", value: projectQuery?.data?.agreement_end_date },
    { width: "full", title: "Description", value: projectQuery?.data?.description },
    { width: "full", title: "Notes", value: projectQuery?.data?.notes },
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
      fieldName: "agreement_type",
      fieldLabel: "Agreement Type",
      fieldType: "singleText",
      width: "half",
    },
  ];
};
