import { Grid, Skeleton } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { Renderer } from "components/Renderer";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { useFormControls, useFormSubmit, useFormLock } from "hooks";
import { FormEditButton } from "components/FormEditButton";
import LockPersonIcon from "@mui/icons-material/LockPerson";

export const ProjectRegistrationSection = ({
  query,
  userHasEditCapability,
}: {
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
  userHasEditCapability: boolean;
}) => {
  const { projectId } = useParams();
  const { handleUpdate, Notification } = useFormSubmit();
  const { handleEditMode, editMode } = useFormControls();

  const { handleDbLock, lockRemover } = useFormLock();

  useEffect(() => {
    // Certain properties when lacking a value have null labels causing errors.
    if (query?.data?.data) {
      if (null === query.data.data.fiscal.label) {
        query.data.data.fiscal.label = "";
      }
      if (null === query.data.data.project_status.label) {
        query.data.data.project_status.label = "";
      }
      if (null === query.data.data.funding.label) {
        query.data.data.funding.label = "";
      }
      query.data.data.version ?? "";
    }
  }, [query]);

  let content = <></>;
  switch (query?.data?.dbRowLock?.locked) {
    case true: // db row is locked
      switch (query?.data?.dbRowLock?.currentUser) {
        case true: // db row is locked & current user
          switch (editMode) {
            case false: // db row is locked & current user & not edit mode
              content = (
                <>
                  <ReadForm fields={readFields(query)} />
                  {userHasEditCapability && (
                    <>
                      <FormEditButton
                        buttonText="Change Registration"
                        onClick={async () => {
                          await handleDbLock(query, projectId).then(() => {
                            handleEditMode(true).then(() => {
                              query.refetch();
                            });
                          });
                        }}
                      />
                    </>
                  )}
                </>
              );
              break;

            case true: //edit mode
              content = (
                <EditForm
                  initialValues={query?.data?.data}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: query?.data?.data,
                      apiUrl: `projects/${projectId}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`project - ${projectId}`],
                      successMessage: `Changes saved successfully for project ${projectId}`,
                      errorMessage: `There was an issue saving your changes for project ${projectId}`,
                    });
                  }}
                  onCancel={async () => {
                    await lockRemover(query?.data?.dbRowLock?.lockId).then(() => {
                      handleEditMode(false);
                    });
                  }}
                  editFields={editFields()}
                />
              );

              break;
          }
          break;

        case false: // not current user
          content = (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <Skeleton variant="rectangular" />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Skeleton variant="rectangular" />
                </Grid>
                <Grid item xs={6} md={6}>
                  <LockPersonIcon />
                  <h1>section locked for editing by: {query?.data?.dbRowLock.locked_by}</h1>
                </Grid>
                <Grid item xs={6} md={6}></Grid>
                <Grid item xs={4} md={4}></Grid>
                <Grid item xs={4} md={4}></Grid>
                <Grid item xs={4} md={4}>
                  {userHasEditCapability && (
                    <>
                      <FormEditButton
                        buttonText="Take Over Editing"
                        onClick={async () => {
                          await lockRemover(query.data.dbRowLock.lockId).then(async () => {
                            await handleDbLock(query, projectId).then(() => {
                              handleEditMode(true).then(() => {
                                query.refetch();
                              });
                            });
                          });
                        }}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </>
          );
          break;
      }
      break;

    case false: //db row is not locked  - query?.data?.dbRowLock?.locked
      switch (editMode) {
        case false: // db row is locked & current user & not edit mode
          content = (
            <>
              <ReadForm fields={readFields(query)} />
              {userHasEditCapability && (
                <>
                  <FormEditButton
                    buttonText="Change Registration"
                    onClick={async () => {
                      await handleDbLock(query, projectId).then(() => {
                        handleEditMode(true).then(() => {
                          query.refetch();
                        });
                      });
                    }}
                  />
                </>
              )}
            </>
          );
          break;

        case true: //edit mode
          content = (
            <EditForm
              initialValues={query?.data?.data}
              onSubmit={async (values) => {
                return handleUpdate({
                  changedValues: values,
                  currentRowData: query?.data?.data,
                  apiUrl: `projects/${projectId}`,
                  handleEditMode: handleEditMode,
                  queryKeys: [`project - ${projectId}`],
                  successMessage: `Changes saved successfully for project ${projectId}`,
                  errorMessage: `There was an issue saving your changes for project ${projectId}`,
                });
              }}
              onCancel={async () => {
                await lockRemover(query?.data?.dbRowLock?.lockId).then(() => {
                  handleEditMode(false);
                });
              }}
              editFields={editFields()}
            />
          );

          break;
      }
      break;
  }
  return (
    <>
      <Renderer isLoading={query.isLoading} component={content} />
      <Notification />
    </>
  );
};
