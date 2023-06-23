import { IEditField } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} suppliersQuery The react query data for specific subcontractor.
 * @returns {Array}
 */
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

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditField[] = [
  {
    fieldName: "supplier_number",
    fieldType: "number",
    fieldLabel: "Supplier Number",
    width: "half",
  },
  {
    fieldName: "site_number",
    fieldType: "singleText",
    fieldLabel: "Site Number",
    width: "half",
  },
  {
    fieldName: "supplier_name",
    fieldType: "singleText",
    fieldLabel: "Supplier Name",
    width: "half",
  },
  {
    fieldName: "signing_authority_name",
    fieldType: "singleText",
    fieldLabel: "Signing Authority Name",
    width: "half",
  },
  {
    fieldName: "signing_authority_title",
    fieldType: "singleText",
    fieldLabel: "Signing Authority Title",
    width: "half",
  },
  {
    fieldName: "address",
    fieldType: "singleText",
    fieldLabel: "Address",
    width: "half",
  },
  {
    fieldName: "city",
    fieldType: "singleText",
    fieldLabel: "City",
    width: "half",
  },
  {
    fieldName: "province",
    fieldType: "singleText",
    fieldLabel: "Province",
    width: "half",
  },
  {
    fieldName: "country",
    fieldType: "singleText",
    fieldLabel: "Country",
    width: "half",
  },
  {
    fieldName: "postal_code",
    fieldType: "singleText",
    fieldLabel: "Postal Code",
    width: "half",
  },
  {
    fieldName: "phone",
    fieldType: "singleText",
    fieldLabel: "Phone",
    width: "half",
  },
  {
    fieldName: "fax",
    fieldType: "singleText",
    fieldLabel: "Fax",
    width: "half",
  },
  {
    fieldName: "email",
    fieldType: "singleText",
    fieldLabel: "Email",
    width: "half",
  },
  {
    fieldName: "website",
    fieldType: "singleText",
    fieldLabel: "Website",
    width: "half",
  },
  {
    fieldName: "financial_contact_name",
    fieldType: "singleText",
    fieldLabel: "Financial Contact Name",
    width: "half",
  },
  {
    fieldName: "financial_contact_phone",
    fieldType: "singleText",
    fieldLabel: "Financial Contact Phone",
    width: "half",
  },
  {
    fieldName: "financial_contact_email",
    fieldType: "singleText",
    fieldLabel: "Financial Contact Email",
    width: "half",
  },
  {
    fieldName: "supplier_legal_name",
    fieldType: "singleText",
    fieldLabel: "Supplier Legal Name",
    width: "half",
  },
];
