import { Formik } from "formik";
import React from "react";

export const FormikForm = ({initalValues}:any) => {
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));

          setSubmitting(false);
        }, 400);
      }}
    >
      <div>FormikForm</div>
    </Formik>
  );
};
