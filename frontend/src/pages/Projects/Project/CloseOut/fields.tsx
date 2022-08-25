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
    {
      width: "full",
      title: "Close out date",
      value: projectQuery?.data?.close_out_date,
    },
    {
      width: "full",
      title: "Completed by",
      value: projectQuery?.data?.completed_by_contact_id?.label,
    },
    {
      width: "full",
      title: "Actual completion date of project",
      value: projectQuery?.data?.actual_completion_date,
    },
    {
      width: "full",
      title: "Post implementation hand-off to operation completed",
      value: projectQuery?.data?.hand_off_to_operations?.value,
    },
    {
      width: "full",
      title: "Project documentation filled in accordance with records management",
      value: projectQuery?.data?.records_filed?.value,
    },
    {
      width: "full",
      title: "Contract evaluation completed if applicable",
      value: projectQuery?.data?.contract_ev_completed?.value,
    },
    {
      width: "full",
      title: "Contractor IDIR terminated / building passes returned",
      value: projectQuery?.data?.contractor_security_terminated?.value,
    },
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
      fieldName: "close_out_date",
      fieldLabel: "Close out date",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "completed_by_contact_id",
      fieldLabel: "Completed by",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "actual_completion_date",
      fieldLabel: "Actual completion date of project",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "hand_off_to_operations",
      fieldLabel: "Post implementation hand-off to operation completed",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "records_filed",
      fieldLabel: "Project documentation filled in accordance with records management",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "contract_ev_completed",
      fieldLabel: "Contract evaluation completed if applicable",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "contractor_security_terminated",
      fieldLabel: "Contractor IDIR terminated / building passes returned",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
  ];
};
