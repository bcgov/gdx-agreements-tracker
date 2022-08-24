import { IEditFields } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

export const readFields = (amendmentsQuery: UseQueryResult<FormikValues>) => {
  return [
    {
      value: amendmentsQuery?.data?.contract_id,
      title: "Contract Id",
      width: "half",
    },
    {
      value: amendmentsQuery?.data?.amendment_number,
      title: "Amendment type",
      width: "half",
    },
    {
      value: amendmentsQuery?.data?.amendment_date,
      title: "Amendment Date",
      width: "half",
    },
    {
      value: amendmentsQuery?.data?.description,
      title: "Description",
      width: "half",
    },
  ];
};

export const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "contract_id",
      fieldType: "number",
      fieldLabel: "Contractd",
      width: "half",
    },
    {
      fieldName: "amendment_number", //will be a lookup
      fieldType: "number",
      fieldLabel: "Amendment type",
      width: "half",
    },
    {
      fieldName: "amendment_date",
      fieldType: "date",
      fieldLabel: "Amendment Date",
      width: "half",
    },
    {
      fieldName: "description",
      fieldType: "singleText",
      fieldLabel: "Description",
      width: "half",
    },
  ];
};

z
