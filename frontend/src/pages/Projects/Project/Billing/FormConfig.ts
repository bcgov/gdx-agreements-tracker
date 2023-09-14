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
          title: "Journal Voucher Number",
          value: query?.data?.data?.data?.jv_number,
        },
        {
          width: "full",
          title: "Billed Date",
          value: formatDate(query?.data?.data?.data?.billed_date),
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
      required: true,
    },
    {
      fieldName: "billed_date",
      fieldLabel: "Billed Date",
      fieldType: "date",
      width: "full",
      required: true,
    },
    {
      fieldName: "amount",
      fieldLabel: "Amount",
      fieldType: "singleText",
      width: "full",
      required: true,
    },
    {
      fieldName: "fiscal_year_id",
      fieldLabel: "Fiscal Year",
      fieldType: "select",
      pickerName: "fiscal_year_option",
      width: "half",
      required: true,
    },
    {
      fieldName: "quarter",
      fieldLabel: "Quarter",
      fieldType: "number",
      width: "half",
      required: true,
    },
    {
      fieldName: "client_coding_id",
      fieldLabel: "Program Area",
      fieldType: "select",
      pickerName: "client_coding_option",
      projectId: query?.data?.data?.data?.project_id,
      width: "half",
      required: true,
    },
  ];

  const initialValues = {
    jv_number: null,
    billed_date: null,
    amount: null,
    fiscal_year_id: null,
    client_coding_id: null,
    quarter: null,
    project_id: projectId,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/jv`;
  const updateUrl = `/jv/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
