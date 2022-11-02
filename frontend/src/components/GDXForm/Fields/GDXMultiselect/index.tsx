import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IMultiPickerProps, IOption } from "../../../../types";

/**
 * Renders an Autocomplete/Select component which allows multiple options to be selected
 *
 * @param   {IMultiPickerProps} props passed into component
 * @returns {GDXSelect}               a JSX select
 */
export const GDXMultiselect: FC<IMultiPickerProps> = ({
  fieldName,
  fieldValue,
  fieldLabel,
  setFieldValue,
  pickerData,
}: IMultiPickerProps) => {
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
            <TextField
              label={fieldLabel ? fieldLabel : pickerData?.title}
              name={fieldName}
              {...params}
            />
          )}
          isOptionEqualToValue={(option: IOption, value: IOption) => value.value === option.value}
        />
      )}
    </>
  );
};
