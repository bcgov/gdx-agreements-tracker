import { FormRenderer } from "components/FormRenderer";
import { useFormData } from "hooks/useFormData";
import { useParams } from "react-router";
import { formFields } from "./formFields";

/**
 * This is a TypeScript React component that renders a form for registering a project and uses hooks to
 * fetch and update data.
 *
 * @returns The `ContractDetails` component is being returned.
 */

export const ContractDetails = () => {
  const { contractId } = useParams();
  const tableName = "contract";
  const query = useFormData({
    url: `/contracts/${contractId}`,
    tableName: tableName,
  });

  const { readFields, editFields } = formFields(query.data);

  return (
    <FormRenderer
      tableName={tableName}
      readFields={readFields}
      editFields={editFields}
      postUrl="/contracts"
      updateUrl={`/contracts/${contractId}`}
      query={query}
      rowsToLock={[Number(contractId)]}
    />
  );
};
