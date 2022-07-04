import React from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ChipNav } from "../../../components/GDXForm/ChipNav";

/**
 * This reusable component renders the projects component
 *
 * @param   {object} query       React query that contains all projects
 * @returns {React.ReactElement} The project component
 */

export const Project = () => {
  const { projectId } = useParams();

  const chipNavLinks = [
    {
      key: 0,
      name: "Project Details",
      url: `/projects/${projectId}`,
    },
    {
      key: 1,
      name: "Change Request",
      url: `/projects/${projectId}/change-request`,
    },
  ];

  return (
    <>
      <ChipNav navLinks={chipNavLinks} />
      <Outlet />
    </>
  );
};
