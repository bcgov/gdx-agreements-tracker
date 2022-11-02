import React from "react";
import { IReturnValue } from "types";
import { FormLayout } from "../GDXForm";
import { ReadField } from "./ReadField";

export const ReadForm = ({
  fields,
}: {
  fields: { width: string; title: string; value: IReturnValue }[];
}) => {
  return (
    <FormLayout>
      {fields.map(({ width, title, value }) => {
        return <ReadField width={width} title={title} value={value} key={title}></ReadField>;
      })}
    </FormLayout>
  );
};
