import { FormControlLabel, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Field } from "formik";
import React, { ChangeEvent } from "react";
import { usePickerValues } from "../../hooks";
import { GDXCheckbox, GDXSelect } from "../GDXForm";
import { GridItem } from "../GDXForm/FormLayout/GridItem";
import { IOption } from "../../types";

export const FormInput = ({
  setFieldValue,
  fieldValue,
  fieldName,
  fieldType,
  fieldLabel,
  handleChange,
  width,
  tableName,
}: {
  setFieldValue?: Function;
  fieldValue: string | number | boolean | IOption;
  fieldName: string;
  fieldType: "date" | "singleText" | "multiText" | "select" | "number" | "checkbox";
  fieldLabel: string;
  handleChange?: Function | ChangeEvent<HTMLInputElement>;
  width: "half" | "full";
  tableName?: string;
}) => {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickerValues: any = usePickerValues();

  switch (fieldType) {
    case "date":
      return (
        <GridItem width={width}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Field
              onChange={(newValue: unknown) => {
                setFieldValue?.(fieldName, newValue) as Function;
              }}
              value={fieldValue}
              as={DatePicker}
              renderInput={(params: Object) => <TextField {...params} fullWidth={true} />}
              label={fieldLabel}
              fullWidth={true}
              id={fieldName}
              role={`${fieldName}_input`}
            />
          </LocalizationProvider>
        </GridItem>
      );
    case "singleText":
      return (
        <GridItem width={width}>
          <Field
            fullWidth={true}
            as={TextField}
            name={fieldName}
            onChange={handleChange}
            label={fieldLabel}
            id={fieldName}
            role={`${fieldName}_input`}
          />
        </GridItem>
      );
    case "multiText":
      return (
        <GridItem width={width}>
          <Field
            fullWidth={true}
            as={TextField}
            name={fieldName}
            onChange={handleChange}
            label={fieldLabel}
            multiline
            rows={10}
            id={fieldName}
            role={`${fieldName}_input`}
          />
        </GridItem>
      );
    case "select":
      return (
        <GridItem width={width}>
          <GDXSelect
            handleChange={handleChange as Function}
            fieldValue={fieldValue as IOption}
            setFieldValue={setFieldValue as Function}
            pickerData={pickerValues?.data?.pickers[tableName as string][fieldName]}
          />
        </GridItem>
      );
      case "number":
      return (
        <GridItem width={width}>
          <Field
            fullWidth={true}
            as={TextField}
            type={"number"}
            name={fieldName}
            onChange={handleChange}
            label={fieldLabel}
            id={fieldName}
            role={`${fieldName}_input`}
          />
        </GridItem>
      );
    case "checkbox":
      return (
        <GridItem width={width}>
          <FormControlLabel
            control={
              <GDXCheckbox
                checked={fieldValue as boolean}
                onChange={handleChange as Function}
                setFieldValue={setFieldValue as Function}
              />
            }
            label={fieldLabel}
          />
        </GridItem>
      );
  }
};
