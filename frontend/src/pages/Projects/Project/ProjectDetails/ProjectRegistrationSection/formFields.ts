import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const formFields = (query: AxiosResponse | undefined) => {
  const readFields = [
    { width: "half", title: "Project Number", value: query?.data?.data.project_number },
    { width: "half", title: "Project Name", value: query?.data?.data.project_name },
    { width: "half", title: "Version", value: query?.data?.data.project_version },
    {
      width: "half",
      title: "Client Ministry Name",
      value: query?.data?.data.ministry?.label,
    },
    { width: "half", title: "Initiation Date", value: query?.data?.data.initiation_date },
    {
      width: "half",
      title: "Portfolio Name",
      value: query?.data?.data.portfolio_id?.label,
    },
    {
      width: "half",
      title: "Planned Start Date",
      value: query?.data?.data.planned_start_date,
    },
    { width: "half", title: "Fiscal", value: query?.data?.data.fiscal?.label },
    { width: "half", title: "Planned End Date", value: query?.data?.data.planned_end_date },
    { width: "half", title: "Planned Budget", value: query?.data?.data.planned_budget },
    { width: "half", title: "Project Type", value: query?.data?.data.project_type?.label },
    {
      width: "half",
      title: "Project Status",
      value: query?.data?.data.project_status?.label,
    },
    { width: "half", title: "Funding", value: query?.data?.data.funding?.label },
    { width: "half", title: "Total Budget", value: query?.data?.data.total_project_budget },
    { width: "half", title: "Recovery", value: query?.data?.data.recoverable?.label },
    {
      width: "half",
      title: "Recoverable Total",
      value: query?.data?.data.recoverable_amount,
    },
    {
      width: "half",
      title: "Contract #",
      value: query?.data?.data.contracts
        ? (query?.data?.data.contracts as Array<{ id: number; co_number: string }>)
            .map((c) => {
              return c.co_number;
            })
            .join(", ")
        : "",
    },
  ];
  const editFields: IEditField[] = [
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
      fieldName: "ministry",
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

  return { readFields, editFields };
};
