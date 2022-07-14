import { Box, Button, Grid, LinearProgress, Paper, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../../../components";
import { GDXModal } from "../../../../components/GDXModal";
import { useFormatTableData } from "../../../../hooks";
import { ViewForm } from "../../../../components/ViewForm";
import { IChangeRequestRow } from "../../../../types";
import { FormLayout } from "../../../../components/GDXForm";
import { GridItem } from "../../../../components/GDXForm/FormLayout/GridItem";
import { EditForm } from "../../../../components/EditForm";
import { Field, Form, Formik } from "formik";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
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
            onSubmit={async (items: any) => {
              console.log("items", items);
            }}
          >
            {({ setFieldValue, values, handleChange, dirty }) => {
              return (
                <Form>
                  <FormLayout>
                    <FormInput
                      setFieldValue={setFieldValue}
                      fieldValue={values.approval_date}
                      fieldName={"approval_date"}
                      fieldType={"datePicker"}
                      fieldLabel={"Initiation Date"}
                      handleChange={handleChange}
                      width={"half"}
                    />
                    <FormInput
                      setFieldValue={setFieldValue}
                      fieldValue={values.cr_contact}
                      fieldName={"cr_contact"}
                      fieldType={"textSingle"}
                      fieldLabel={"CR Contact"}
                      handleChange={handleChange}
                      width={"half"}
                    />
                  </FormLayout>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
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
