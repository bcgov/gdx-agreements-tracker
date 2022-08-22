import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IPickerProps, IOption } from "../../../../types";

/**
 * Renders an Autocomplete/Select component
 *
 * @param               root0               Props passed into component
 * @param   {IOption}   root0.fieldValue    Inital value of the select
 * @param   {Function}  root0.setFieldValue Function to handle value change
 * @param   {unknown}   root0.pickerData    All picker options
 * @returns {GDXSelect}                     a JSX select
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
            <TextField label={pickerData?.title} name={pickerData?.name} {...params} />
          )}
          isOptionEqualToValue={(option: IOption, value: IOption) => {
            return value.value === option.value;
          }}
        />
      )}
    </>
  );
};
