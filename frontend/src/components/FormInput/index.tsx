import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Field } from "formik";
import React from "react";
import { GridItem } from "../GDXForm/FormLayout/GridItem";

export const FormInput = ({
  setFieldValue,
  fieldValue,
  fieldName,
  fieldType,
  fieldLabel,
  handleChange,
  width,
}: {
  setFieldValue?: Function;
  fieldValue: string | number;
  fieldName: string;
  fieldType: "datePicker" | "textSingle";
  fieldLabel: string;
  handleChange?: Function;
  width: "half" | "full";
}) => {
  switch (fieldType) {
    case "datePicker":
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
            />
          </LocalizationProvider>
        </GridItem>
      );
    case "textSingle":
      return (
        <GridItem width="half">
          <Field
            fullWidth={true}
            as={TextField}
            name={"cr_contact"}
            onChange={handleChange}
            label={"CR Contact"}
          />
        </GridItem>
      );
  }
};
