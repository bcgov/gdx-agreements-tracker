import { Box, Button, Grid, Typography } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import { useAxios } from "hooks/useAxios";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { Notify } from "./Notify";

export const CloseOut = () => {
  const { axiosAll } = useAxios();

  const { projectId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [userHasEditCapability, setEditCapability] = useState(false);
  const { handleUpdate, Notification } = useFormSubmit();

  const getProject = async () => {
    const project = await axiosAll().get(`projects/${projectId}/close-out`);
    if (project?.data) {
      return project.data;
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

  useEffect(() => {
    const user = projectQuery?.data?.user;
    setEditCapability(user && user.capabilities.includes("projects_update_one"));
  }, [projectQuery]);

  let content = <></>;
  switch (editMode) {
    case false:
    default:
      content = (
        <>
          {!userHasEditCapability && <Notify projectId={projectId} />}
          <ReadForm fields={readFields(projectQuery)} />
          {userHasEditCapability && (
            <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Change Close Out
              </Button>
            </Box>
          )}
        </>
      );
      break;
    case true:
      content = (
        <EditForm
          initialValues={projectQuery?.data.data}
          onSubmit={async (values) => {
            return handleUpdate({
              changedValues: values,
              currentRowData: projectQuery?.data.data,
              apiUrl: `projects/${projectId}`,
              handleEditMode: setEditMode,
              queryKeys: [`project close out - ${projectId}`],
              successMessage: `Changes saved successfully for project ${projectId}`,
              errorMessage: `There was an issue saving your changes for project ${projectId}`,
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
