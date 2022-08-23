import React, { FC } from "react";
import { Checkbox } from "@mui/material";
import { ICheckboxProps } from "../../../../types";

/**
 *
 * @param   {{fieldValue:unknown, setFieldValue:Function, pickerData:unknown}}
 * @returns                                                                    a JSX checkbox
 */

export const GDXCheckbox: FC<ICheckboxProps> = ({ checked, setFieldValue }) => {
  return (
    <>
      <Checkbox
        onChange={(event) => {
          setFieldValue("is_active", event.target.checked);
        }}
        checked={checked as boolean}
      />
    </>
  );
};
