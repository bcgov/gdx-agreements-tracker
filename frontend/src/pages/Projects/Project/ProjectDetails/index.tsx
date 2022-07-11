import { LinearProgress } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FormLayout } from "../../../../components/GDXForm";
import { GDX_Accordion } from "../../../../components/GDX_Accordion";
import { apiAxios } from "../../../../utils";
import { AgreementSection } from "./AgreementSection";
import { ProjectRegistrationSection } from "./ProjectRegistrationSection";
import { handleOnSubmit } from "./handleOnSubmit";

export const ProjectDetails = () => {
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = (rowValues: any) =>{
    console.log('values', rowValues)
    setEditMode(true)
  }

  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  
  // Queries
  const projectQuery = useQuery(`project - ${projectId}`, getProject, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  const switchRender = () => {
    switch (projectQuery.isLoading) {
      case true:
        return <LinearProgress />;

      case false:
        switch (editMode) {
          case false:
          default:
            return <div>View Mode Form</div>;
          case true:
            return (
              <FormLayout>
                <Formik
                  initialValues={projectQuery?.data?.data}
                  onSubmit={async (values) => {
                    // handleOnSubmit(projectQuery, values);
                  }}
                >
                  {({ setFieldValue, values, handleChange, dirty }) => {
                    return (
                      <Form>
                        <GDX_Accordion sectionTitle="Project Registration">
                          <ProjectRegistrationSection
                            query={projectQuery}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue}
                            dirty={dirty}
                          />
                        </GDX_Accordion>
                        <GDX_Accordion sectionTitle="Agreement">
                          <AgreementSection
                            query={projectQuery}
                            handleChange={handleChange}
                            values={values}
                            setFieldValue={setFieldValue}
                            dirty={dirty}
                          />
                        </GDX_Accordion>
                      </Form>
                    );
                  }}
                </Formik>
              </FormLayout>
            );
        }
    }
  };

  return <>{switchRender()}</>;
};
