import React from "react";

export const DetailsList = ({ id, title }: { id?: string; title: string }) => {
  return (
    <>
      <h2>
        Details for {title}
        {id}
      </h2>
    </>
  );
};
