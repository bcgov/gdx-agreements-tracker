import { Box, Button, styled, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { GDXSelect } from "../../../../../components/GDXForm/Fields";
import { FormLayout } from "../../../../../components/GDXForm/FormLayout";
import { usePickerValues } from "../../../../../hooks/usePickerValues";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextDisplay } from "../../../../../components/TextDisplay";
import { handleOnSubmit } from "../handleOnSubmit";

const StyledBox = styled("div")({
  width: "100%",
  padding: "10px",
  display: "inline-block",
  margin: "5px",
});

/**
 * Checks to see if a user access a route based on the allowedRole.
 *
 * @param   {object}             query The request object, which should have the user capability via the fastify-roles plugin.
 * @returns {React.ReactElement}       The agreements section form component
 */

// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AgreementSection = ({ query }: any) => {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickerValues: any = usePickerValues();
  return (
    <FormLayout>
      <Formik
        initialValues={query?.data?.data}
        onSubmit={async (values) => {
          handleOnSubmit(query, values);
        }}
      >
        {({ setFieldValue, values, handleChange, dirty }) => {
          return (
            <Form>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.agreement_type}
                />
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(newValue: any) => {
                      setFieldValue("agreement_signed_date", newValue);
                    }}
                    value={values.agreement_signed_date}
                    as={DatePicker}
                    name={"agreement_signed_date"}
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Date Signed"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(newValue: any) => {
                      setFieldValue("agreement_start_date", newValue);
                    }}
                    value={values.agreement_start_date}
                    as={DatePicker}
                    name={"agreement_start_date"}
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Start Date"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(newValue: any) => {
                      setFieldValue("agreement_end_date", newValue);
                    }}
                    value={values.agreement_end_date}
                    as={DatePicker}
                    name={"agreement_end_date"}
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"End Date"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"description"}
                  onChange={handleChange}
                  label={"Description"}
                  multiline
                  rows={10}
                />
              </StyledBox>
              <Field
                as={TextField}
                name={"notes"}
                onChange={handleChange}
                label={"Notes"}
                multiline
                rows={10}
              />
              <StyledBox>
                <TextDisplay
                  title="Total Project Budget"
                  value={query?.data?.data.total_project_budget}
                />
              </StyledBox>
              <StyledBox>
                <TextDisplay
                  title="Recoverables Total"
                  value={query?.data?.data.recoverable_amount}
                />
              </StyledBox>
              <Box>
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
    </FormLayout>
  );
};
