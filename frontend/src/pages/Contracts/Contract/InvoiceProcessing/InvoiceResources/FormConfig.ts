import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>, invoiceId: number) => {
  const { contractId } = useParams();

  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Resource Assignment",
          value: query?.data?.data?.data?.contract_resource_id?.label,
        },
        { width: "half", title: "Fiscal Year", value: query?.data?.data?.data?.fiscal_year },
        { width: "half", title: "Hours", value: query?.data?.data?.data?.unit_amount },
        { width: "half", title: "Rate", value: query?.data?.data?.data?.rate },
        {
          width: "half",
          title: "Amount",
          value: query?.data?.data?.data?.rate * query?.data?.data?.data?.unit_amount,
        },
        {
          width: "half",
          title: "Amount Remaining",
          value: query?.data?.data?.data?.amount_remaining,
        },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Resource Assignment",
      fieldName: "contract_resource_id",
      fieldType: "select",
      pickerName: "contract_resource",
      contractId: query?.data?.data?.data?.contract_resource_id,
    },
    { width: "half", fieldLabel: "Fiscal Year", fieldName: "fiscal_year", fieldType: "readonly" },
    { width: "half", fieldLabel: "Hours", fieldName: "unit_amount", fieldType: "number" },
    { width: "half", fieldLabel: "Rate", fieldName: "rate", fieldType: "readonly" },
    {
      width: "half",
      fieldLabel: "Amount Remaining",
      fieldName: "amount_remaining",
      fieldType: "readonly",
    },
  ];

  const initialValues = {
    contract_resource_id: "",
    unit_amount: 0,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/invoices/${invoiceId}/resources`;
  const updateUrl = `/invoices/resources/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
