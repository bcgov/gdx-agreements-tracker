import { tableConfig } from "./tableConfig";
import { useNavigate } from "react-router-dom";
import { GridRowParams } from "@mui/x-data-grid";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { TableWithModal } from "components/TableWithModal";
import { FormConfig } from "./Contract/ContractDetails/FormConfig"
import { IFormControls } from "types";
import { useFormControls } from "hooks";

export const Contracts = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Contracts");
  }, [updateTitle]);

  const navigate = useNavigate();

  const handleRowDoubleClick = (row: GridRowParams) => {
    navigate(`${row.id}`);
  };
  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"contract"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`contracts`}
      formDataApiEndpoint={`contracts`}
      handleRowDoubleClick={handleRowDoubleClick}
    />
  );
};
