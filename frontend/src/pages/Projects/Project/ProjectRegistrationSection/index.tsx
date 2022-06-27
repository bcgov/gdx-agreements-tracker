import { Box, Button, Link, styled, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { GDXSelect } from "../../../../components/GDXForm/Fields";
import { FormLayout } from "../../../../components/GDXForm/FormLayout";
import { usePickerValues } from "../../../../hooks/usePickerValues";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { handleOnSubmit } from "./handleOnSubmit";

const StyledBox = styled("div")({
  width: "100%",
  padding: "10px",
  display: "inline-block",
  margin: "5px",
});
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProjectRegistrationSection = ({ query }: any) => {
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
                <Field
                  as={TextField}
                  name={"project_number"}
                  onChange={handleChange}
                  label={"Project Number"}
                />
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"project_version"}
                  onChange={handleChange}
                  label={"Project Version"}
                />
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(newValue: any) => {
                      setFieldValue("initiation_date", newValue);
                    }}
                    value={values.initiation_date}
                    as={DatePicker}
                    name={"initiation_date"}
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Initiation Date"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(newValue: any) => {
                      setFieldValue("planned_start_date", newValue);
                    }}
                    value={values.planned_end_date}
                    as={DatePicker}
                    name={"planned_start_date"}
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Planned Start Date"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(newValue: any) => {
                      setFieldValue("planned_end_date", newValue);
                    }}
                    value={values.planned_end_date}
                    as={DatePicker}
                    name={"planned_end_date"}
                    // todo: Define a good type. "Any" type temporarily permitted.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Planned End Date"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"planned_budget"}
                  onChange={handleChange}
                  label={"Planned Budget"}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.project_status}
                />
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"total_project_budget"}
                  onChange={handleChange}
                  label={"Total Budget"}
                />
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"recoverable_amount"}
                  onChange={handleChange}
                  label={"Recoverable Total"}
                />
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"project_name"}
                  onChange={handleChange}
                  label={"Project Name"}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.ministry_id}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.portfolio_id}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.fiscal}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.project_type}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.funding}
                />
              </StyledBox>
              <StyledBox>
                <GDXSelect
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.recoverable}
                />
              </StyledBox>
              <StyledBox>
                {" "}
                <Link href="#">Contract #</Link>{" "}
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
