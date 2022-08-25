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

export const Ministries: FC = () => {
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
    tableName: "ministries",
    apiEndPoint: "ministries",
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getMinistry = async () => {
    let data = null;
    if (currentRowData?.id) {
      const ministries = await apiAxios().get(`/ministries/${currentRowData?.id}`);
      data = ministries.data.data;
    }
    return data;
  };

  // Queries
  const ministriesQuery: UseQueryResult<FormikValues> = useQuery(
    `ministries - ${currentRowData?.id}`,
    getMinistry,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  const createFormInitialValues = {
    ministry_name: "",
    ministry_short_name: "",
    is_active: false,
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Ministries / Org Name
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
            ? `New Ministry`
            : `Edit Ministry ${ministriesQuery?.data?.ministry_name}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(ministriesQuery)} />
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
                      apiUrl: `/ministries`,
                      handleEditMode: handleEditMode,
                      handleClose: handleClose,
                      queryKeys: [`"/ministries/${ministriesQuery?.data?.id}"`, `ministries`],
                    });
                  }}
                  editFields={editFields()}
                />
              ) : (
                <EditForm
                  initialValues={ministriesQuery?.data as FormikValues}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: ministriesQuery?.data,
                      apiUrl: `ministries/${ministriesQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`ministries - ${currentRowData?.id}`, `ministries`],
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
