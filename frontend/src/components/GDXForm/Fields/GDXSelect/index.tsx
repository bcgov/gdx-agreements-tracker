import React, { ChangeEvent, FC, ReactNode } from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";
import { Autocomplete, SelectChangeEvent, TextField, TextFieldProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  pickerLookupValues?: { data: Array<{ label: string; value: string | number }> };
}

export const GDXSelect: FC<IPickerProps> = ({
  handleChange,
  formikValues,
  setFieldValue,
  pickerData,
  pickerLookupValues,
}) => {
  console.log("pickerLookupValues", pickerLookupValues);
  return (
    <>
      <Autocomplete
        id={pickerData?.name}
        options={pickerLookupValues ? pickerLookupValues.data : pickerData?.definition.dropDownValues}
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
    </>
  );
};
