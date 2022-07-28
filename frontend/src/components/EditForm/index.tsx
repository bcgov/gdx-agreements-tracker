import React from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FormLayout } from "../GDXForm/FormLayout";
import { FormInput } from "../FormInput";
import { IEditFields } from "../../types";

export const EditForm = ({
  initialValues,
  onSubmit,
  editFields,
}: {
  initialValues: any;
  onSubmit: any;
  editFields: IEditFields[];
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values, handleChange, dirty }) => {
        return (
          <Form>
            <FormLayout>
              {editFields.map(({ fieldName, fieldType, fieldLabel, width, tableName }) => {
                return (
                  <FormInput
                    setFieldValue={setFieldValue}
                    fieldValue={values?.[fieldName]}
                    fieldName={fieldName}
                    fieldType={fieldType}
                    fieldLabel={fieldLabel}
                    handleChange={handleChange}
                    width={width}
                    key={fieldName}
                    tableName={tableName}
                  />
                );
              })}
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
  );
};
