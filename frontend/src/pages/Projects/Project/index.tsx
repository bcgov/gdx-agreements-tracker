import { TextField } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { GDX_Accordion } from "../../../components/GDX_Accordion";
import { apiAxios } from "../../../utils";

export const Project = () => {
  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  // Queries
  const query = useQuery(`project - ${projectId}`, getProject);

  return (
    <>
      {true === query.isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <GDX_Accordion sectionTitle="Project Registration">
            {/* Added a slice just to show a few projects for now. */}
            {Object.entries(query.data?.data)
              .slice(1, 4)
              .map(([key, value]) => {
                return (
                  <div key={key}>
                    <br />
                    <TextField disabled label={key} defaultValue={value} />
                    <br />
                  </div>
                );
              })}
          </GDX_Accordion>
          <GDX_Accordion sectionTitle="Contacts">
            <h3>Contacts Placeholder</h3>
          </GDX_Accordion>
          <GDX_Accordion sectionTitle="Deliverables">
            <h3>Deliverables Placeholder</h3>
          </GDX_Accordion>
          <GDX_Accordion sectionTitle="Client Coding">
            <h3>Client Coding Placeholder</h3>
          </GDX_Accordion>
          <GDX_Accordion sectionTitle="Budget">
            <h3>Budget Placeholder</h3>
          </GDX_Accordion>
        </>
      )}
      <Outlet />
    </>
  );
};
