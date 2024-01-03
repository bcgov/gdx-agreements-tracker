import React from "react";
import { IReturnValue } from "types";
import { ReadField } from "./ReadField";
import { FormLayout } from "components/Forms/FormLayout";

/**
 * ReadForm Component
 *
 * Renders a form layout displaying read-only fields based on the provided configuration.
 *
 *
 * @param   {object}      props        - The component props.
 * @param   {Array}       props.fields - An array of field configurations to be displayed in the form.  *
 *                                     Each field configuration should have the following properties:
 *                                     - width {string} - The width of the field.
 *                                     - title {string} - The title or label for the field.
 *                                     - value {IReturnValue} - The value to be displayed in the field.
 *                                     - type {string} (optional) - The type of the field (e.g., text, number).
 * @returns {JSX.Element}              - The rendered ReadForm component.
 */
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
