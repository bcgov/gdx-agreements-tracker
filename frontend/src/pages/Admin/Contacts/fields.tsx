import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditFields } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} reactQuery The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (reactQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "First Name", value: reactQuery?.data?.first_name },
    { width: "half", title: "Street Name", value: reactQuery?.data?.address },
    { width: "half", title: "Last Name", value: reactQuery?.data?.last_name },
    { width: "half", title: "City", value: reactQuery?.data?.city },
    { width: "half", title: "Job Title", value: reactQuery?.data?.contact_title },
    { width: "half", title: "State/Province", value: reactQuery?.data?.province },
    { width: "half", title: "Ministry ID", value: reactQuery?.data?.ministry_id.label },
    { width: "half", title: "Country", value: reactQuery?.data?.country },
    { width: "half", title: "Business Phone", value: reactQuery?.data?.contact_phone },
    { width: "half", title: "Postal Code", value: reactQuery?.data?.postal },
    { width: "half", title: "Mobile Phone", value: reactQuery?.data?.mobile },
    { width: "half", title: "Website", value: reactQuery?.data?.website },
    { width: "half", title: "Email", value: reactQuery?.data?.email },
    { width: "half", title: "Notes", value: reactQuery?.data?.notes },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditFields[] = [
  {
    fieldName: "first_name",
    fieldType: "singleText",
    fieldLabel: "First Name",
    width: "half",
  },
  {
    fieldName: "address",
    fieldType: "singleText",
    fieldLabel: "Street Name",
    width: "half",
  },
  {
    fieldName: "last_name",
    fieldType: "singleText",
    fieldLabel: "Last Name",
    width: "half",
  },
  {
    fieldName: "city",
    fieldType: "singleText",
    fieldLabel: "City",
    width: "half",
  },
  {
    fieldName: "contact_title",
    fieldType: "singleText",
    fieldLabel: "Job Title",
    width: "half",
  },
  {
    fieldName: "province",
    fieldType: "singleText",
    fieldLabel: "State/Province",
    width: "half",
  },
  {
    fieldName: "ministry_id",
    fieldType: "select",
    fieldLabel: "Ministry ID",
    width: "half",
    pickerName: "ministry_option",
  },
  {
    fieldName: "country",
    fieldType: "singleText",
    fieldLabel: "Country",
    width: "half",
  },
  {
    fieldName: "contact_phone",
    fieldType: "singleText",
    fieldLabel: "Business Phone",
    width: "half",
  },
  {
    fieldName: "postal",
    fieldType: "singleText",
    fieldLabel: "Postal Code",
    width: "half",
  },
  {
    fieldName: "mobile",
    fieldType: "singleText",
    fieldLabel: "Mobile Phone",
    width: "half",
  },
  {
    fieldName: "website",
    fieldType: "singleText",
    fieldLabel: "Website",
    width: "half",
  },
  {
    fieldName: "email",
    fieldType: "singleText",
    fieldLabel: "Email",
    width: "half",
  },
  {
    fieldName: "notes",
    fieldType: "multiText",
    fieldLabel: "Notes",
    width: "half",
  },
];
