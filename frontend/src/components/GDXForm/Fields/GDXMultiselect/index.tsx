import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IMultiPickerProps, IOption } from "../../../../types";

/**
 * Renders an Autocomplete/Select component which allows multiple options to be selected
 *
 * @param               root0               Props passed into component
 * @param   {IOption[]} root0.fieldValue    Inital value of the select
 * @param   {Function}  root0.setFieldValue Function to handle value change
 * @param   {unknown}   root0.pickerData    All picker options
 * @param   {string}    root0.fieldName     Name of the field
 * @returns {GDXSelect}                     a JSX select
 */
export const GDXMultiselect: FC<IMultiPickerProps> = ({
  fieldName,
  fieldValue,
  setFieldValue,
  pickerData,
}) => {
  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={"auto"} height={38} />
      ) : (
        <Autocomplete
          multiple
          id={fieldName}
          options={pickerData?.definition}
          onChange={(event, option) => {
            setFieldValue(fieldName, option);
          }}
          value={fieldValue}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField label={pickerData?.title} name={fieldName} {...params} />
          )}
          isOptionEqualToValue={(option: IOption, value: IOption) => {
            return value.value === option.value;
          }}
        />
      )}
    </>
  );
};
