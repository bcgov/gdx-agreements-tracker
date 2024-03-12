import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import formatDate from "utils/formatDate";
import { object, string, array } from "yup";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { contractId } = useParams();
  const readFields = !query
    ? []
    : [
        {
          value: query?.data?.data?.data?.amendment_number,
          title: "Amendment Number",
          width: "half",
          type: "readonly",
        },
        {
          value:
            query?.data?.data?.data?.amendment_types.map((item: { label: string }) => item.label) ||
            [],
          title: "Amendment Type",
          width: "half",
        },
        {
          value: formatDate(query?.data?.data?.data?.amendment_date),
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
      fieldType: "readonly",
      fieldLabel: "Amendment Number",
      width: "half",
      required: true,
    },
    {
      fieldName: "amendment_types",
      fieldType: "multiselect",
      fieldLabel: "Amendment Type",
      width: "half",
      pickerName: "amendment_type_option",
      required: true,
    },

    {
      fieldName: "amendment_date",
      fieldType: "date",
      fieldLabel: "Amendment Date",
      width: "half",
      required: true,
    },
    {
      fieldName: "description",
      fieldType: "multiText",
      fieldLabel: "Description",
      width: "full",
      required: true,
    },
  ];

  /**
   * Inital values for create form.
   */
  const initialValues = {
    description: "",
    amendment_date: null,
    contract_id: contractId,
    amendment_types: [],
  };

  const validationSchema = object({
    description: string().required("Description is required."),
    amendment_date: string().nullable().required("Amendment date is required."),
    amendment_types: array()
      .min(1)
      .of(
        object({
          value: string().required("Value is required"),
          label: string().required("Label is required"),
        })
      )
      .required("Amendment type is required"),
  });

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/amendments`;
  const updateUrl = `/amendments/${query?.data?.data?.data?.id}`;

  const formTitle = "Contract Amendments";

  return {
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    validationSchema,
    formTitle,
  };
};
