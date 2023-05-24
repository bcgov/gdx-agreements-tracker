import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { formFields } from "./formFields";

export const CloseOut = () => {
  const { projectId } = useParams();
  const query = useFormData({
    url: `/projects/${projectId}/close-out`,
    tableName: "projects",
  });
  const { readFields, editFields } = formFields(query.data);

  return (
    <FormRenderer
      queryKey={`/projects/${projectId}/close-out`}
      readFields={readFields}
      editFields={editFields}
      postUrl="/projects"
      updateUrl={`/projects/${projectId}`}
      query={query}
      rowsToLock={[Number(projectId)]}
    />
  );
};
