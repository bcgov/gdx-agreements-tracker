import React from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { Table } from "../../../../components";
import { GDXModal } from "../../../../components/GDXModal";
import { useFormatTableData } from "../../../../hooks";
import { FormLayout } from "../../../../components/GDXForm";
import { ReadField } from "../../../../components/ReadField";
import { useFormControls } from "../../../../hooks/useFormControls";
import { Renderer } from "../../../../components/Renderer";
import { FormInput } from "../../../../components/FormInput";
import { useFormSubmit } from "../../../../hooks/useFormSubmit";
import { apiAxios } from "../../../../utils";
import { useQuery } from "react-query";

export const ChangeRequest = () => {
  const {
    handleEditMode,
    handleOpen,
    handleClose,
    handleCurrentRowData,
    open,
    editMode,
    currentRowData,
  } = useFormControls();

  const { projectId } = useParams();
  const { data, isLoading } = useFormatTableData({
    tableName: "change_request",
    ApiEndPoint: `/projects/${projectId}/change_request`,
    handleClick: handleOpen,
  });

  console.log("data", data);

  const { handleOnSubmit, Notification } = useFormSubmit();

  const getChangeRequest = async () => {
    const changeRequest = await apiAxios().get(
      `/projects/${projectId}/change_request/${currentRowData?.id}`
    );
    return changeRequest.data.data[0];
  };

  // Queries
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
  console.log("changeRequestQuery", changeRequestQuery);

  return (
    <>
      <Renderer
        isLoading={isLoading}
        component={
          <Table
            columns={data?.columns}
            rows={data?.rows}
            loading={isLoading}
            onRowClick={handleCurrentRowData}
          />
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={`Change Request ${changeRequestQuery?.data?.version}`}
        handleEditMode={handleEditMode}
        editMode={editMode}
      >
        {!editMode ? (
          <FormLayout>
            <ReadField width={"half"} title={"Version"} value={changeRequestQuery?.data?.version} />
            <ReadField
              width={"half"}
              title={"Fiscal Year"}
              value={changeRequestQuery?.data?.fiscal_year?.label}
            />
            <ReadField
              width={"half"}
              title={"Initiation Date"}
              value={changeRequestQuery?.data?.initiation_date}
            />
            <ReadField
              width={"half"}
              title={"CR Contact"}
              value={changeRequestQuery?.data?.cr_contact}
            />
            <ReadField
              width={"half"}
              title={"Initiated By"}
              value={changeRequestQuery?.data?.initiated_by?.label}
            />
            <ReadField
              width={"half"}
              title={"Approval Date"}
              value={changeRequestQuery?.data?.approval_date}
            />
            <ReadField width={"full"} title={"Summary"} value={changeRequestQuery?.data?.summary} />
          </FormLayout>
        ) : (
          <>
            <Formik
              initialValues={changeRequestQuery?.data}
              // todo: Define a good type. "Any" type temporarily permitted.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSubmit={async (values: { [x: string]: { value: string } }) => {
                handleOnSubmit({
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
            >
              {({ setFieldValue, values, handleChange, dirty }) => {
                return (
                  <Form>
                    <FormLayout>
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.version}
                        fieldName={"version"}
                        fieldType={"singleText"}
                        fieldLabel={"Version"}
                        handleChange={handleChange}
                        width={"half"}
                      />
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.fiscal_year}
                        fieldName={"fiscal_year"}
                        fieldType={"select"}
                        fieldLabel={"Fiscal Year"}
                        handleChange={handleChange}
                        width={"half"}
                        tableName={"generic"}
                      />
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.initiation_date}
                        fieldName={"initiation_date"}
                        fieldType={"date"}
                        fieldLabel={"Initiation Date"}
                        handleChange={handleChange}
                        width={"half"}
                      />
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.cr_contact}
                        fieldName={"cr_contact"}
                        fieldType={"singleText"}
                        fieldLabel={"CR Contact"}
                        handleChange={handleChange}
                        width={"half"}
                      />
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.initiated_by}
                        fieldName={"initiated_by"}
                        fieldType={"select"}
                        fieldLabel={"Initiated By"}
                        handleChange={handleChange}
                        width={"half"}
                        tableName={"change_request"}
                      />
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.approval_date}
                        fieldName={"approval_date"}
                        fieldType={"date"}
                        fieldLabel={"Approval Date"}
                        handleChange={handleChange}
                        width={"half"}
                      />
                      <FormInput
                        setFieldValue={setFieldValue}
                        fieldValue={values.summary}
                        fieldName={"summary"}
                        fieldType={"multiText"}
                        fieldLabel={"Summary"}
                        handleChange={handleChange}
                        width={"full"}
                      />
                    </FormLayout>
                    <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={dirty ? false : true}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </GDXModal>
      <Notification />
    </>
  );
};
