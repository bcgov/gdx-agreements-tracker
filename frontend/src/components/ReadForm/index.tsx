import React from "react";
import { FormLayout } from "../GDXForm";
import { ReadField } from "./ReadField";

export const ReadForm = ({
  fields,
}: {
  fields: { width: string; title: string; value: string | number }[];
}) => {
  return (
    <FormLayout>
      {fields.map(({ width, title, value }) => {
        return <ReadField width={width} title={title} value={value}></ReadField>;
      })}
    </FormLayout>
  );
};
