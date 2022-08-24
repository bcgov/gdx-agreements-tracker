import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery, UseQueryResult } from "react-query";
import { ReadForm } from "components/ReadForm";
import { EditForm } from "components/EditForm";
import { Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";
import { FormikValues } from "formik";
import { readFields, editFields } from "./fields";

export const Subcontractors: FC = () => {
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
    tableName: "subcontractors",
    apiEndPoint: "subcontractors",
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getSubcontractor = async () => {
    let data = null;
    if (currentRowData?.id) {
      const subcontractors = await apiAxios().get(`/subcontractors/${currentRowData?.id}`);
      data = subcontractors.data.data;
    }
    return data;
  };

  // Queries
  const subcontractorsQuery: UseQueryResult<FormikValues> = useQuery(
    `subcontractors - ${currentRowData?.id}`,
    getSubcontractor,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  const createFormInitialValues = {
    subcontractor_name: "",
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Subcontractors
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
              <Button variant="contained">Add</Button>
            </Box>
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType
            ? `New Subcontractor`
            : `Edit Subcontractor ${subcontractorsQuery?.data?.subcontractor_name}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(subcontractorsQuery)} />
          ) : (
            <>
              {"new" === formType ? (
                <CreateForm
                  initialValues={createFormInitialValues as FormikValues}
                  // todo: Define a good type. "Any" type temporarily permitted.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSubmit={async (values: any) => {
                    return handlePost({
                      formValues: values,
                      apiUrl: `/subcontractors`,
                      handleEditMode: handleEditMode,
                      handleClose: handleClose,
                      queryKeys: [
                        `"/subcontractors/${subcontractorsQuery?.data?.id}"`,
                        `subcontractors`,
                      ],
                    });
                  }}
                  editFields={editFields()}
                />
              ) : (
                <EditForm
                  initialValues={subcontractorsQuery?.data as FormikValues}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: subcontractorsQuery?.data,
                      apiUrl: `subcontractors/${subcontractorsQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`subcontractors - ${currentRowData?.id}`, `subcontractors`],
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
