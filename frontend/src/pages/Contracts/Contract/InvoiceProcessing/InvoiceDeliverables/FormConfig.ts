import { AxiosResponse } from "axios";
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
          title: "Deliverables / Expense",
          value: query?.data?.data?.data?.contract_deliverable_id?.label,
        },
        { width: "half", title: "Fiscal Year", value: query?.data?.data?.data?.fiscal_year },
        { width: "half", title: "Amount", value: query?.data?.data?.data?.rate },
        {
          width: "half",
          title: "Amount Remaining",
          value: query?.data?.data?.data?.amount_remaining,
        },
      ];
  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Deliverables / Expense",
      fieldName: "contract_deliverable_id",
      fieldType: "select",
      pickerName: "contract_deliverable",
      contractId: Number(contractId),
    },
    { width: "half", fieldLabel: "Fiscal Year", fieldName: "fiscal_year", fieldType: "readonly" },
    { width: "half", fieldLabel: "Amount", fieldName: "rate", fieldType: "number" },
    {
      width: "half",
      fieldLabel: "Amount Remaining",
      fieldName: "amount_remaining",
      fieldType: "readonly",
    },
  ];

  /**
   * Inital values for create form.
   */
  const initialValues = {
    contract_deliverable_id: "",
    rate: 0,
    unit_amount: 1,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/invoices/${invoiceId}/deliverables`;
  const updateUrl = `/invoices/deliverables/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
