import React from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { FormLayout } from "../GDXForm/FormLayout";
import { FormInput } from "../FormInput";
import { IEditField, IReturnValue } from "../../types";

/**
 * A reusable component used for when you need a create form.
 *
 * @param {object}   props               - Contains all the initial values for Formik to use.
 * @param {object[]} props.initialValues - Contains all the initial values for Formik to use.
 * @param {Function} props.onSubmit      - Handles the submit functionality for the form.
 * @param {object[]} props.editFields    - The field properties used to render the fields for an edit form.
 */

export const CreateForm = ({
  initialValues,
  onSubmit,
  editFields,
}: {
  initialValues: FormikValues;
  // todo: Define a good type. "Any" type temporarily permitted.
  onSubmit: ((
    values: { [key: string]: IReturnValue },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formikHelpers: FormikHelpers<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => void | Promise<any>) &
    Function;
  editFields: IEditField[];
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values, handleChange, dirty }) => {
        return (
          <Form>
            <FormLayout>
              {editFields.map(
                ({
                  fieldName,
                  fieldType,
                  fieldLabel,
                  width,
                  tableName,
                  pickerName,
                  projectId,
                  contractId,
                }) => {
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
                      pickerName={pickerName}
                      projectId={projectId}
                      contractId={contractId}
                    />
                  );
                }
              )}
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
