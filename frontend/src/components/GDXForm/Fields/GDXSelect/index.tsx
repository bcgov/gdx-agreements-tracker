import React, { ChangeEvent, FC, ReactNode } from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";
import { Autocomplete, SelectChangeEvent, TextField, TextFieldProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loader } from "../../../Loader";

interface IPickerProps {
  handleChange: Function;
  formikValues: { [key: string]: unknown };
  setFieldValue: Function;
  // pickerData: {
  //   id: number;
  //   name: string;
  //   title: string;
  //   description: string;
  //   definition: { dropDownValues: Object[]};
  // };
  pickerData: any;
}

export const GDXSelect: FC<IPickerProps> = ({
  handleChange,
  formikValues,
  setFieldValue,
  pickerData,
}) => {
  console.log('pickerData', pickerData)
  return (
    <>
      {!pickerData ? (
        <Loader />
      ) : (
        <Autocomplete
          id={pickerData?.name}
          options={pickerData?.definition}
          onChange={(event, option: any) => {
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
