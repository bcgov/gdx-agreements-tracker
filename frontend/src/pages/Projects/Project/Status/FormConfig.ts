import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import formatDate from "utils/formatDate";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          width: "full",
          title: "Overall Project Health",
          value: query?.data?.data?.data?.health_id.label,
        },
        { width: "half", title: "Phase", value: query?.data?.data?.data?.project_phase_id.label },
        {
          width: "half",
          title: "Schedule Health",
          value: query?.data?.data?.data?.schedule_health_id.label,
        },
        {
          width: "half",
          title: "Reported By",
          value: query?.data?.data?.data?.reported_by_contact_id?.name,
        },
        {
          width: "half",
          title: "Budget Health",
          value: query?.data?.data?.data?.budget_health_id.label,
        },
        {
          width: "half",
          title: "Status Date",
          value: formatDate(query?.data?.data?.data?.status_date),
        },
        {
          width: "half",
          title: "Team Health",
          value: query?.data?.data?.data?.team_health_id.label,
        },
        {
          width: "full",
          title: "General and progress comments this period",
          value: query?.data?.data?.data?.general_progress_comments,
        },
        {
          width: "full",
          title: "Issues and necessary decisions this period",
          value: query?.data?.data?.data?.issues_and_decisions,
        },
        {
          width: "full",
          title: "Forecast and next steps",
          value: query?.data?.data?.data?.forecast_and_next_steps,
        },

        {
          width: "full",
          title: "Risk watch list",
          value: query?.data?.data?.data?.identified_risk,
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "health_id",
      fieldType: "select",
      fieldLabel: "Overall Project Health",
      width: "full",
      pickerName: "health_status_option",
      required: true,
    },
    {
      fieldName: "project_phase_id",
      fieldType: "select",
      fieldLabel: "Phase",
      width: "half",
      pickerName: "project_phase_option",
      required: true,
    },
    {
      fieldName: "schedule_health_id",
      fieldType: "select",
      fieldLabel: "Schedule Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      width: "half",
      fieldLabel: "Reported By",
      fieldName: "reported_by_contact_id",
      fieldType: "autocompleteTable",
      pickerName: "reported_by_contact_id_option",
      autocompleteTableColumns: [
        { field: "name", headerName: "Name" },
        { field: "ministry", headerName: "Ministry" },
      ],
      required: true,
      projectId: Number(projectId),
    },
    {
      fieldName: "budget_health_id",
      fieldType: "select",
      fieldLabel: "Budget Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      fieldName: "status_date",
      fieldType: "date",
      fieldLabel: "Status Date",
      width: "half",
      required: true,
    },
    {
      fieldName: "team_health_id",
      fieldType: "select",
      fieldLabel: "Team Health",
      width: "half",
      pickerName: "health_status_option",
    },
    {
      fieldName: "general_progress_comments",
      fieldType: "multiText",
      fieldLabel: "General and progress comments this period",
      width: "full",
      required: true,
    },
    {
      fieldName: "issues_and_decisions",
      fieldType: "multiText",
      fieldLabel: "Issues and necessary decisions this period",
      width: "full",
    },
    {
      fieldName: "forecast_and_next_steps",
      fieldType: "multiText",
      fieldLabel: "Forecast and next steps",
      width: "full",
    },
    {
      fieldName: "identified_risk",
      fieldType: "multiText",
      fieldLabel: "Risk watch list",
      width: "full",
    },
  ];

  const initialValues = {
    identified_risk: "",
    forecast_and_next_steps: "",
    issues_and_decisions: "",
    general_progress_comments: "",
    budget_health_id: "",
    status_date: null,
    schedule_health_id: "",
    reported_by_contact_id: "",
    health_id: "",
    project_phase_id: "",
    project_id: Number(projectId),
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/projects/status`;
  const updateUrl = `/projects/status/${query?.data?.data?.data?.id}`;
  const formTitle = "Project Status";
  const authorizedToEdit = "PMO-Manager-Edit-Capability";

  return {
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    formTitle,
    authorizedToEdit,
  };
};
