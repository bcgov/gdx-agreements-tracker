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
      title: "Deliverable Name",
      value: query?.data?.deliverable_name,
    },
    {
      width: "half",
      title: "Description",
      value: query?.data?.description,
    },
    {
      width: "half",
      title: "Start Date",
      value: query?.data?.start_date,
    },
    {
      width: "half",
      title: "Completion Date",
      value: query?.data?.completion_date,
    },
    {
      width: "half",
      title: "Deliverable Amount",
      value: query?.data?.deliverable_amount,
    },
    {
      width: "half",
      title: "Recoverable Amount",
      value: query?.data?.recoverable_amount,
    },
    {
      width: "half",
      title: "Project",
      value: query?.data?.project_id.label,
    },
    {
      width: "half",
      title: "Comments",
      value: query?.data?.comments,
    },
    {
      width: "half",
      title: "Fiscal",
      value: query?.data?.fiscal.label,
    },
    {
      width: "half",
      title: "Deliverable Status",
      value: query?.data?.deliverable_status,
    },
    {
      width: "half",
      title: "Percent Complete",
      value: query?.data?.percent_complete,
    },
    {
      width: "half",
      title: "Health",
      value: query?.data?.health_id.label,
    },
    {
      width: "half",
      title: "Expense",
      value: query?.data?.is_expense,
    },
  ];
};

/**
 * The edit fields.
 *
 * @param   {number|undefined} projectId The project id, which allows for specific picker options to use only project related options.
 * @returns {Array}
 */
export const editFields: IEditField[] = [
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

/**
 * Inital values for create form.
 */

export const initialValues = (projectId: number | undefined) => {
  return {
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
};
