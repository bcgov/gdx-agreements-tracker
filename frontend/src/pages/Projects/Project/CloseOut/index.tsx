import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { EditForm } from "components/EditForm";
import { ReadForm } from "components/ReadForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IEditFields } from "types";
import { apiAxios } from "utils";
import { Notify } from "./Notify";

export const CloseOut = () => {
  const { projectId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { handleUpdate, Notification } = useFormSubmit();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project.data.data;
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectQuery: any = useQuery(`project - ${projectId}`, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const readFields = [
    {
      width: "full",
      title: "Close out date",
      value: projectQuery?.data?.close_out_date,
    },
    {
      width: "full",
      title: "Completed by",
      value: projectQuery?.data?.completed_by_contact_id,
    },
    {
      width: "full",
      title: "Actual completion date of project",
      value: projectQuery?.data?.actual_completion_date,
    },
    {
      width: "full",
      title: "Post implementation hand-off to operation completed",
      value: projectQuery?.data?.hand_off_to_operations,
    },
    {
      width: "full",
      title: "Project documentation filled in accordance with records management",
      value: projectQuery?.data?.records_filed,
    },
    {
      width: "full",
      title: "Contract evaluation completed if applicable",
      value: projectQuery?.data?.contract_ev_completed,
    },
    {
      width: "full",
      title: "Contractor IDIR terminated / building passes returned",
      value: projectQuery?.data?.contractor_security_terminated,
    },
  ];

  const editFields: IEditFields[] = [
    {
      fieldName: "close_out_date",
      fieldLabel: "Close out date",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "completed_by_contact_id",
      fieldLabel: "Completed by",
      fieldType: "singleText",
      width: "full",
      // tableName: "contacts",
    },
    {
      fieldName: "actual_completion_date",
      fieldLabel: "Actual completion date of project",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "hand_off_to_operations",
      fieldLabel: "Post implementation hand-off to operation completed",
      fieldType: "select",
      width: "full",
      tableName: "generic",
    },
    {
      fieldName: "records_filed",
      fieldLabel: "Project documentation filled in accordance with records management",
      fieldType: "select",
      width: "full",
      tableName: "generic",
    },
    {
      fieldName: "contract_ev_completed",
      fieldLabel: "Contract evaluation completed if applicable",
      fieldType: "select",
      width: "full",
      tableName: "generic",
    },
    {
      fieldName: "contractor_security_terminated",
      fieldLabel: "Contractor IDIR terminated / building passes returned",
      fieldType: "select",
      width: "full",
      tableName: "generic",
    },
  ];

  let content = <></>;
  switch (projectQuery.isLoading) {
    case true:
      content = <LinearProgress />;
      break;
    case false:
      switch (editMode) {
        case false:
        default:
          content = (
            <>
              <Notify projectId={projectId} />
              <ReadForm fields={readFields} />
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
                  queryKeys: [`project - ${projectId}`],
                });
              }}
              editFields={editFields}
            />
          );
          break;
      }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Typography variant="h5" component="h2">
            Close Out
          </Typography>
          {content}
        </Grid>
      </Grid>
      <Notification />
    </>
  );
};
