import { IEditFields } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

export const readFields = (amendmentsQuery: UseQueryResult<FormikValues>) => {
  return [  
    {
      value: amendmentsQuery?.data?.amendment_number.label,
      title: "Amendment Type",
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
      width: "full",
    },
  ];
};

export const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "amendment_number", 
      fieldType: "select",
      fieldLabel: "Amendment Type",
      width: "half",
      tableName: "contract_amendment",
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
};
