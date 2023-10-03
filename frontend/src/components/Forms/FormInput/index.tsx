import { FormControlLabel, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Field } from "formik";
import { usePickerValues } from "../../../hooks";
import { GridItem } from "../FormLayout/GridItem";
import { ReadField } from "components/Forms/ReadForm/ReadField";
import { IOption, IFormInput } from "../../../types";
import dayjs from "dayjs";
import { Checkbox, Select, MoneyField } from "../Fields";

export const FormInput = ({
  setFieldValue,
  fieldValue,
  fieldName,
  fieldType,
  fieldLabel,
  handleChange = () => {},
  width,
  pickerName,
  tableName,
  projectId,
  contractId,
  required = false,
}: IFormInput) => {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickerValues: any = usePickerValues(projectId, contractId);
  const GetPickerOptions = () => {
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
    case "money":
      return (
        <>
          <GridItem width={width}>
            <Field
              required={required}
              fullWidth={true}
              as={MoneyField}
              name={fieldName}
              onChange={(newValue: string) => {
                handleChange(newValue);
                setFieldValue?.(fieldName, newValue);
              }}
              value={Number(fieldValue.replace(/[^0-9.-]+/g, ""))}
              label={fieldLabel}
              id={fieldName}
              role={`${fieldName}_input`}
            />
          </GridItem>
        </>
      );
    case "date":
      return (
        <GridItem width={width}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Field
              as={DatePicker}
              id={fieldName}
              label={fieldLabel}
              value={fieldValue}
              fullWidth={true}
              onChange={(newValue: string) => {
                const formatDate = dayjs(newValue).format("YYYY-MM-DD");
                handleChange(formatDate);
                setFieldValue?.(fieldName, formatDate);
              }}
              role={`${fieldName}_input`}
              renderInput={(params: Object) => (
                <TextField {...params} fullWidth={true} required={required} />
              )}
            />
          </LocalizationProvider>
        </GridItem>
      );
    case "singleText":
      return (
        <GridItem width={width}>
          <Field
            required={required}
            fullWidth={true}
            as={TextField}
            name={fieldName}
            onChange={(newValue: string) => {
              handleChange(newValue);
            }}
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
            required={required}
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
    case "multiselect":
      return (
        <GridItem width={width}>
          <Field
            required={required}
            as={Select}
            onChange={(newValue: string) => {
              setFieldValue?.(fieldName, newValue);
            }}
            multiple={"multiselect" === fieldType ? true : false}
            fieldName={fieldName}
            fieldValue={fieldValue as IOption}
            fieldLabel={fieldLabel}
            setFieldValue={setFieldValue as Function}
            pickerData={GetPickerOptions()}
          />
        </GridItem>
      );
    case "number":
      return (
        <GridItem width={width}>
          <Field
            required={required}
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
              <Checkbox
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
