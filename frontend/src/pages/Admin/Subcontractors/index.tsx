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
    { width: "half", title: "Supplier", value: subcontractorsQuery?.data?.supplier_id },
    { width: "half", title: "Subcontractor", value: subcontractorsQuery?.data?.subcontractor_id },
    { width: "half", title: "First Name", value: subcontractorsQuery?.data?.resource_first_name },
    { width: "half", title: "Last Name", value: subcontractorsQuery?.data?.resource_last_name },
    { width: "half", title: "Create Date", value: subcontractorsQuery?.data?.created_date },
    { width: "half", title: "User", value: subcontractorsQuery?.data?.user_id },
  ];

  const editFields: IEditFields[] = [
    {
      fieldName: "supplier_id",
      fieldType: "singleText",
      fieldLabel: "Supplier",
      width: "half",
    },
    {
      fieldName: "subcontractor_id",
      fieldType: "singleText",
      fieldLabel: "Subcontractor",
      width: "half",
    },
    {
      fieldName: "resource_first_name",
      fieldType: "singleText",
      fieldLabel: "First Name",
      width: "half",
    },
    {
      fieldName: "resource_last_name",
      fieldType: "singleText",
      fieldLabel: "Last Name",
      width: "half",
    },
    {
      fieldName: "user_id",
      fieldType: "singleText",
      fieldLabel: "User",
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
            ? `New Change Request`
            : `Change Request ${subcontractorsQuery?.data?.version}`
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
                      apiUrl: `/resources`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`"/resources/${subcontractorsQuery?.data?.id}"`],
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
                      apiUrl: `resources/${subcontractorsQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`resources - ${currentRowData?.id}`],
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
