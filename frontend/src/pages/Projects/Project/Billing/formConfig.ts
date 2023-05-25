import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          width: "full",
          title: "Journal Voucher Number",
          value: query?.data?.data?.data?.jv_number,
        },
        {
          width: "full",
          title: "Billed Date",
          value: query?.data?.data?.data?.billed_date,
        },
        {
          width: "full",
          title: "Amount",
          value: query?.data?.data?.data?.amount,
        },
        {
          width: "half",
          title: "Fiscal Year",
          value: query?.data?.data?.data?.fiscal_year_id.label,
        },
        {
          width: "half",
          title: "Quarter",
          value: query?.data?.data?.data?.quarter,
        },
        {
          width: "half",
          title: "Program Area",
          value: query?.data?.data?.data?.client_coding_id?.label,
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "jv_number",
      fieldLabel: "Journal Voucher Number",
      fieldType: "singleText",
      width: "full",
    },
    {
      fieldName: "billed_date",
      fieldLabel: "Billed Date",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "amount",
      fieldLabel: "Amount",
      fieldType: "singleText",
      width: "full",
    },
    {
      fieldName: "fiscal_year_id",
      fieldLabel: "Fiscal Year",
      fieldType: "select",
      pickerName: "fiscal_year_option",
      width: "half",
    },
    {
      fieldName: "quarter",
      fieldLabel: "Quarter",
      fieldType: "number",
      width: "half",
    },
    {
      fieldName: "client_coding_id",
      fieldLabel: "Program Area",
      fieldType: "select",
      pickerName: "client_coding_option",
      projectId: query?.data?.data?.data?.project_id,
      width: "half",
    },
  ];

  const initialValues = {
    jv_number: "",
    billed_date: null,
    amount: 0,
    fiscal_year_id: null,
    client_coding_id: null,
    quarter: 1,
    project_id: query?.data?.data?.data?.project_id,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/jv`;
  const updateUrl = `/jv/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
