import React, { FC } from "react";
import { Checkbox } from "@mui/material";
import { ICheckboxProps } from "../../../../types";

/**
 *
 * @param   {{fieldValue:unknown, setFieldValue:Function, pickerData:unknown}}
 * @returns                                                                    a JSX checkbox
 */

export const GDXCheckbox: FC<ICheckboxProps> = ({ checked, fieldName, setFieldValue }) => {
  return (
    <>
      <Checkbox
        onChange={(event) => {
          setFieldValue(fieldName, event.target.checked);
        }}
        checked={checked as boolean}
      />
    </>
  );
};
