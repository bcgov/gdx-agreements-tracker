import React from "react";
import { FormControlLabel, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Field } from "formik";
import { usePickerValues } from "../../hooks";
import { GDXCheckbox, GDXSelect, GDXMultiselect } from "../GDXForm";
import { GridItem } from "../GDXForm/FormLayout/GridItem";
import { ReadField } from "components/ReadForm/ReadField";
import { IOption, IFormInput } from "../../types";

export const FormInput = ({
  setFieldValue,
  fieldValue,
  fieldName,
  fieldType,
  fieldLabel,
  handleChange,
  width,
  pickerName,
  tableName,
  projectId,
  contractId,
}: IFormInput) => {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickerValues: any = usePickerValues(projectId, contractId);

  const getPickerOptions = () => {
    const defaults = {
      associated_table: "_options",
      definition: [{ value: "", label: "No Option table found" }],
      description: "No option",
      id: 0,
      name: "noop",
      title: "No option",
    };
    let options = defaults;
    if (pickerName) {
      options = pickerValues?.data?.pickers["_options"][pickerName];
    } else {
      options = pickerValues?.data?.pickers[tableName as string][fieldName];
    }
    return options ?? defaults;
  };

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
            fieldName={fieldName}
            fieldValue={fieldValue as IOption}
            setFieldValue={setFieldValue as Function}
            pickerData={getPickerOptions()}
          />
        </GridItem>
      );
    case "multiselect":
      return (
        <GridItem width={width}>
          <GDXMultiselect
            handleChange={handleChange as Function}
            fieldName={fieldName}
            fieldValue={fieldValue as IOption[]}
            setFieldValue={setFieldValue as Function}
            pickerData={getPickerOptions()}
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
                fieldName={fieldName}
                setFieldValue={setFieldValue as Function}
              />
            }
            label={fieldLabel}
          />
        </GridItem>
      );
    case "readonly":
      return <ReadField width={width} title={fieldLabel} value={fieldValue as string} />;
  }
};
