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
    { width: "half", title: "Project Number", value: projectQuery?.data?.project_number },
    { width: "half", title: "Project Name", value: projectQuery?.data?.project_name },
    { width: "half", title: "Version", value: projectQuery?.data?.project_version },
    { width: "half", title: "Client Ministry Name", value: projectQuery?.data?.ministry_id?.label },
    { width: "half", title: "Initiation Date", value: projectQuery?.data?.initiation_date },
    { width: "half", title: "Portfolio Name", value: projectQuery?.data?.portfolio_id?.label },
    { width: "half", title: "Planned Start Date", value: projectQuery?.data?.planned_start_date },
    { width: "half", title: "Fiscal", value: projectQuery?.data?.fiscal?.label },
    { width: "half", title: "Planned End Date", value: projectQuery?.data?.planned_end_date },
    { width: "half", title: "Planned Budget", value: projectQuery?.data?.planned_budget },
    { width: "half", title: "Project Type", value: projectQuery?.data?.project_type?.label },
    { width: "half", title: "Project Status", value: projectQuery?.data?.project_status?.label },
    { width: "half", title: "Funding", value: projectQuery?.data?.funding?.label },
    { width: "half", title: "Total Budget", value: projectQuery?.data?.total_project_budget },
    { width: "half", title: "Recovery", value: projectQuery?.data?.recoverable?.label },
    { width: "half", title: "Recoverable Total", value: projectQuery?.data?.recoverable_amount },
    { width: "half", title: "Contract #", value: "contract" },
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
      fieldName: "project_number",
      fieldType: "singleText",
      fieldLabel: "Project Number",
      width: "half",
    },
    {
      fieldName: "project_name",
      fieldType: "singleText",
      fieldLabel: "Project Name",
      width: "half",
    },
  ];
};
