import React, { FC } from "react";
import { Autocomplete, Skeleton, TextField, TextFieldProps } from "@mui/material";
import { IPickerProps, IOption } from "../../../../types";

/**
 * A component that renders a select input field with autocomplete functionality.
 *
 * @param   {object}      props            - The properties passed to the component.
 * @param   {string}      props.error      - The error message to display if the field is invalid.
 * @param   {string}      props.fieldLabel - The label of the field.
 * @param   {string}      props.fieldName  - The name of the field.
 * @param   {IOption}     props.fieldValue - The value of the field.
 * @param   {string}      props.helperText - The helper text to display below the field.
 * @param   {boolean}     props.multiple   - Whether the field allows multiple selections.
 * @param   {Function}    props.onChange   - The function to call when the field value changes.
 * @param   {object}      props.pickerData - The data to populate the autocomplete options.
 * @param   {boolean}     props.required   - Whether the field is required.
 * @returns {JSX.Element}                  - The rendered component.
 */
export const Select: FC<IPickerProps> = ({
  error,
  fieldLabel,
  fieldName,
  fieldValue,
  helperText,
  multiple,
  onChange,
  pickerData,
  required,
}: IPickerProps): JSX.Element => {
  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={"auto"} height={38} />
      ) : (
        <Autocomplete
          // allows text box to contain an arbitrary value https://mui.com/material-ui/react-autocomplete/#free-solo
          freeSolo
          id={fieldName}
          options={pickerData?.definition}
          onChange={(event, choice: unknown) => {
            onChange(choice);
          }}
          multiple={multiple}
          value={fieldValue}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              required={required}
              label={fieldLabel ? fieldLabel : pickerData?.title}
              name={fieldName}
              {...params}
              error={Boolean(error)}
              helperText={helperText}
            />
          )}
          isOptionEqualToValue={(option: IOption, value: IOption) => value.value === option.value}
        />
      )}
    </>
  );
};
