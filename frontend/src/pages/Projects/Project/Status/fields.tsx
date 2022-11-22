import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} reactQuery The react query data for specific project.
 * @returns {Array}
 */
export const projectStatusReadFields = (reactQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Phase", value: reactQuery?.data?.project_phase_id },
    { width: "half", title: "Overall Project Health", value: reactQuery?.data?.health_id },
    { width: "half", title: "Reported By", value: reactQuery?.data?.reported_by_contact_id },
    { width: "half", title: "Schedule Health", value: reactQuery?.data?.schedule_health_id },
    { width: "half", title: "Start Date", value: reactQuery?.data?.status_date },
    { width: "half", title: "Budget Health", value: reactQuery?.data?.budget_health_id },
    {
      width: "half",
      title: "General and progress comments this period",
      value: reactQuery?.data?.general_progress_comments,
    },
    { width: "half", title: "Team Health", value: reactQuery?.data?.team_health_id },

    {
      width: "half",
      title: "Issues and necessary decisions this period",
      value: reactQuery?.data?.issues_and_decisions,
    },
    {
      width: "half",
      title: "Forecast and next steps",
      value: reactQuery?.data?.forecast_and_next_steps,
    },

    { width: "half", title: "Risk watch list", value: reactQuery?.data?.identified_risk },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const projectStatusEditFields: IEditField[] = [
  {
    fieldName: "project_phase_id",
    fieldType: "singleText",
    fieldLabel: "Phase",
    width: "half",
  },
  {
    fieldName: "health_id",
    fieldType: "singleText",
    fieldLabel: "Overall Project Health",
    width: "half",
  },
  {
    fieldName: "reported_by_contact_id",
    fieldType: "singleText",
    fieldLabel: "Reported By",
    width: "half",
  },
  {
    fieldName: "schedule_health_id",
    fieldType: "singleText",
    fieldLabel: "Schedule Health",
    width: "half",
  },
  {
    fieldName: "status_date",
    fieldType: "singleText",
    fieldLabel: "Start Date",
    width: "half",
  },
  {
    fieldName: "budget_health_id",
    fieldType: "singleText",
    fieldLabel: "Budget Health",
    width: "half",
  },
  {
    fieldName: "general_progress_comments",
    fieldType: "singleText",
    fieldLabel: "General and progress comments this period",
    width: "half",
  },
  {
    fieldName: "team_health_id",
    fieldType: "singleText",
    fieldLabel: "Team Health",
    width: "half",
  },
  {
    fieldName: "issues_and_decisions",
    fieldType: "singleText",
    fieldLabel: "Issues and necessary decisions this period",
    width: "half",
  },
  {
    fieldName: "forecast_and_next_steps",
    fieldType: "singleText",
    fieldLabel: "Forecast and next steps",
    width: "half",
  },
  {
    fieldName: "identified_risk",
    fieldType: "singleText",
    fieldLabel: "Risk watch list",
    width: "half",
  },  
];
