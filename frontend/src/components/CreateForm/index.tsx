import React from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { FormLayout } from "../GDXForm/FormLayout";
import { FormInput } from "../FormInput";
import { IEditFields } from "../../types";

/**
 * Destructured as:
 * @param    {​​​​​​Object[]}​​​​​​ initialValues - Contains all the initial values for Formik to use
 * @param    {​​​​​​​​​​​​​​​​​​​​string}​​​​​​​​​​​​​​​​​​​​ onSubmit - Handles the submit functionality for the form
 * @param    {Object[]}​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ editFields - The field properties used to render the fields for an edit form
 * @returns  {React.JSX}
 */

export const CreateForm = ({
  initialValues,
  onSubmit,
  editFields,
}: {
  initialValues: FormikValues;
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: ((values: unknown, formikHelpers: FormikHelpers<any>) => void | Promise<any>) &
    Function;
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
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              role={"submit_button"}
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
  );
};
