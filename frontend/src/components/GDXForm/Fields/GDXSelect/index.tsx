import React, { FC } from "react";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Loader } from "../../../Loader";
import { IPickerProps } from "../../../../types";

export const GDXSelect: FC<IPickerProps> = ({ formikValues, setFieldValue, pickerData }) => {
  return (
    <>
      {!pickerData ? (
        <Loader />
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
