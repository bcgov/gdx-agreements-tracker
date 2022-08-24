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
