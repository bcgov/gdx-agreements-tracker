import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Label", value: query?.data?.data?.data?.label },
        { width: "half", title: "Value", value: query?.data?.data?.data?.value },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "label",
      fieldType: "singleText",
      fieldLabel: "Label",
      width: "half",
    },
    {
      fieldName: "value",
      fieldType: "singleText",
      fieldLabel: "Value",
      width: "half",
    },
  ];

  const initialValues = {
    label: "",
    value: "",
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/project_agreement_types_option`;
  const updateUrl = `/project_agreement_types_option/${rowId}`;

  const formTitle = "Project Agreement Types Option";

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl, formTitle };
};
