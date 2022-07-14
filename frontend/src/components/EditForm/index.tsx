import React from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FormLayout } from "../GDXForm/FormLayout";

export const EditForm = () => {
  return (
    <FormLayout>
      <Formik initialValues={{}} onSubmit={async () => {}}>
        {({ dirty }) => {
          return (
            <Form>
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
