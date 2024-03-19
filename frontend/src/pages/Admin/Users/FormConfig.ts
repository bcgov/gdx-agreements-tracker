import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        { width: "half", title: "First Name", value: query?.data?.data?.data?.user.firstName },
        { width: "half", title: "Last Name", value: query?.data?.data?.data?.user.lastName },
        { width: "half", title: "Email", value: query?.data?.data?.data?.user.email },

        {
          width: "half",
          title: "Role",
          value: query?.data?.data?.data?.user.role,
          type: "multiSelect",
        },
      ];

  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "First Name",
      fieldName: "firstName",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Last Name",
      fieldName: "lastName",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Email",
      fieldName: "email",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Role",
      fieldName: "role",
      fieldType: "readonly",
    },
  ];

  const initialValues = {
    email: null,
    firstName: null,
    lastName: null,
    role: null,
  };

  const rowId = query?.data?.data?.data?.user.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/`;
  const updateUrl = `/`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
