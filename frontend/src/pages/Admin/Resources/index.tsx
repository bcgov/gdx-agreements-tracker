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

  const { resourceId } = useParams();

  const { data, isLoading } = useFormatTableData({
    tableName: "resources",
    apiEndPoint: `resources`,
    handleClick: handleOpen,
  });

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  const getResources = async () => {
    const contacts = await apiAxios().get(`/resources/${currentRowData?.id}`);
    return contacts.data.data;
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resourcesQuery: any = useQuery(`resources - ${currentRowData?.id}`, getResources, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const readFields = [
    { width: "half", title: "Supplier", value: resourcesQuery?.data?.supplier_name },
    { width: "half", title: "Subcontractor", value: resourcesQuery?.data?.subcontractor_name },
    { width: "half", title: "First Name", value: resourcesQuery?.data?.resource_first_name },
    { width: "half", title: "Last Name", value: resourcesQuery?.data?.resource_last_name },
    { width: "half", title: "Create Date", value: resourcesQuery?.data?.created_date_formatted },
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
    link_id: Number(resourceId),
    summary: "",
    // version: "",
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
            <Button variant="contained">New Change Request</Button>
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
                      queryKeys: [`"/resources/${resourcesQuery?.data?.id}"`],
                    });
                  }}
                  editFields={editFields}
                />
              ) : (
                <EditForm
                  initialValues={resourcesQuery?.data}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: resourcesQuery?.data,
                      apiUrl: `resources/${resourcesQuery?.data?.id}`,
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
