import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

export const readFields = (suppliersQuery: UseQueryResult<FormikValues>) => {
  return [
    {
      value: suppliersQuery?.data?.supplier_number,
      title: "Supplier Number",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.site_number,
      title: "Site Number",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.supplier_name,
      title: "Supplier Name",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.signing_authority_name,
      title: "Signing Authority Name",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.signing_authority_title,
      title: "Signing Authority Title",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.address,
      title: "Address",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.city,
      title: "City",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.province,
      title: "Province",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.country,
      title: "Country",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.postal_code,
      title: "Postal Code",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.phone,
      title: "Phone",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.fax,
      title: "Fax",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.email,
      title: "Email",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.website,
      title: "Website",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.financial_contact_name,
      title: "Financial Contact Name",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.financial_contact_phone,
      title: "Financial Contact Phone",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.financial_contact_email,
      title: "Financial Contact Email",
      width: "half",
    },
    {
      value: suppliersQuery?.data?.supplier_legal_name,
      title: "Supplier Legal Name",
      width: "half",
    },
  ];
};
