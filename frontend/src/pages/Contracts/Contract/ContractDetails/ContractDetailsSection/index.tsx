import { Box, Button } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";

export const ContractDetailsSection = ({
  query,
  userHasEditCapability,
}: {
  /**
   * @todo Define a good type. "Any" type temporarily permitted.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
  userHasEditCapability: boolean;
}) => {
  const { contractId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { handleUpdate, Notification } = useFormSubmit();

  useEffect(() => {}, [query]);

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          <ReadForm fields={readFields(query)} />
          {userHasEditCapability && (
            <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Change Contract
              </Button>
            </Box>
          )}
        </>
      );
      break;
    case true:
      content = (
        <EditForm
          initialValues={query?.data?.data}
          onSubmit={async (values) => {
            return handleUpdate({
              changedValues: values,
              currentRowData: query?.data?.data,
              apiUrl: `contracts/${contractId}`,
              handleEditMode: setEditMode,
              queryKeys: [`contract - ${contractId}`],
              successMessage: `Changes saved successfully for contract ${contractId}`,
              errorMessage: `There was an issue saving your changes for contract ${contractId}`,
            });
          }}
          editFields={editFields()}
        />
      );
      break;
  }

  return (
    <>
      <Renderer isLoading={query.isLoading} component={content} />
      <Notification />
    </>
  );
};
