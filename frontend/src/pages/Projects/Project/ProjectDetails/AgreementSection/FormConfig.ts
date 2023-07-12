import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const formFields = (query: AxiosResponse | undefined) => {
  const readFields = [
    {
      width: "half",
      title: "Agreement Type",
      value: query?.data?.data?.agreement_type?.label,
    },
    { width: "half", title: "Start Date", value: query?.data?.data?.agreement_start_date },
    { width: "half", title: "Signed Date", value: query?.data?.data?.agreement_signed_date },
    { width: "half", title: "End Date", value: query?.data?.data?.agreement_end_date },
    { width: "full", title: "Description", value: query?.data?.data?.description },
    { width: "full", title: "Notes", value: query?.data?.data?.notes },
  ];

  const editFields: IEditField[] = [
    {
      fieldName: "agreement_type",
      fieldLabel: "Agreement Type",
      fieldType: "select",
      width: "half",
      tableName: "project",
    },
    {
      fieldName: "agreement_start_date",
      fieldLabel: "Agreement Start Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "agreement_signed_date",
      fieldLabel: "Agreement Signed Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "agreement_end_date",
      fieldLabel: "Agreement End Date",
      fieldType: "date",
      width: "half",
    },
    {
      fieldName: "description",
      fieldLabel: "Description",
      fieldType: "multiText",
      width: "full",
    },
    {
      fieldName: "notes",
      fieldLabel: "Notes",
      fieldType: "multiText",
      width: "full",
    },
  ];

  return { readFields, editFields };
};
