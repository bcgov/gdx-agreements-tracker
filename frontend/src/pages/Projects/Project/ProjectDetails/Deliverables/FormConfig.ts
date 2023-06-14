import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Deliverable Name",
          value: query?.data?.data?.data?.deliverable_name,
        },
        {
          width: "half",
          title: "Description",
          value: query?.data?.data?.data?.description,
        },
        {
          width: "half",
          title: "Start Date",
          value: query?.data?.data?.data?.start_date,
        },
        {
          width: "half",
          title: "Completion Date",
          value: query?.data?.data?.data?.completion_date,
        },
        {
          width: "half",
          title: "Deliverable Amount",
          value: query?.data?.data?.data?.deliverable_amount,
        },
        {
          width: "half",
          title: "Recoverable Amount",
          value: query?.data?.data?.data?.recoverable_amount,
        },
        {
          width: "half",
          title: "Project",
          value: query?.data?.data?.data?.project_id.label,
        },
        {
          width: "half",
          title: "Comments",
          value: query?.data?.data?.data?.comments,
        },
        {
          width: "half",
          title: "Fiscal",
          value: query?.data?.data?.data?.fiscal.label,
        },
        {
          width: "half",
          title: "Deliverable Status",
          value: query?.data?.data?.data?.deliverable_status,
        },
        {
          width: "half",
          title: "Percent Complete",
          value: query?.data?.data?.data?.percent_complete,
        },
        {
          width: "half",
          title: "Health",
          value: query?.data?.data?.data?.health_id.label,
        },
        {
          width: "half",
          title: "Expense",
          value: query?.data?.data?.data?.is_expense,
        },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Deliverable Name",
      fieldName: "deliverable_name",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Description",
      fieldName: "description",
      fieldType: "multiText",
    },
    {
      width: "half",
      fieldLabel: "Start Date",
      fieldName: "start_date",
      fieldType: "date",
    },
    {
      width: "half",
      fieldLabel: "Completion Date",
      fieldName: "completion_date",
      fieldType: "date",
    },
    {
      width: "half",
      fieldLabel: "Deliverable Amount",
      fieldName: "deliverable_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Recoverable Amount",
      fieldName: "recoverable_amount",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Comments",
      fieldName: "comments",
      fieldType: "multiText",
    },
    {
      width: "half",
      fieldLabel: "Fiscal",
      fieldName: "fiscal",
      fieldType: "select",
      pickerName: "fiscal_year_option",
    },
    {
      fieldName: "deliverable_status",
      fieldType: "select",
      fieldLabel: "Deliverable Status",
      width: "half",
      tableName: "generic",
    },
    {
      width: "half",
      fieldLabel: "Percent Complete",
      fieldName: "percent_complete",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Health",
      fieldName: "health_id",
      fieldType: "select",
      pickerName: "health_status_option",
    },
    {
      width: "half",
      fieldLabel: "Is Expense",
      fieldName: "is_expense",
      fieldType: "checkbox",
    },
  ];

  const initialValues = {
    deliverable_name: null,
    description: null,
    start_date: null,
    completion_date: null,
    deliverable_amount: null,
    project_id: projectId,
    comments: null,
    fiscal: null,
    deliverable_status: null,
    percent_complete: null,
    health_id: null,
    is_expense: null,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `projects/deliverables`;
  const updateUrl = `projects/deliverables/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
