import { Card, Typography } from "@mui/material";
import { ReadEditPage } from "components/ReadEditPage";
import { readFields, editFields, initialValues } from "./fields";
import { ICapability } from "types";

export const ContractDetails = () => {
  return (
    <Card sx={{ padding: "5px" }}>
      <Typography variant="h5" component="h2">
        Contract Details
      </Typography>
      <ReadEditPage
        what={{ single: "contract", plural: "contracts" }}
        readFields={readFields}
        editFields={editFields}
        createFormInitialValues={initialValues}
        capability={
          {
            updateOne: "contracts_update_one",
          } as ICapability
        }
        apiRoute={"contracts"}
        redirectRoute={"/contracts"}
      />
    </Card>
  );
};
