import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { formFields } from "./formFields";
import { UseQueryResult } from "react-query";
import { FormikValues } from "formik";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ProjectRegistrationSection` component is being returned.
 */

export const ProjectRegistrationSection = () => {
  const { projectId } = useParams();
  const query = useFormData({
    url: `/projects/${projectId}`,
    tableName: "projects",
  });
  const { readFields, editFields } = formFields(query.data);

  return (
    <FormRenderer
      queryKey={`/projects/${projectId}`}
      readFields={readFields}
      editFields={editFields}
      postUrl="/projects"
      updateUrl={`/projects/${projectId}`}
      query={query}
      rowsToLock={[Number(projectId)]}
    />
  );
};
