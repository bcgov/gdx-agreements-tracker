import { useKeycloak } from "@react-keycloak/web";
import { FormRenderer } from "components/FormRenderer";
import { useAxios } from "hooks/useAxios";
import { useFormData } from "hooks/useFormData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import FormConfig from "./FormConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ProjectRegistrationSection` component is being returned.
 */

export const ContactsSection = () => {
  const { projectId } = useParams();

  //TODO add dblock back.  This is causing issue atm, but is not a showstopper removing this for now.
  // const rowsToLock: Array<number> = !query
  //   ? []
  //   : query?.data?.data.data.flatMap((obj: { rows_to_lock: [] }) =>
  //       obj.rows_to_lock
  //         ? obj.rows_to_lock.filter(
  //             (val: null | undefined) => val !== null && val !== undefined && val !== 0
  //           )
  //         : []
  //     );
  const formControls: IFormControls = useFormControls();

  return (
    <FormRenderer
      formControls={formControls}
      tableName={"contact_project"}
      formConfig={FormConfig}
      formDataApiEndpoint={`/projects/${projectId}/contacts`}
    />
  );
};
