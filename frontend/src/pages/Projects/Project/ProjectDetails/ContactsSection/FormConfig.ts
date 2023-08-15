import { FormikValues } from "formik";
import { useParams } from "react-router-dom";
import { IEditField } from "types";

const FormConfig = (query: FormikValues) => {
  const { projectId } = useParams();

  const readFields = !Array.isArray(query.data?.data?.data)
    ? []
    : query.data?.data?.data?.map((row: { role_type: string; contacts: { label: string }[] }) => {
        return {
          width: "half",
          title: row.role_type,
          value: row.contacts.map((contact: { label: string }) => {
            return contact.label;
          }),
        };
      });

  const roleSplitRegex = /(?=[A-Z][a-z])/;

  const editFields: IEditField[] = !Array.isArray(query.data?.data?.data)
    ? []
    : query?.data?.data?.data?.map((role: { role_id: string; role_type: string }) => ({
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

  const rowsToLock: Array<number> = !query.isLoading
    ? []
    : query?.data?.data?.data?.flatMap((obj: { rows_to_lock: [] }) =>
        obj.rows_to_lock
          ? obj.rows_to_lock.filter(
              (val: null | undefined) => val !== null && val !== undefined && val !== 0
            )
          : []
      );

  const updateUrl = `/projects/${projectId}/contacts`;

  return { readFields, editFields, initialValues, rowsToLock, updateUrl };
};

export default FormConfig;
