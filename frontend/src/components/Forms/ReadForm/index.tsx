import React from "react";
import { IReturnValue } from "types";
import { ReadField } from "./ReadField";
import { FormLayout } from "components/Forms/FormLayout";

export const ReadForm = ({
  fields,
}: {
  fields: { width: string; title: string; value: IReturnValue; type?: string }[];
}) => {
  return (
    <FormLayout>
      {fields.map(({ width, title, value, type }) => {
        return (
          <ReadField width={width} title={title} value={value} key={title} type={type}></ReadField>
        );
      })}
    </FormLayout>
  );
};
