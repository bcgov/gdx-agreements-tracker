import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "components";
import { GDXModal } from "components/GDXModal";
import { useFormatTableData } from "hooks";
import { useFormControls } from "hooks/useFormControls";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import { useQuery } from "react-query";
import { ReadForm } from "components/ReadForm";
import { EditForm } from "components/EditForm";
import { Box, Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";
import { useAxios } from "hooks/useAxios";
import { editFields, readFields } from "./fields";

/**
 * @returns  the jsx for the change request section of the project form
 */

export const ChangeRequest = () => {
  const { axiosAll } = useAxios();

  const {
    handleEditMode,
    handleOpen,
    handleClose,
    handleCurrentRowData,
    handleFormType,
    formType,
    open,
    editMode,
    currentRowData,
  } = useFormControls();

  const { projectId } = useParams();
  const { data, isLoading } = useFormatTableData({
    tableName: "change_request",
    apiEndPoint: `/projects/${projectId}/change_request`,
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getChangeRequest = async () => {
    const changeRequest = await axiosAll().get(
      `/projects/${projectId}/change_request/${currentRowData?.id}`
    );
    return changeRequest.data.data[0];
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeRequestQuery: any = useQuery(
    `change_request - ${currentRowData?.id}`,
    getChangeRequest,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  const createFormInitialValues = {
    approval_date: null,
    cr_contact: "",
    fiscal_year: null,
    initiated_by: null,
    initiation_date: null,
    link_id: Number(projectId),
    summary: "",
    // version: "",
  };

  return (
    <>
      <Renderer
        isLoading={isLoading}
        component={
          <>
            <Table
              columns={data?.columns}
              rows={data?.rows}
              loading={isLoading}
              onRowClick={handleCurrentRowData}
            />
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              onClick={() => {
                handleOpen();
                handleEditMode(true);
                handleFormType("new");
              }}
            >
              <Button variant="contained">New Change Request</Button>
            </Box>
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType
            ? `New Change Request`
            : `Change Request ${changeRequestQuery?.data?.version}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(changeRequestQuery)} />
          ) : (
            <>
              {"new" === formType ? (
                <CreateForm
                  initialValues={createFormInitialValues}
                  // todo: Define a good type. "Any" type temporarily permitted.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSubmit={async (values: any) => {
                    return handlePost({
                      formValues: values,
                      apiUrl: `/change_request`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`"/projects/${projectId}/change_request"`],
                      handleClose: handleClose,
                    });
                  }}
                  editFields={editFields}
                />
              ) : (
                <EditForm
                  initialValues={changeRequestQuery?.data}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: changeRequestQuery?.data,
                      apiUrl: `change_request/${changeRequestQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [
                        `change_request - ${currentRowData?.id}`,
                        `/projects/${projectId}/change_request`,
                      ],
                    });
                  }}
                  editFields={editFields}
                />
              )}
            </>
          )}
        </>
      </GDXModal>
      <Notification />
    </>
  );
};
