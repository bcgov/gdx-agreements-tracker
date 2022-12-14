import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} query The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (query: UseQueryResult<FormikValues>) => {
  return [
    {
      width: "half",
      title: "Q1 Amount",
      value: query?.data?.q1_amount,
    },
    {
      width: "half",
      title: "Q1 Recovered",
      value: query?.data?.q1_recovered,
    },
    {
      width: "half",
      title: "Q2 Amount",
      value: query?.data?.q2_amount,
    },
    {
      width: "half",
      title: "Q2 Recovered",
      value: query?.data?.q2_recovered,
    },
    {
      width: "half",
      title: "Q3 Amount",
      value: query?.data?.q3_amount,
    },
    {
      width: "half",
      title: "Q3 Recovered",
      value: query?.data?.q3_recovered,
    },
    {
      width: "half",
      title: "Q4 Amount",
      value: query?.data?.q4_amount,
    },
    {
      width: "half",
      title: "Q4 Recovered",
      value: query?.data?.q4_recovered,
    },
    {
      width: "half",
      title: "Fiscal",
      value: query?.data?.fiscal.label,
    },
    {
      width: "half",
      title: "Deliverable Name",
      value: query?.data?.project_deliverable_id.label,
    },
    {
      width: "half",
      title: "Notes",
      value: query?.data?.notes,
    },
    {
      width: "half",
      title: "Detail Amount",
      value: query?.data?.detail_amount,
    },
    {
      width: "half",
      title: "Recovery Area",
      value: query?.data?.recovery_area.label,
    },
    {
      width: "half",
      title: "Resource Type",
      value: query?.data?.resource_type.label,
    },
    {
      width: "half",
      title: "Stop",
      value: query?.data?.stob,
    },
    {
      width: "half",
      title: "Client Coding",
      value: query?.data?.client_coding_id?.label,
    },
    {
      width: "half",
      title: "Contract",
      value: query?.data?.contract_id.label,
    },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number|undefined} projectId The project id, which allows for specific picker options to use only project related options.
 * @returns {Array}
 */
export const editFields: (projectId: number | undefined) => IEditField[] = (projectId) => {
  return [
    {
      width: "half",
      fieldLabel: "Q1 Amount",
      fieldName: "q1_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Q1 Recovered",
      fieldName: "q1_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q2 Amount",
      fieldName: "q2_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Q2 Recovered",
      fieldName: "q2_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q3 Amount",
      fieldName: "q3_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Q3 Recovered",
      fieldName: "q3_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q4 Amount",
      fieldName: "q4_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Q4 Recovered",
      fieldName: "q4_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Fiscal",
      fieldName: "fiscal",
      fieldType: "select",
      pickerName: "fiscal_year_option",
    },
    {
      width: "half",
      fieldLabel: "Notes",
      fieldName: "notes",
      fieldType: "multiText",
    },
    {
      width: "half",
      fieldLabel: "Project Deliverables",
      fieldName: "project_deliverable_id",
      fieldType: "select",
      pickerName: "project_deliverable_option",
      projectId: projectId,
    },
    {
      width: "half",
      fieldLabel: "Detail Amount",
      fieldName: "detail_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Recovery Area",
      fieldName: "recovery_area",
      fieldType: "select",
      pickerName: "recovery_area_option",
    },
    {
      width: "half",
      fieldLabel: "Resource Type",
      fieldName: "resource_type",
      fieldType: "select",
      tableName: "project_budget",
    },
    {
      width: "half",
      fieldLabel: "Stob",
      fieldName: "stob",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Client Coding",
      fieldName: "client_coding_id",
      fieldType: "select",
      pickerName: "client_coding_option",
      projectId: projectId,
    },
    {
      width: "half",
      fieldLabel: "Contract",
      fieldName: "contract_id",
      fieldType: "select",
      pickerName: "budget_contract_option",
      projectId: projectId,
    },
  ];
};

/**
 * Inital values for create form.
 */
export const initialValues = {
  q1_amount: null,
  q1_recovered: null,
  q2_amount: null,
  q2_recovered: null,
  q3_amount: null,
  q3_recovered: null,
  q4_amount: null,
  q4_recovered: null,
  fiscal: null,
  project_deliverable_id: null,
  notes: null,
  detail_amount: null,
  recovery_area: null,
  resource_type: null,
  stob: null,
  client_coding_id: null,
  contract_id: null,
};
