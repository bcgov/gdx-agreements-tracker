import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IPickerProps } from "../../../../types";

/**
 *
 * @param {{fieldValue:unknown, setFieldValue:Function, pickerData:unknown}}
 * @returns a JSX select
 */

export const GDXSelect: FC<IPickerProps> = ({ fieldValue, setFieldValue, pickerData }) => {
  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={"auto"} height={38} />
      ) : (
        <Autocomplete
          id={pickerData?.name}
          options={pickerData?.definition}
          onChange={(event, option) => {
            setFieldValue(pickerData?.name, option);
          }}
          value={fieldValue}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              margin="normal"
              label={pickerData?.title}
              name={pickerData?.name}
              {...params}
            />
          )}
        />
      )}
    </>
  );
};
