import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";
import { useQuery } from "react-query";
import { apiAxios } from "../../../../utils";

const ProjectFormFields = (query: any) => {

  const getLayout = async () => {
    const project = await apiAxios().get(`form_layouts`);
    return project;
  };

  const getPickers = async () => {
    const project = await apiAxios().get(`picker_options`);
    return project;
  };

  // Queries
  //const layout = useQuery('form_layout',getLayout)
  // const pickers = useQuery('picker_options',getPickers);


  // console.log('layout,pickers', layout)
  // console.log("query", query);
  return (
    // <Field
    //   as={TextField}
    //   name={key}
    //   onChange={handleChange}
    //   label={key}
    // />
    <div></div>
  );
};

export default ProjectFormFields;
