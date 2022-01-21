import React from "react";
import { defaultMaxListeners } from "stream";

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
