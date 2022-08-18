import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { useParams } from "react-router-dom";
import { Table } from "../../../components";
import { Renderer } from "components/Renderer";
import { useFormSubmit } from "hooks/useFormSubmit";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery } from "react-query";
import { ReadForm } from "components/ReadForm";
import { EditForm } from "components/EditForm";
import { IEditFields } from "types";
import { Button } from "@mui/material";
import { CreateForm } from "components/CreateForm";

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

  const { subcontractorId } = useParams();

  const { data, isLoading } = useFormatTableData({
    tableName: "subcontractors",
    apiEndPoint: "subcontractors",
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getSubcontractors = async () => {
    const subcontractors = await apiAxios().get(`/subcontractors/${currentRowData?.id}`);
    return subcontractors.data.data[0];
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subcontractorsQuery: any = useQuery(
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
    { width: "half", title: "Id", value: subcontractorsQuery?.data?.id },
    {
      width: "half",
      title: "Subcontractor Name",
      value: subcontractorsQuery?.data?.subcontractor_name,
    },
  ];

  const editFields: IEditFields[] = [
    {
      fieldName: "id",
      fieldType: "singleText",
      fieldLabel: "Id",
      width: "half",
    },
    {
      fieldName: "subcontractor_name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
    },
  ];

  const createFormInitialValues = {
    approval_date: null,
    cr_contact: "",
    fiscal_year: null,
    initiated_by: null,
    initiation_date: null,
    link_id: Number(subcontractorId),
    summary: "",
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
            <Button variant="contained">Add</Button>
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType
            ? `New Subcontractor`
            : `Subcontractor ${subcontractorsQuery?.data?.version}`
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
                      queryKeys: [`"/subcontractors/${subcontractorsQuery?.data?.id}"`],
                    });
                  }}
                  editFields={editFields}
                />
              ) : (
                <EditForm
                  initialValues={subcontractorsQuery?.data}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: subcontractorsQuery?.data,
                      apiUrl: `subcontractors/${subcontractorsQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`subcontractors - ${currentRowData?.id}`],
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
