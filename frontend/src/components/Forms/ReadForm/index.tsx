import React from "react";
import { IReturnValue } from "types";
import { ReadField } from "./ReadField";
import { FormLayout } from "components/Forms/FormLayout";

/**
 * The ReadForm component renders a form layout containing ReadField components
 * for displaying read-only information. It takes an array of fields, each describing
 * a specific piece of information to be displayed.
 *
 * @param   {Object}      props        - The component properties.
 * @param   {Array}       props.fields - An array of field objects, each specifying the width,
 *                                     title, value, and optionally, the type of the field.
 * @returns {JSX.Element}              - The rendered ReadForm component.
 *
 * @example
 * // Example usage of ReadForm:
 * <ReadForm
 *   fields={[
 *     { width: "50%", title: "Name", value: "John Doe" },
 *     { width: "50%", title: "Age", value: 25, type: "number" },
 *   ]}
 * />
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
