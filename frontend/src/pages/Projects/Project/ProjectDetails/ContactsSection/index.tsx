/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { FormikValues } from "formik";
import { useAxios } from "hooks/useAxios";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { IEditField, IOption, IReadField, IUser } from "types";

interface IContactRole {
  role_id: number;
  role_type: string;
  contacts: Array<IOption>;
}

interface IContactsPayload {
  contact_id: number;
  project_id: number;
  contact_role: number;
}

export const ContactsSection = ({ projectId }: { projectId: number }) => {
  const roles = {
    get: "projects_read_all",
    add: "projects_add_one",
    update: "projects_update_one",
    delete: "projects_delete_one",
  };

  const { handleUpdate, Notification } = useFormSubmit();
  const { axiosAll } = useAxios();
  const [editMode, setEditMode] = useState(false);
  const [roleMap, setRoleMap] = useState<{ [key: string]: number }>({});
  const [readFields, setReadFields] = useState<IReadField[]>([]);
  const [editFields, setEditFields] = useState<IEditField[]>([]);
  const [initialValues, setInitialValues] = useState<FormikValues>([]);
  const apiUrl = `projects/${projectId}/contacts`;

  const getContacts = async () => {
    const result = (await axiosAll()).get(apiUrl).then((data: any) => {
      return data;
    });
    return result;
  };

  const { data: contactData, isLoading }: UseQueryResult<{ data: { data: any; user: IUser } }> =
    useQuery(apiUrl, getContacts, {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    });

  useEffect(() => {
    if (contactData?.data) {
      const roleSplitRegex = /(?=[A-Z][a-z])/;
      // Build read fields dynamically from contact data.
      setReadFields(
        contactData?.data?.data.map((role: IContactRole) => ({
          width: "half",
          title: role.role_type.split(roleSplitRegex).join(" "),
          value: role.contacts.map((contact) => contact.label ?? ""),
        }))
      );
      // Build edit fields dynamically from contact data.
      setEditFields(
        contactData?.data?.data.map((role: IContactRole) => ({
          fieldName: role.role_type,
          fieldLabel: role.role_type.split(roleSplitRegex).join(" "),
          fieldType: "multiselect",
          pickerName: "contact_option",
          width: "half",
        }))
      );
      setRoleMap(getRoleMap(contactData?.data?.data));
      setInitialValues(getInitialValues(contactData?.data?.data));
    }
  }, [contactData, isLoading]);

  /**
   * Builds a mapping of role types to role ids. Used during serialization.
   *
   * @param   {IContactRole[]}          roles Array of roles to build mapping for.
   * @returns {{[key: string]: number}}
   */
  const getRoleMap = (roles: Array<IContactRole>): { [key: string]: number } => {
    const roleMap: any = {};
    roles.map((role: IContactRole) => {
      roleMap[role.role_type] = role.role_id;
    });
    return roleMap;
  };

  /**
   * Builds initial values for edit form inputs.
   *
   * @param   {IContactRole[]} roles Array of roles to extract initial values from.
   * @returns {FormikValues}
   */
  const getInitialValues = (roles: Array<IContactRole>): FormikValues => {
    const row: any = {};
    roles.map((role) => {
      row[role.role_type] = role.contacts;
    });
    return row;
  };

  /**
   * Serializes form inputs so that payload is in format API can use.
   *
   * @param   {any}                values Form input values.
   * @returns {IContactsPayload[]}
   */
  const serializeContacts = (values: any): { contacts: IContactsPayload[] } => {
    const serializedContacts = [];
    for (const role in values) {
      const role_id = roleMap[role];
      for (const contact of values[role]) {
        serializedContacts.push({
          contact_id: contact.value,
          project_id: projectId,
          contact_role: role_id,
        });
      }
    }
    return {
      contacts: serializedContacts,
    };
  };

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          <ReadForm fields={readFields} />
          {contactData?.data?.user && contactData?.data?.user.capabilities.includes(roles.update) && (
            <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Change Contacts
              </Button>
            </Box>
          )}
        </>
      );
      break;
    case true:
      content = (
        <>
          <EditForm
            initialValues={initialValues}
            onSubmit={async (values) => {
              return handleUpdate({
                changedValues: serializeContacts(values),
                currentRowData: contactData?.data,
                apiUrl: apiUrl,
                handleEditMode: setEditMode,
                queryKeys: [apiUrl],
                successMessage: "Contacts saved successfully.",
                errorMessage: "There was an issue saving contacts.",
              });
            }}
            onCancel={() => {
              setEditMode(false);
            }}
            editFields={editFields}
          />
        </>
      );
      break;
  }

  return (
    <>
      <Renderer isLoading={isLoading} component={content} />
      <Notification />
    </>
  );
};
