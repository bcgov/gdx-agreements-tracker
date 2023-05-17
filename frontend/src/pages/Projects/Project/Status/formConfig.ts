import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Phase", value: query?.data?.data?.data?.project_phase_id.label },
        {
          width: "half",
          title: "Overall Project Health",
          value: query?.data?.data?.data?.health_id.label,
        },
        {
          width: "half",
          title: "Reported By",
          value: query?.data?.data?.data?.reported_by_contact_id.label,
        },
        {
          width: "half",
          title: "Schedule Health",
          value: query?.data?.data?.data?.schedule_health_id.label,
        },
        { width: "half", title: "Start Date", value: query?.data?.data?.data?.status_date },
        {
          width: "half",
          title: "Budget Health",
          value: query?.data?.data?.data?.budget_health_id.label,
        },
        {
          width: "half",
          title: "General and progress comments this period",
          value: query?.data?.data?.data?.general_progress_comments,
        },
        {
          width: "half",
          title: "Team Health",
          value: query?.data?.data?.data?.team_health_id.label,
        },

        {
          width: "half",
          title: "Issues and necessary decisions this period",
          value: query?.data?.data?.data?.issues_and_decisions,
        },
        {
          width: "half",
          title: "Forecast and next steps",
          value: query?.data?.data?.data?.forecast_and_next_steps,
        },

        {
          width: "half",
          title: "Risk watch list",
          value: query?.data?.data?.data?.identified_risk,
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "project_phase_id",
      fieldType: "select",
      fieldLabel: "Phase",
      width: "half",
      pickerName: "project_phase_option",
    },
    {
      fieldName: "health_id",
      fieldType: "select",
      fieldLabel: "Overall Project Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      fieldName: "reported_by_contact_id",
      fieldType: "select",
      fieldLabel: "Reported By",
      width: "half",
      pickerName: "contact_option",
    },
    {
      fieldName: "schedule_health_id",
      fieldType: "select",
      fieldLabel: "Schedule Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      fieldName: "status_date",
      fieldType: "date",
      fieldLabel: "Start Date",
      width: "half",
    },
    {
      fieldName: "budget_health_id",
      fieldType: "select",
      fieldLabel: "Budget Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      fieldName: "general_progress_comments",
      fieldType: "multiText",
      fieldLabel: "General and progress comments this period",
      width: "half",
    },
    {
      fieldName: "team_health_id",
      fieldType: "select",
      fieldLabel: "Team Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      fieldName: "issues_and_decisions",
      fieldType: "multiText",
      fieldLabel: "Issues and necessary decisions this period",
      width: "half",
    },
    {
      fieldName: "forecast_and_next_steps",
      fieldType: "multiText",
      fieldLabel: "Forecast and next steps",
      width: "half",
    },
    {
      fieldName: "identified_risk",
      fieldType: "multiText",
      fieldLabel: "Risk watch list",
      width: "half",
    },
  ];

  const initialValues = {
    program_area: "",
    service_line: "",
    client: "",
    contact_id: "",
    expense_authority_name: "",
    stob: "",
    responsibility_centre: "",
    project_code: "",
    client_amount: 0,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const queryKey = `/projects/status/${query?.data?.data?.data?.id}`;
  const postUrl = `/projects/status`;
  const updateUrl = `/projects/status/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, queryKey, postUrl, updateUrl };
};
