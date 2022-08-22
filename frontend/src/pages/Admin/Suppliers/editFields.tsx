import { IEditFields } from "types";

export const editFields: () => IEditFields[] = () => {
  return [
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
};
