import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IPickerProps, IOption } from "../../../../types";

/**
 * Renders an Autocomplete/Select component
 *
 * @param   {IPickerProps} props passed into component
 * @returns {GDXSelect}          a JSX select
 */
export const GDXSelect: FC<IPickerProps> = ({
  fieldName,
  fieldValue,
  setFieldValue,
  pickerData,
}: IPickerProps) => {
  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={"auto"} height={38} />
      ) : (
        <Autocomplete
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
