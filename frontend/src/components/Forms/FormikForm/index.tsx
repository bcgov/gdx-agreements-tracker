import React from "react";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import { FormSectionBuilder } from "./FormSectionBuilder";

const FormikForm = ({ projectData, routerId }: { projectData: any; routerId: string }) => {
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
              <Grid container spacing={2}>
                <FormSectionBuilder
                  errors={errors}
                  setFieldValue={setFieldValue}
                  formikValues={values}
                  handleChange={handleChange}
                />
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormikForm;
