import { useKeycloak } from "@react-keycloak/web";
import { FormRenderer } from "components/FormRenderer";
import { useAxios } from "hooks/useAxios";
import { useFormData } from "hooks/useFormData";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import formFields from "./formFields";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ProjectRegistrationSection` component is being returned.
 */

export const ContactsSection = () => {
  const { projectId } = useParams();
  const contactsUrl = `/projects/${projectId}/contacts`;
  const tableName = "contact_project";
  const query = useFormData({
    url: contactsUrl,
    tableName: tableName,
  });

  const rowsToLock: Array<number> = !query
    ? []
    : query?.data?.data.data.flatMap((obj: { rows_to_lock: [] }) =>
        obj.rows_to_lock
          ? obj.rows_to_lock.filter(
              (val: null | undefined) => val !== null && val !== undefined && val !== 0
            )
          : []
      );

  const { readFields, editFields, initialValues } = formFields(query?.data?.data?.data);

  return (
    <FormRenderer
      tableName={tableName}
      readFields={readFields}
      editFields={editFields}
      updateUrl={contactsUrl}
      query={query}
      rowsToLock={rowsToLock}
      initialValues={initialValues()}
    />
  );
};
