import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query ? [] : [];

  const editFields: IEditField[] = [];

  const initialValues = {
    supplier_number: null,
  };

  const rowId = query?.data?.data?.data?.id ?? null;
  const rowsToLock = null === rowId ? [] : [Number(rowId)];
  const postUrl = `/`;
  const updateUrl = `/`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
