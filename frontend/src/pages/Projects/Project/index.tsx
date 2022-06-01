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
