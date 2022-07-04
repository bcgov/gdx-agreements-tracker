import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IPickerProps } from "../../../../types";

export const GDXSelect: FC<IPickerProps> = ({ formikValues, setFieldValue, pickerData }) => {
  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={551} height={38} />
      ) : (
        <Autocomplete
          id={pickerData?.name}
          options={pickerData?.definition}
          onChange={(event, option) => {
            setFieldValue(pickerData?.name, option);
          }}
          value={formikValues[pickerData?.name]}
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
