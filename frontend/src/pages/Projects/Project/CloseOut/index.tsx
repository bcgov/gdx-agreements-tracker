import { Button, Grid, Typography } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { apiAxios } from "utils";
import { editFields, readFields } from "./fields";
import { Notify } from "./Notify";

export const CloseOut = () => {
  const { projectId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { handleUpdate, Notification } = useFormSubmit();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}/close-out`);
    if (project?.data) {
      return project.data.data;
    }
    return null;
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectQuery: any = useQuery(`project close out - ${projectId}`, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          <Notify projectId={projectId} />
          <ReadForm fields={readFields(projectQuery)} />
          {/* TODO: Remove button when edit mode is determined by user role. */}
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Change Close Out
          </Button>
        </>
      );
      break;
    case true:
      content = (
        <EditForm
          initialValues={projectQuery?.data}
          onSubmit={async (values) => {
            return handleUpdate({
              changedValues: values,
              currentRowData: projectQuery?.data,
              apiUrl: `projects/${projectId}`,
              handleEditMode: setEditMode,
              queryKeys: [`project close out - ${projectId}`],
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
          <Typography variant="h5" component="h2">
            Close Out
          </Typography>
          <Renderer isLoading={projectQuery.isLoading} component={content} />
        </Grid>
      </Grid>
      <Notification />
    </>
  );
};
