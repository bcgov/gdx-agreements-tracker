import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IEditField } from "types";
import formatDate from "utils/formatDate";

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
          title: "Start Date",
          value: formatDate(query?.data?.data?.data?.start_date),
        },
        {
          width: "half",
          title: "Completion Date",
          value: formatDate(query?.data?.data?.data?.completion_date),
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
          title: "Expense",
          value: query?.data?.data?.data?.is_expense,
        },
        {
          width: "full",
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
          title: "Percent Complete",
          value: query?.data?.data?.data?.percent_complete,
        },
        {
          width: "half",
          title: "Deliverable Status",
          value: query?.data?.data?.data?.deliverable_status,
        },
        {
          width: "half",
          title: "Health",
          value: query?.data?.data?.data?.health_id.label,
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
      fieldType: "money",
    },
    {
      width: "half",
      fieldLabel: "Recoverable Amount",
      fieldName: "recoverable_amount",
      fieldType: "money",
    },
    {
      width: "half",
      fieldLabel: "Is Expense",
      fieldName: "is_expense",
      fieldType: "checkbox",
    },
    {
      width: "full",
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
      width: "half",
      fieldLabel: "Percent Complete",
      fieldName: "percent_complete",
      fieldType: "number",
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
      fieldLabel: "Health",
      fieldName: "health_id",
      fieldType: "select",
      pickerName: "health_status_option",
    },
  ];

  const initialValues = {
    deliverable_name: null,
    start_date: null,
    completion_date: null,
    deliverable_amount: null,
    recoverable_amount: null,
    is_expense: null,
    comments: null,
    fiscal: null,
    percent_complete: null,
    deliverable_status: null,
    health_id: null,
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `projects/deliverables`;
  const updateUrl = `projects/deliverables/${rowId}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
