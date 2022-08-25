import { Button, Grid } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useState } from "react";

import { useParams } from "react-router-dom";

import { editFields, readFields } from "./fields";
/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AgreementSection = ({ query }: any) => {
  const { projectId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { handleUpdate, Notification } = useFormSubmit();

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          <ReadForm fields={readFields(query)} />
          {/* TODO: Remove button when edit mode is determined by user role. */}
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </>
      );
      break;
    case true:
      content = (
        <EditForm
          initialValues={query?.data}
          onSubmit={async (values) => {
            return handleUpdate({
              changedValues: values,
              currentRowData: query?.data,
              apiUrl: `projects/${projectId}`,
              handleEditMode: setEditMode,
              queryKeys: [`project - ${projectId}`],
            });
          }}
          editFields={editFields()}
        />
      );
      break;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Renderer isLoading={query.isLoading} component={content} />
        </Grid>
      </Grid>
      <Notification />
    </>
  );
};
