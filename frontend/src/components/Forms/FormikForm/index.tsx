import React from "react";
import { Formik, Form } from "formik";
import { Grid, styled, useTheme } from "@mui/material";
import { FormSectionBuilder } from "./FormSectionBuilder";
const FormikForm = ({ projectData, routerId }: { projectData: any; routerId: string }) => {
  
  const theme = useTheme();

  const StyledBoxHolder = styled("div")({
    [theme.breakpoints.down("md")]: {
      columnCount: 1,
    },
    [theme.breakpoints.up("md")]: {
      columnCount: 2,
    },
  });
  
  return (
    <div>
      <h1>Project {routerId}</h1>

      <Formik
        initialValues={projectData[0]}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors, setFieldValue, values, handleChange }) => {
          return (
            <Form>
              <StyledBoxHolder>
                <FormSectionBuilder
                  errors={errors}
                  setFieldValue={setFieldValue}
                  formikValues={values}
                  handleChange={handleChange}
                />
              </StyledBoxHolder>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormikForm;
