import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Field } from "formik";
import React from "react";
import { usePickerValues } from "../../hooks";
import { GDXSelect } from "../GDXForm";
import { GridItem } from "../GDXForm/FormLayout/GridItem";

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
  fieldValue: string | number | { [key: string]: unknown };
  fieldName: string;
  fieldType: "date" | "singleText" | "multiText" | "select";
  fieldLabel: string;
  handleChange?: Function;
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
            fieldValue={fieldValue as { [key: string]: unknown }}
            setFieldValue={setFieldValue as Function}
            pickerData={pickerValues?.data?.pickers?.[tableName as string]?.[fieldName]}
          />
        </GridItem>
      );
  }
};
