import { styled, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";
import { useQuery } from "react-query";
import { GDXSelect } from "../../../../components/GDXForm/Fields";
import { FormLayout } from "../../../../components/GDXForm/FormLayout";
import { usePickerValues } from "../../../../hooks/usePickerValues";
import { apiAxios } from "../../../../utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { usePickerValuesLookup } from "../../../../hooks/usePickerValuesLookup";

const StyledBox = styled("div")({
  width: "100%",
  padding: "10px",
  display: "inline-block",
  margin: "5px",
});

export const ProjectRegistrationSection = ({ query }: any) => {
  const pickerValues: any = usePickerValues();
  const ministryLookupPicker: any = usePickerValuesLookup({
    tableName: "ministry",
    pickerLabelObjProp: "ministry_name",
    pickerValueObjProp: "id",
  });
  console.log('query', query)
  return (
    <FormLayout>
      <Formik
        initialValues={query?.data?.data}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors, setFieldValue, values, handleChange }) => {
          return (
            <>
            <StyledBox>
                <GDXSelect 
                  handleChange={handleChange}
                  formikValues={values}
                  setFieldValue={setFieldValue}
                  pickerData={pickerValues?.data?.pickers.project.ministry_id}
                  pickerLookupValues={ministryLookupPicker}
                
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
              {/* <StyledBox>
                <Field
                  as={TextField}
                  name={"project_number"}
                  onChange={handleChange}
                  label={"Project Number"}
                  disabled={true}
                />
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"project_version"}
                  onChange={handleChange}
                  label={"Project Version"}
                  disabled={true}
                />
              </StyledBox>
              <StyledBox>
                <Field
                  as={TextField}
                  name={"project_name"}
                  onChange={handleChange}
                  label={"Project Name"}
                  disabled={true}
                />
              </StyledBox>
              
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    onChange={(newValue: any) => {
                      setFieldValue("initiation_date", newValue);
                    }}
                    value={values.initiation_date}
                    as={DatePicker}
                    name={"initiation_date"}
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Initiation Date"}
                  />
                </LocalizationProvider>
              </StyledBox>
              <StyledBox>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    onChange={(newValue: any) => {
                      setFieldValue("planned_end_date", newValue);
                    }}
                    value={values.planned_end_date}
                    as={DatePicker}
                    name={"planned_end_date"}
                    renderInput={(params: any) => <TextField {...params} />}
                    label={"Planned End Date"}
                  />
                </LocalizationProvider>
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
              </StyledBox> */}
            </>
          );
        }}
      </Formik>
    </FormLayout>
  );
};
