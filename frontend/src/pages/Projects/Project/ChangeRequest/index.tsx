import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "components";
import { GDXModal } from "components/GDXModal";
import { useFormatTableData } from "hooks";
import { useFormControls } from "hooks/useFormControls";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import { apiAxios } from "utils";
import { useQuery } from "react-query";
import { ReadForm } from "components/ReadForm";
import { EditForm } from "components/EditForm";
import { IEditFields } from "types";
import { Box, Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";

/**
 * @returns the jsx for the change request section of the project form
 */

export const ChangeRequest = () => {
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
    const changeRequest = await apiAxios().get(
      `/projects/${projectId}/change_request/${currentRowData?.id}`
    );
    console.log('changeRequest', changeRequest)
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

  const readFields = [
    { width: "half", title: "Version", value: changeRequestQuery?.data?.version },
    { width: "half", title: "Fiscal Year", value: changeRequestQuery?.data?.fiscal_year?.label },
    { width: "half", title: "Initiation Date", value: changeRequestQuery?.data?.initiation_date },
    { width: "half", title: "CR Contact", value: changeRequestQuery?.data?.cr_contact },
    { width: "half", title: "Initiated By", value: changeRequestQuery?.data?.initiated_by?.label },
    { width: "half", title: "Approval Date", value: changeRequestQuery?.data?.approval_date },
    { width: "full", title: "Summary", value: changeRequestQuery?.data?.summary },
  ];

  const editFields: IEditFields[] = [
    {
      fieldName: "fiscal_year",
      fieldType: "select",
      fieldLabel: "Fiscal Year",
      width: "half",
      tableName: "generic",
    },
    {
      fieldName: "initiation_date",
      fieldType: "date",
      fieldLabel: "Initiation Date",
      width: "half",
    },
    {
      fieldName: "cr_contact",
      fieldType: "singleText",
      fieldLabel: "CR Contact",
      width: "half",
    },
    {
      fieldName: "initiated_by",
      fieldType: "select",
      fieldLabel: "Initiated By",
      width: "half",
      tableName: "change_request",
    },
    {
      fieldName: "approval_date",
      fieldType: "date",
      fieldLabel: "Approval Date",
      width: "half",
    },
    {
      fieldName: "summary",
      fieldType: "multiText",
      fieldLabel: "Summary",
      width: "full",
    },
  ];

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
            <ReadForm fields={readFields} />
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
