import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { formFields } from "./formFields";

export const CloseOut = () => {
  const { projectId } = useParams();
  const tableName = "projects";
  const query = useFormData({
    url: `/projects/${projectId}/close-out`,
    tableName: tableName,
  });
  const { readFields, editFields } = formFields(query.data);

  return (
    <FormRenderer
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
