import { TableWithModal } from "components/TableWithModal";
import { useParams } from "react-router-dom";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

/**
 * This is a TypeScript React component that renders a table with modal for change requests related to
 * a specific project.
 *
 * @returns The `ContractResources` component is being returned, which renders a `TableWithModal` component
 *  with `tableConfig`, `tableData`, `formControls`, `formConfig`, and `formData` as props. The
 *  `tableData` is obtained using the `useFormatTableData` hook with a specific URL path. The
 *  `formControls` is an object that contains properties and methods for handling
 */


//** When a  supplier is chosen in the contract details section, that is the value used to filter the resources for the contract resource section.  Then depending  */
export const ContractResources = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Contract Resources");
  }, [updateTitle]);

  const { contractId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <>
      <TableWithModal
        tableName={"contract_resource"}
        tableConfig={tableConfig()}
        formControls={formControls}
        formConfig={FormConfig}
        tableDataApiEndPoint={`/contracts/${contractId}/resources`}
        formDataApiEndpoint={`/contracts/resources/${formControls.currentRowData?.id}`}
      />
    </>
  );
};


// select 
// suprt.rate, 
// sup.supplier_name,
// sup.id,
// cr.contract_id

// from data.contract_resource cr

// LEFT JOIN data.resource res ON cr.resource_id = res.id
// LEFT JOIN data.supplier sup ON res.supplier_id = sup.id
// LEFT JOIN data.supplier_rate suprt ON suprt.supplier_id = sup.id
// LEFT JOIN data.contract cont ON cont.supplier_id = cr.contract_id
// LEFT JOIN data.resource_type restyp ON suprt.resource_type_id = restyp.id
// where contract_id = 97 
// and res.supplier_id = 11