import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { IContactRole, IEditField } from "types";

const formFields = (query: Array<FormikValues>) => {
  const readFields = !Array.isArray(query)
    ? []
    : query?.map((row) => {
        return {
          width: "half",
          title: row.role_type,
          value: row.contacts.map((contact: { label: string }) => {
            return contact.label;
          }),
        };
      });

  const roleSplitRegex = /(?=[A-Z][a-z])/;

  const editFields: IEditField[] = !Array.isArray(query)
    ? []
    : query.map((role) => ({
        fieldName: role.role_id,
        fieldLabel: role.role_type.split(roleSplitRegex).join(" "),
        fieldType: "multiselect",
        pickerName: "contact_option",
        width: "half",
      }));

  const initialValues = () => {
    const row: FormikValues[string] = {};
    !Array.isArray(query)
      ? []
      : query.map((role) => {
          row[role.role_id] = role.contacts;
        });
    return row;
  };

  return { readFields, editFields, initialValues };
};

export default formFields;
