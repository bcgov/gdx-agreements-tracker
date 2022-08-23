import React, { FC } from "react";
import { Typography } from "@mui/material";
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
import { IEditFields } from "types";
import { Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";
import { FormikValues } from "formik";
import { useParams } from "react-router-dom";

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

  const { subcontractorName } = useParams();

  const { data, isLoading } = useFormatTableData({
    tableName: "subcontractors",
    apiEndPoint: "subcontractors",
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getSubcontractors = async () => {
    const subcontractors = await apiAxios().get(`/subcontractors/${currentRowData?.id}`);
    return subcontractors.data.data;
  };

  // Queries
  const subcontractorsQuery: UseQueryResult<FormikValues> = useQuery(
    `subcontractors - ${currentRowData?.id}`,
    getSubcontractors,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  const readFields = [
    {
      width: "half",
      title: "Subcontractor Name",
      value: subcontractorsQuery?.data?.subcontractor_name,
    },
  ];

  const editFields: IEditFields[] = [
    {
      fieldName: "subcontractor_name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
    },
  ];

  const createFormInitialValues = {
    subcontractor_name: subcontractorName || "",
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
            <Button
              variant="contained"
              onClick={() => {
                handleOpen();
                handleEditMode(true);
                handleFormType("new");
              }}
            >
              Add
            </Button>
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
                      apiUrl: `/subcontractors`,
                      handleEditMode: handleEditMode,
                      queryKeys: [
                        `"/subcontractors/${subcontractorsQuery?.data?.id}"`,
                        `subcontractors`,
                      ],
                    });
                  }}
                  editFields={editFields}
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
