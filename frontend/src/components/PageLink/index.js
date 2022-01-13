import { useParams } from "react-router-dom";
import React from "react";

export const PageLink = (title) => {
  let { id } = useParams();
  return (
    <h2>
      {title} {id}
    </h2>
  );
};
