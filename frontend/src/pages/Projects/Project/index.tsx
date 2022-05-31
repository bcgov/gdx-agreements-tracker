// import { TextField } from "@mui/material";
// import React from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import { apiAxios } from "../../../utils";
// import { Formik } from 'formik';

// export const Project = () => {
//   const { projectId } = useParams();

//   const getProject = async () => {
//     const project = await apiAxios().get(`projects/${projectId}`);
//     return project;
//   };

//   // Queries
//   const query = useQuery(`project - ${projectId}`, getProject);

//   return (
//     <>
//       {true === query.isLoading ? (
//         <div>Loading</div>
//       ) : (
//         Object.entries(query.data?.data).map(([key, value]) => {
//           return (
//             <div key={key}>
//               <br />
//               <TextField disabled label={key} defaultValue={value} />
//               <br />
//             </div>
//           );
//         })
//       )}
//       <Outlet />
//     </>
//   );
// };

// import React from "react";
// import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { apiAxios } from "../../../utils";
// import { TextField } from "@mui/material";
// import useFormFields from "../../../hooks/useFormFields";

// export const Project = () => {
//   const getProject = async () => {
//     const project = await apiAxios().get(`projects/${projectId}`);
//     return project;
//   };

//   const { projectId } = useParams();

//   const query = useQuery(`project - ${projectId}`, getProject);

//   const formik = useFormik({
//     initialValues: {
//       email: "foobar@example.com",
//       password: "foobar",
//     },
//     onSubmit: (/** values */) => {
//       // Placeholder, this is a required prop
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       {/* <TextField
//         fullWidth
//         id="password"
//         name="password"
//         label="Password"
//         type="password"
//         value={formik.values.password}
//         onChange={formik.handleChange}
//         // error={formik.touched.password && Boolean(formik.errors.password)}  //Placeholder
//         helperText={formik.touched.password && formik.errors.password}
//       /> */}
//       {useFormFields('integer')}
//     </form>
//   );
// };

import { Box, LinearProgress, TextField } from "@mui/material";
import React from "react";
import { useQuery, QueryCache, QueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import FormikForm from "../../../components/Forms/FormikForm";
import { useFormatTableData } from "../../../hooks";

export const Project = () => {
  //React RouterDom Url variable
  const { projectId } = useParams();

  const { data, isLoading } = useFormatTableData("projects");

  //Filter all project from React query by URL id
  const projectData: unknown = data?.rows.filter(
    (project: { id: number }) => project.id.toString() === projectId
  );

  return (
    <>
      {true === isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <FormikForm projectData={projectData} routerId={projectId as string}/>
        </Box>
      )}
      <Outlet />
    </>
  );
};
