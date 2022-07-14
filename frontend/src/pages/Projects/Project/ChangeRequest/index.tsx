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
    ApiEndPoint: `change_request/${projectId}`,
    handleClick: handleOpen,
  });

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
        modalTitle={`Change Request ${currentRowData?.version}`}
        handleEditMode={handleEditMode}
        editMode={editMode}
      >
        {!editMode ? (
          <FormLayout>
            <ReadField
              width={"half"}
              title={"Approval Date"}
              value={currentRowData?.approval_date}
            />
            <ReadField width={"half"} title={"CR Contact"} value={currentRowData?.cr_contact} />
            <ReadField width={"half"} title={"Fiscal Year"} value={currentRowData?.fiscal_year} />
            <ReadField width={"half"} title={"Initiated By"} value={currentRowData?.initiated_by} />
            <ReadField width={"full"} title={"Summary"} value={currentRowData?.summary} />
            <ReadField width={"half"} title={"Version"} value={currentRowData?.version} />
          </FormLayout>
        ) : (
          <Formik
            initialValues={currentRowData}
            // todo: Define a good type. "Any" type temporarily permitted.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSubmit={async () => {}}
          >
            {({ setFieldValue, values, handleChange, dirty }) => {
              console.log("values", values);
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
                      tableName={""}
                    />
                    <FormInput
                      setFieldValue={setFieldValue}
                      fieldValue={values.initial_date}
                      fieldName={"initial_date"}
                      fieldType={"date"}
                      fieldLabel={"Initial Date"}
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
                      tableName={""}
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
        )}
      </GDXModal>
    </>
  );
};
