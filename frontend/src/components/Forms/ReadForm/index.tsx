import React from "react";
import { IReturnValue } from "types";
import { ReadField } from "./ReadField";
import { FormLayout } from "components/Forms/FormLayout";

export const ReadForm = ({
  fields,
}: {
  fields: { width: string; title: string; value: IReturnValue }[];
}) => {
  return (
    <FormLayout>
      {fields.map(({ width, title, value }) => {
        console.log('value', value)
        return <ReadField width={width} title={title} value={value} key={title}></ReadField>;
      })}
    </FormLayout>
  );
};
