import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { contractId } = useParams();

  const readFields = !query
    ? []
    : [
        { width: "half", title: "Invoice Number", value: query?.data?.data?.data?.invoice_number },
        { width: "half", title: "Received Date", value: query?.data?.data?.data?.received_date },
        { width: "half", title: "Invoice Date", value: query?.data?.data?.data?.invoice_date },
        { width: "half", title: "Due Date", value: query?.data?.data?.data?.due_date },
        { width: "half", title: "Billing Period", value: query?.data?.data?.data?.billing_period },
        { width: "half", title: "Fiscal Year", value: query?.data?.data?.data?.fiscal?.label },
        { width: "half", title: "GL", value: query?.data?.data?.data?.is_gl },
        { width: "full", title: "Notes", value: query?.data?.data?.data?.notes },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Invoice Number",
      fieldName: "invoice_number",
      fieldType: "singleText",
    },
    { width: "half", fieldLabel: "Invoice Date", fieldName: "invoice_date", fieldType: "date" },
    {
      width: "half",
      fieldLabel: "Received Date",
      fieldName: "received_date",
      fieldType: "date",
      required: true,
    },
    { width: "half", fieldLabel: "Due Date", fieldName: "due_date", fieldType: "date" },
    {
      width: "half",
      fieldLabel: "Billing Period",
      fieldName: "billing_period",
      fieldType: "select",
      tableName: "generic",
    },
    {
      fieldName: "fiscal",
      fieldType: "select",
      fieldLabel: "Fiscal Year",
      width: "half",
      pickerName: "fiscal_year_option",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "General Ledger",
      fieldName: "is_gl",
      fieldType: "checkbox",
      required: true,
    },
    { width: "full", fieldLabel: "Notes", fieldName: "notes", fieldType: "multiText" },
  ];

  const initialValues = {
    invoice_number: "",
    invoice_date: null,
    received_date: null,
    due_date: null,
    billing_period: "",
    fiscal: null,
    is_gl: false,
    notes: "",
    contract_id: Number(contractId),
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/contracts/${contractId}/invoices`;
  const updateUrl = `/invoices/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
