import React from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { FormLayout } from "../GDXForm/FormLayout";
import { FormInput } from "../FormInput";
import { IEditField } from "../../types";

export const EditForm = ({
  initialValues,
  onSubmit,
  onCancel,
  editFields,
}: {
  initialValues: FormikValues;
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: ((values: unknown, formikHelpers: FormikHelpers<any>) => void | Promise<any>) &
    Function;
  onCancel: Function;
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
            <Box mt={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
              <Box>
                <Button
                  onClick={() => {
                    onCancel();
                  }}
                  type="button"
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Box>
              <Box ml={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={dirty ? false : true}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
