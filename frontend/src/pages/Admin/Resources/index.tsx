import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery } from "react-query";
import { ReadForm } from "components/ReadForm";
import { EditForm } from "components/EditForm";
import { Box, Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";
import { editFields } from "./editFields";
import { readFields } from "./readFields";

export const Resources: FC = () => {
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
    tableName: "resources",
    apiEndPoint: `resources`,
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  /**
   * Gets the resource information for a specific id.
   *
   * @returns {null|object}
   */
  const getResources = async () => {
    let data = null;
    if (currentRowData?.id) {
      const resources = await apiAxios().get(`/resources/${currentRowData?.id}`);
      data = resources.data.data;
    }
    return data;
  };

  // Queries
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resourcesQuery: any = useQuery(`resources - ${currentRowData?.id}`, getResources, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const createFormInitialValues = {
    resource_first_name: "",
    resource_last_name: "",
    subcontractor_id: null,
    supplier_id: null,
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Resources
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
              <Button variant="contained">New Resource</Button>
            </Box>
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={"new" === formType ? `New Resource` : `Resource ${resourcesQuery?.data?.id}`}
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(resourcesQuery)} />
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
                      apiUrl: `/resources`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`"/resources/${resourcesQuery?.data?.id}"`],
                      handleClose: handleClose,
                    });
                  }}
                  editFields={editFields()}
                />
              ) : (
                <EditForm
                  initialValues={resourcesQuery?.data}
                  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
                  // todo: When using picklist if select is empty, then fails to update.
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: resourcesQuery?.data,
                      apiUrl: `resources/${resourcesQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`resources - ${currentRowData?.id}`],
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
