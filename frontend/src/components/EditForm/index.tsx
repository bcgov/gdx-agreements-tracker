import React from "react";
import { styled, Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FormLayout } from "../GDXForm/FormLayout";

export const EditForm = ({ children }: { children: JSX.Element[] }) => {  
  return (
    <FormLayout>
      <Formik initialValues={{}} onSubmit={async () => {}}>
        {({ setFieldValue, values, handleChange, dirty }) => {
          return (
            <Form>
              {children}
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
