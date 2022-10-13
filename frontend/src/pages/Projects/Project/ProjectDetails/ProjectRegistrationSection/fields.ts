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
    { width: "half", title: "Project Number", value: projectQuery?.data?.data?.project_number },
    { width: "half", title: "Project Name", value: projectQuery?.data?.data?.project_name },
    { width: "half", title: "Version", value: projectQuery?.data?.data?.project_version },
    {
      width: "half",
      title: "Client Ministry Name",
      value: projectQuery?.data?.data?.ministry_id?.label,
    },
    { width: "half", title: "Initiation Date", value: projectQuery?.data?.data?.initiation_date },
    {
      width: "half",
      title: "Portfolio Name",
      value: projectQuery?.data?.data?.portfolio_id?.label,
    },
    {
      width: "half",
      title: "Planned Start Date",
      value: projectQuery?.data?.data?.planned_start_date,
    },
    { width: "half", title: "Fiscal", value: projectQuery?.data?.data?.fiscal?.label },
    { width: "half", title: "Planned End Date", value: projectQuery?.data?.data?.planned_end_date },
    { width: "half", title: "Planned Budget", value: projectQuery?.data?.data?.planned_budget },
    { width: "half", title: "Project Type", value: projectQuery?.data?.data?.project_type?.label },
    {
      width: "half",
      title: "Project Status",
      value: projectQuery?.data?.data?.project_status?.label,
    },
    { width: "half", title: "Funding", value: projectQuery?.data?.data?.funding?.label },
    { width: "half", title: "Total Budget", value: projectQuery?.data?.data?.total_project_budget },
    { width: "half", title: "Recovery", value: projectQuery?.data?.data?.recoverable?.label },
    {
      width: "half",
      title: "Recoverable Total",
      value: projectQuery?.data?.data?.recoverable_amount,
    },
    {
      width: "half",
      title: "Contract #",
      value: projectQuery?.data?.data?.contracts
        ? (projectQuery?.data?.data?.contracts as Array<{ id: number; co_number: string }>)
            .map((c) => {
              return c.co_number;
            })
            .join(", ")
        : "",
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
    {
      fieldName: "project_version",
      fieldType: "singleText",
      fieldLabel: "Version",
      width: "half",
    },
    {
      fieldName: "ministry_id",
      fieldType: "select",
      fieldLabel: "Client Ministry Name",
      width: "half",
      pickerName: "ministry_option",
    },
    {
      fieldName: "initiation_date",
      fieldType: "date",
      fieldLabel: "Initiation Date",
      width: "half",
    },
    {
      fieldName: "portfolio_id",
      fieldType: "select",
      fieldLabel: "Portfolio Name",
      width: "half",
      pickerName: "portfolio_option",
    },
    {
      fieldName: "planned_start_date",
      fieldType: "date",
      fieldLabel: "Planned Start Date",
      width: "half",
    },
    {
      fieldName: "fiscal",
      fieldType: "select",
      fieldLabel: "Fiscal",
      width: "half",
      pickerName: "fiscal_year_option",
    },
    {
      fieldName: "planned_end_date",
      fieldType: "date",
      fieldLabel: "Planned End Date",
      width: "half",
    },
    {
      fieldName: "planned_budget",
      fieldType: "number",
      fieldLabel: "Planned Budget",
      width: "half",
    },
    {
      fieldName: "project_type",
      fieldType: "select",
      fieldLabel: "Project Type",
      width: "half",
      tableName: "project",
    },
    {
      fieldName: "project_status",
      fieldType: "select",
      fieldLabel: "Project Status",
      width: "half",
      tableName: "project",
    },
    {
      fieldName: "funding",
      fieldType: "select",
      fieldLabel: "Funding",
      width: "half",
      tableName: "project",
    },
    {
      fieldName: "total_project_budget",
      fieldType: "number",
      fieldLabel: "Total Budget",
      width: "half",
    },
    {
      fieldName: "recoverable",
      fieldType: "select",
      fieldLabel: "Recovery",
      width: "half",
      tableName: "project",
    },
    {
      fieldName: "recoverable_amount",
      fieldType: "number",
      fieldLabel: "Recoverable Total",
      width: "half",
    },
  ];
};
