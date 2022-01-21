import { Outlet, useParams } from "react-router-dom";
import React from "react";

export const PageLink = (title, outlet) => {

  let { id } = useParams();
  return (
    <>
      <h2>
       
        {title} {id}
      </h2>
      {outlet && <Outlet />}
    </>
  );
};
