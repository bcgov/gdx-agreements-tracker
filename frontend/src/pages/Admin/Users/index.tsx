import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { useFormControls } from "hooks/useFormControls";
import { useFormSubmit } from "hooks/useFormSubmit";
import { Table } from "../../../components";
import { apiAxios } from "utils";
import { useQuery } from "react-query";
import { Renderer } from "components/Renderer";
import { ReadForm } from "components/ReadForm";
import { EditForm } from "components/EditForm";
import { Box, Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";
import { GDXModal } from "components/GDXModal";
import { editFields, readFields } from "./fields";

export const Users: FC = () => {
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

  const { data, isLoading } = useFormatTableData({
    tableName: "users",
    apiEndPoint: `users`,
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();
  /**
   * Gets the resource information for a specific id.
   *
   * @returns {null|object}
   */
   const getUsers = async () => {
    let data = null;
    if (currentRowData?.id) {
      const resources = await apiAxios().get(`/users/${currentRowData?.id}`);
      data = resources.data.data;
    }
    return data;
  };

  // Queries
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userQuery: any = useQuery(`resources - ${currentRowData?.id}`, getUsers, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const createFormInitialValues = {
    username: "",
    email: "",
    name: null,
  };


  return (
    <>
      <Typography variant="h5" component="h2">
        Users
      </Typography>
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
              <Button variant="contained">New User</Button>
            </Box>
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={"new" === formType ? `New User` : `User ${userQuery?.data?.id}`}
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(userQuery)} />
          ) : (
            <>
              {"new" === formType ? (
                <CreateForm
                  initialValues={createFormInitialValues}
                  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
                  // todo: Define a good type. "Any" type temporarily permitted.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSubmit={async (values: any) => {
                    return handlePost({
                      formValues: values,
                      apiUrl: `/users`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`"/users"`],
                    });
                  }}
                  editFields={editFields()}
                />
              ) : (
                <EditForm
                  initialValues={userQuery?.data}
                  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
                  // todo: When using picklist if select is empty, then fails to update.
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: userQuery?.data,
                      apiUrl: `users/${userQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`users - ${currentRowData?.id}`],
                    });
                  }}
                  editFields={editFields()}
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
