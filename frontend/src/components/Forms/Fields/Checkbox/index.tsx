import React, { FC } from "react";
import { Checkbox as MUICheckbox } from "@mui/material";
import { ICheckboxProps } from "../../../../types";

/**
 *
 * @param   {{fieldValue:unknown, setFieldValue:Function, pickerData:unknown}}
 * @returns                                                                    a JSX checkbox
 */

export const Checkbox: FC<ICheckboxProps> = ({
  checked,
  fieldName,
  setFieldValue,
  helperText,
  error,
}) => {
  return (
    <>
      <MUICheckbox
        onChange={(event) => {
          setFieldValue(fieldName, event.target.checked);
        }}
        checked={checked as boolean}
      />
      {error && (
        <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled css-upsu6h-MuiFormHelperText-root">
          ${helperText}
        </p>
      )}
    </>
  );
};
