import { Box, Button } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";

export const AgreementSection = ({
  query,
}: {
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}) => {
  const { projectId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { handleUpdate, Notification } = useFormSubmit();

  useEffect(() => {
    // Certain properties when lacking a value have null labels causing errors.
    if (query?.data?.data) {
      if (null === query.data.data.agreement_type.label) {
        query.data.data.agreement_type.label = "";
      }
    }
  }, [query]);

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          <ReadForm fields={readFields(query)} />
          <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Change Agreement
            </Button>
          </Box>
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
              apiUrl: `projects/${projectId}`,
              handleEditMode: setEditMode,
              queryKeys: [`project - ${projectId}`],
            });
          }}
          onCancel={() => {
            setEditMode(false);
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
