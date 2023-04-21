import { FormRenderer } from "components/FormRenderer";
import { useParams } from "react-router";
import { editFields, readFields } from "./fields";

/**
 * This is a TypeScript React component that renders a form for viewing and updating project registration information
 */

export const ProjectRegistrationSection = () => {
  const { projectId } = useParams();
  return (
    <FormRenderer
      queryKey={[`project - ${projectId}`]}
      readFields={readFields}
      editFields={editFields}
      rowId={projectId}
      postUrl="/projects"
      updateUrl={`/projects/${projectId}`}
    />
  );
};
