import { TextField } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { apiAxios } from "../../../utils";

export const Project = () => {
  const [projectInfo, setProjectInfo] = useState({ id: "dummy" });

  const { projectId } = useParams();

  useLayoutEffect(() => {
    // if ("number" === typeof projectId) {
    // }
    apiAxios()
      .get(`projects/${projectId}`)
      .then((project) => {
        setProjectInfo(project.data);
        /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
        // todo: Define a good type. "Any" type temporarily permitted.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })
      .catch((error) => {
        console.error(error);
      }); //! TODO: We had to ignore react-hooks/exhaustive-deps because of error "React Hook useLayoutEffect has a missing dependency: 'tableName'. Either include it or remove the dependency array" ref: https://exerror.com/react-hook-useeffect-has-a-missing-dependency/
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Object.entries(projectInfo).map(([key, value]) => {
        return (
          <>
            <br />
            <TextField disabled label={key} defaultValue={value} />
            <br />
          </>
        );
      })}
      <Outlet />
    </>
  );
};
