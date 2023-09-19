// Components
import { FormRenderer } from "components/Forms/FormRenderer";
import { Notify } from "./Notify";

// Hooks
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";

// Types
import { IFormControls } from "types";

// Utils
import { FormConfig } from "./FormConfig";
import { get } from "lodash";

// Helpers
const getEndPoint = (projectId: string | undefined) => {
  return `/projects/${projectId}/close-out`;
};
const getURL = (projectId: string | undefined) => {
  return `/projects/${projectId}/close-out`;
};

/**
 *
 * Project Close Out Page
 * This will conditionally display the Notify component if the user has PMO Admin Edit Capability
 *
 * @returns {JSX.Element}
 */
const CloseOut = () => {
  const { updateTitle } = useTitle();
  const { projectId } = useParams();
  const formControls: IFormControls = useFormControls();
  const endpoint = getEndPoint(projectId);
  const isReadOnly = !get(
    useFormData({
      url: getURL(projectId),
      tableName: "projects",
    }),
    ["data", "data", "data", "hasPMOAdminEditCapability"]
  );

  // Update the title on mount
  useEffect(() => updateTitle("Project Close Out"));

  return (
    <>
      {isReadOnly && <Notify projectId={projectId} />}

      <FormRenderer
        formControls={formControls}
        tableName="projects"
        formConfig={FormConfig}
        formDataApiEndpoint={endpoint}
        isReadOnly={isReadOnly}
      />
    </>
  );
};

export { CloseOut };
