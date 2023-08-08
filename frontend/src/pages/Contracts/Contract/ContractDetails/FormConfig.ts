import { AxiosResponse } from "axios";
import { IEditField, IOption } from "types";

export const FormConfig = (query: AxiosResponse | undefined) => {
  console.log("query", query?.data?.data);
  const readFields =
    !query || Array.isArray(query?.data?.data?.data)
      ? []
      : [
          {
            width: "half",
            title: "Change Order Number",
            value: query?.data?.data?.data?.co_number,
          },
          {
            width: "half",
            title: "Contract Number",
            value: query?.data?.data?.data?.contract_number,
          },
          { width: "half", title: "Status", value: query?.data?.data?.data?.status?.label },
          {
            width: "half",
            title: "Amendment Number",
            value: query?.data?.data?.data?.amendment_number,
          },
          { width: "half", title: "Fiscal", value: query?.data?.data?.data?.fiscal?.label },
          {
            width: "half",
            title: "Project Number",
            value: query?.data?.data?.data?.project_id?.label,
          },
          {
            width: "half",
            title: "Contract Type",
            value: query?.data?.data?.data?.contract_type?.label,
          },
          { width: "half", title: "Project Name", value: query?.data?.data?.data?.project_name },
          { width: "half", title: "Supplier", value: query?.data?.data?.data?.supplier_id?.label },
          {
            width: "half",
            title: "Maximum Amount Payable",
            value: query?.data?.data?.data?.total_project_budget,
          },
          {
            width: "half",
            title: "Subcontractors",
            value: query?.data?.data?.data?.subcontractor_id
              .map((s: IOption) => {
                return s.label;
              })
              .join(", "),
          },
          {
            width: "half",
            title: "Total Fees Payable",
            value: query?.data?.data?.data?.total_fee_amount,
          },
          {
            width: "half",
            title: "Total Expenses Payable",
            value: query?.data?.data?.data?.total_expense_amount,
          },
          {
            width: "half",
            title: "Requisition Number",
            value: query?.data?.data?.data?.requisition_number,
          },
          {
            width: "half",
            title: "Assignment Start Date",
            value: query?.data?.data?.data?.start_date,
          },
          {
            width: "half",
            title: "Procurement Method",
            value: query?.data?.data?.data?.procurement_method_id?.label,
          },
          { width: "half", title: "Assignment End Date", value: query?.data?.data?.data?.end_date },
          {
            width: "full",
            title: "Contact Assignment Description",
            value: query?.data?.data?.data?.description,
          },
          { width: "full", title: "Notes", value: query?.data?.data?.data?.notes },
        ];

  const editFields: IEditField[] = [
    {
      fieldName: "co_number",
      fieldType: "singleText",
      fieldLabel: "Change Order Number",
      width: "half",
      required: true,
    },
    {
      fieldName: "contract_number",
      fieldType: "singleText",
      fieldLabel: "Contract Number",
      width: "half",
    },
    {
      fieldName: "status",
      fieldType: "select",
      fieldLabel: "Status",
      width: "half",
      tableName: "contracts",
      required: true,
    },
    {
      fieldName: "amendment_number",
      fieldType: "readonly",
      fieldLabel: "Amendment Number",
      width: "half",
    },
    {
      fieldName: "fiscal",
      fieldType: "select",
      fieldLabel: "Fiscal",
      width: "half",
      pickerName: "fiscal_year_option",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "Project Number",
      fieldName: "project_id",
      fieldType: "select",
      pickerName: "project_option",
    },
    {
      width: "half",
      fieldLabel: "Contract Type",
      fieldName: "contract_type",
      fieldType: "select",
      tableName: "contracts",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "Project Name",
      fieldName: "project_name",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Supplier",
      fieldName: "supplier_id",
      fieldType: "select",
      pickerName: "supplier_option",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "Maximum Amount Payable",
      fieldName: "total_project_budget",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Subcontractors",
      fieldName: "subcontractor_id",
      fieldType: "multiselect",
      pickerName: "subcontractor_option",
    },
    {
      width: "half",
      fieldLabel: "Total Fees Payable",
      fieldName: "total_fee_amount",
      fieldType: "number",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "Total Expenses Payable",
      fieldName: "total_expense_amount",
      fieldType: "number",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "Requisition Number",
      fieldName: "requisition_number",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Assignment Start Date",
      fieldName: "start_date",
      fieldType: "date",
      required: true,
    },
    {
      width: "half",
      fieldLabel: "Procurement Method",
      fieldName: "procurement_method_id",
      fieldType: "select",
      pickerName: "procurement_method_option",
    },
    {
      width: "half",
      fieldLabel: "Assignment End Date",
      fieldName: "end_date",
      fieldType: "date",
      required: true,
    },
    {
      width: "full",
      fieldLabel: "Contact Assignment Description",
      fieldName: "description",
      fieldType: "multiText",
    },
    { width: "full", fieldLabel: "Notes", fieldName: "notes", fieldType: "multiText" },
  ];

  const initialValues = {
    contract_number: "",
    status: "",
    fiscal: "",
    project_id: null,
    contract_type: "",
    supplier_id: "",
    subcontractor_id: [],
    total_fee_amount: "",
    total_expense_amount: "",
    requisition_number: "",
    start_date: null,
    procurement_method_id: null,
    end_date: null,
    description: "",
    notes: "",
  };
  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/contracts/`;
  const updateUrl = `/contracts/deliverables/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
