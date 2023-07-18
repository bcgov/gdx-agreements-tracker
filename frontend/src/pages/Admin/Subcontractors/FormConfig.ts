import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          value: query.data?.data?.data?.subcontractor_name,
          title: "Subcontractor Name",
          width: "half",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "subcontractor_name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
    },
  ];

  const initialValues = {
    subcontractor_name: "",
  };

  const rowsToLock = [Number(query.data?.data?.data?.id)];
  const postUrl = `/subcontractors`;
  const updateUrl = `/subcontractors/${query.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
