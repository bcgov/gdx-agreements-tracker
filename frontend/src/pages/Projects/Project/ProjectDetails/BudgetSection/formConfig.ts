import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Q1 Amount",
          value: query?.data?.data?.data?.q1_amount,
        },
        {
          width: "half",
          title: "Q1 Recovered",
          value: query?.data?.data?.data?.q1_recovered,
        },
        {
          width: "half",
          title: "Q2 Amount",
          value: query?.data?.data?.data?.q2_amount,
        },
        {
          width: "half",
          title: "Q2 Recovered",
          value: query?.data?.data?.data?.q2_recovered,
        },
        {
          width: "half",
          title: "Q3 Amount",
          value: query?.data?.data?.data?.q3_amount,
        },
        {
          width: "half",
          title: "Q3 Recovered",
          value: query?.data?.data?.data?.q3_recovered,
        },
        {
          width: "half",
          title: "Q4 Amount",
          value: query?.data?.data?.data?.q4_amount,
        },
        {
          width: "half",
          title: "Q4 Recovered",
          value: query?.data?.data?.data?.q4_recovered,
        },
        {
          width: "half",
          title: "Fiscal",
          value: query?.data?.data?.data?.fiscal.label,
        },
        {
          width: "half",
          title: "Deliverable Name",
          value: query?.data?.data?.data?.project_deliverable_id.label,
        },
        {
          width: "half",
          title: "Notes",
          value: query?.data?.data?.data?.notes,
        },
        {
          width: "half",
          title: "Detail Amount",
          value: query?.data?.data?.data?.detail_amount,
        },
        {
          width: "half",
          title: "Recovery Area",
          value: query?.data?.data?.data?.recovery_area.label,
        },
        {
          width: "half",
          title: "Resource Type",
          value: query?.data?.data?.data?.resource_type.label,
        },
        {
          width: "half",
          title: "Stop",
          value: query?.data?.data?.data?.stob,
        },
        {
          width: "half",
          title: "Client Coding",
          value: query?.data?.data?.data?.client_coding_id?.label,
        },
        {
          width: "half",
          title: "Contract",
          value: query?.data?.data?.data?.contract_id.label,
        },
      ];

  const editFields: IEditField[] = [
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
      projectId: query?.data?.data?.data?.project_id,
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
      projectId: query?.data?.data?.data?.project_id,
    },
    {
      width: "half",
      fieldLabel: "Contract",
      fieldName: "contract_id",
      fieldType: "select",
      pickerName: "budget_contract_option",
      projectId: query?.data?.data?.data?.project_id,
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
  const queryKey = `/projects/budget/${query?.data?.data?.data?.id}`;
  const postUrl = `/projects/budget`;
  const updateUrl = `/projects/budget/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, queryKey, postUrl, updateUrl };
};
