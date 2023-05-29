import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Fiscal", value: query?.data?.data?.data?.fiscal?.label },
        { width: "half", title: "Resource", value: query?.data?.data?.data?.resource_id?.label },
        {
          width: "half",
          title: "Supplier Rate",
          value: query?.data?.data?.data?.supplier_rate_id?.label,
        },
        {
          width: "half",
          title: "Assignment Role",
          value: query?.data?.data?.data?.assignment_role,
        },
        {
          width: "half",
          title: "Assignment Rate",
          value: query?.data?.data?.data?.assignment_rate,
        },
        { width: "half", title: "# Hours Req.", value: query?.data?.data?.data?.hours },
        { width: "half", title: "Start Date", value: query?.data?.data?.data?.start_date },
        { width: "half", title: "End Date", value: query?.data?.data?.data?.end_date },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Fiscal",
      fieldName: "fiscal",
      fieldType: "select",
      pickerName: "fiscal_year_option",
    },
    {
      width: "half",
      fieldLabel: "Resource",
      fieldName: "resource_id",
      fieldType: "select",
      pickerName: "resource_option",
    },
    {
      width: "half",
      fieldLabel: "Supplier Rate",
      fieldName: "supplier_rate_id",
      fieldType: "select",
      pickerName: "supplier_rate_option",
    },
    {
      width: "half",
      fieldLabel: "Assignment Role",
      fieldName: "assignment_role",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Assignment Rate",
      fieldName: "assignment_rate",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "# Hours Req.",
      fieldName: "hours",
      fieldType: "number",
    },
    {
      width: "half",
      fieldLabel: "Start Date",
      fieldName: "start_date",
      fieldType: "date",
    },
    {
      width: "half",
      fieldLabel: "End Date",
      fieldName: "end_date",
      fieldType: "date",
    },
  ];

  /**
   * Inital values for create form.
   */
  const initialValues = {
    fiscal: "",
    resource_id: "",
    supplier_rate_id: "",
    assignment_rate: 0,
    hours: 0,
    start_date: null,
    end_date: null,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/contracts/${query?.data?.data?.data?.id}/resources`;
  const updateUrl = `/contracts/resources/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
