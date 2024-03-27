import { TableWithModal } from "components/TableWithModal";
import { useFormControls } from "hooks";
import { IFormControls } from "types";
import { tableConfig } from "./tableConfig";
import { FormConfig } from "./FormConfig";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const BillingPeriodOption = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Billing Period Option");
  }, [updateTitle]);

  const formControls: IFormControls = useFormControls();

  return (
    <TableWithModal
      tableName={"billing_period_option"}
      tableConfig={tableConfig()}
      formControls={formControls}
      formConfig={FormConfig}
      tableDataApiEndPoint={`/billing_period_option`}
      formDataApiEndpoint={`/billing_period_option/${formControls.currentRowData?.id}`}
    />
  );
};
