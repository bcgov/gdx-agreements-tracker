import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ProjectLayout } from "../../../components/ProjectLayout";
import { apiAxios } from "../../../utils";

export const Project = () => {
  const { projectId } = useParams();

  const getProject = async () => {
    const project = await apiAxios().get(`projects/${projectId}`);
    return project;
  };

  // Queries
  const query = useQuery(`project - ${projectId}`, getProject);

  console.log('query', query)
  return (
    <>
      {true === query.isLoading ? (
        <div>Loading</div>
      ) : (
        <ProjectLayout>
          {/* {Object.entries(query.data?.data).map(([key, value]) => {
            return (
              <div key={key}>
                <br />
                <TextField disabled label={key} defaultValue={value} />
                <br />
              </div>
            );
          })} */}
          {/* <Field
            key={key}
            as={TextField}
            name={key}
            type={value.type}
            onChange={handleChange}
            label={key}
          /> */}
          <div>1</div><div>2</div><div>3</div>
        </ProjectLayout>
      )}

      <Outlet />
    </>
  );
};

/**
 * Project Number {Project Number}
 * Project Name {input}
 * Version {input}
 * Client Ministry Name
 * Registration Date {date}
 * Portfolio Name {dropdown}
 * Planned Start Date {date}
 * Portfolio Name {dropdown}
 * Planned End Date {date}
 * Fiscal {dropdown}
 * Planned Budget {money}
 * Project Type {dropdown}
 * Project status {dropdown}
 * Funding {dropdown}
 * Total Budget {money}
 * Recovery Details {dropdown}
 * Recoverable Total {money}
 * Contract # {link}
 * 
 */