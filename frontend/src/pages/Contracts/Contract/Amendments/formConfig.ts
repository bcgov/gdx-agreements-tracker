import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          value: query?.data?.data?.data?.amendment_number.label,
          title: "Amendment Type",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.amendment_date,
          title: "Amendment Date",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.description,
          title: "Description",
          width: "full",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "amendment_number",
      fieldType: "select",
      fieldLabel: "Amendment Type",
      width: "half",
      pickerName: "amendment_type_option",
    },
    {
      fieldName: "amendment_date",
      fieldType: "date",
      fieldLabel: "Amendment Date",
      width: "half",
    },
    {
      fieldName: "description",
      fieldType: "multiText",
      fieldLabel: "Description",
      width: "full",
    },
  ];

  /**
   * Inital values for create form.
   */
  const initialValues = {
    description: "",
    amendment_date: "",
    contract_id: query?.data?.data?.data?.contract_id,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/amendments`;
  const updateUrl = `/amendments/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
