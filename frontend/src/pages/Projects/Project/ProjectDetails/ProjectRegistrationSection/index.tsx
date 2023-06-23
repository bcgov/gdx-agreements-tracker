import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { formFields } from "./formFields";
import { UseQueryResult } from "@tanstack/react-query";
import { FormikValues } from "formik";
import { useFormControls } from "hooks";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ProjectRegistrationSection` component is being returned.
 */

export const ProjectRegistrationSection = () => {
  const { projectId } = useParams();
  const tableName = "projects";
  const query = useFormData({
    url: `/projects/${projectId}`,
    tableName,
  });
  const { readFields, editFields } = formFields(query.data);

  return (
    <FormRenderer
      formControls={useFormControls()}
      tableName={tableName}
      readFields={readFields}
      editFields={editFields}
      postUrl="/projects"
      updateUrl={`/projects/${projectId}`}
      query={query}
      rowsToLock={[Number(projectId)]}
    />
  );
};
