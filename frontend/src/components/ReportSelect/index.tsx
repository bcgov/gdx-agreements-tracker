import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormGroup,
  Button,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";
import {
  ICheckbox,
  IData,
  IDate,
  IDescription,
  IRadioButton,
  IRadioGroup,
  ISelect,
  IOption,
} from "../../types";
import { clockClasses, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { data } from "./fields";
import { FormInput } from "components/FormInput";
import { FormLayout } from "components/GDXForm";
import { Formik, Form, Field } from "formik";
import { editFields } from "pages/Admin/Users/fields";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const ReportSelect = () => {
  // Handle state changes
  const [category, setCategory] = useState(data.reportCategory.defaultValue);
  const [type, setType] = useState(data.reportType.defaultValue);

  const handleChangeCategory = (event: React.FormEvent<HTMLInputElement>) => {
    setCategory(event.currentTarget.value);
  };
  const handleChangeType = (event: React.FormEvent<HTMLInputElement>) => {
    setType(event.currentTarget.value);
  };

  // Handle rendering complex elements
  const renderRadioGroup = (radioGroup: IRadioGroup, state: string | null) => {
    return radioGroup.options.map((radioButton: IRadioButton) => {
      if (state === radioButton.parent) {
        return (
          <FormControlLabel
            value={radioButton.value}
            label={radioButton.label}
            key={radioButton.value + "_radio_button"}
            control={<Radio />}
          />
        );
      }
    });
  };

  const renderParameters = (
    reportParameters: {
      name: string;
      formLabel: string;
      components: Array<ISelect | IDate | ICheckbox>;
    },
    setFieldValue: any,
    values: any
  ) => {
    return reportParameters.components.map((component: ISelect | IDate | ICheckbox) => {
      if (component.parents.includes(type)) {
        switch (component.input) {
          case "select":
            return (
              <>
                <FormLabel id={component.id} key={component.id + "_label"}>
                  {component.label}:
                </FormLabel>
                <Select
                  id={component.id}
                  defaultValue={component.defaultValue}
                  label={component.label}
                  key={component.id + "_select"}
                  onChange={(event: SelectChangeEvent) => {
                    setFieldValue(component.id, event.target.value);
                  }}
                >
                  {component.options.map((menuItem: IOption) => {
                    return (
                      <MenuItem value={menuItem.value} key={menuItem.value}>
                        {menuItem.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            );
          case "date":
            return (
              <>
                <FormLabel id={component.id} key={component.id + "_label"}>
                  Date:
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Field
                    onChange={(value: unknown) => {
                      setFieldValue(`${component.id} _datePicker`, value);
                    }}
                    value={values[`${component.id} _datePicker`]}
                    as={DesktopDatePicker}
                    renderInput={(params: Object) => <TextField {...params} fullWidth={true} />}
                    fullWidth={true}
                    id={`${component.id} _datePicker`}
                  />
                </LocalizationProvider>
              </>
            );
          case "checkbox":
            return (
              <>
                <FormLabel id={component.id} key={component.id + "_label"}>
                  Portfolio:
                </FormLabel>
                <Autocomplete
                  onChange={(event, selectedOptions, reason) => {
                    setFieldValue(`reports-portfolio`, selectedOptions);
                  }}
                  multiple
                  id="reports-portfolio"
                  options={component.options}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label as string}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </>
            );
          default:
            return <FormControl></FormControl>;
        }
      }
    });
  };

  const renderDescription = (reportDescription: IDescription) => {
    return reportDescription.options.map(
      (description: { id: number; value: string; parent: string }) => {
        if (type === description.parent) {
          return <p key={description.id}>{description.value}</p>;
        }
      }
    );
  };

  const onExportButtonClick = (values: any) => {
    console.log("values", values);
    // console.log("values", values);
    // const url = `https://localhost:8080/${reportUri}`;
    // axios(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     responseType: "arraybuffer",
    //   },
    //   responseType: "blob",
    // })
    //   .then((response:any) => {
    //     const fileURL = window.URL.createObjectURL(response.data);
    //     let alink = document.createElement("a");
    //     alink.href = fileURL;
    //     alink.download = "SamplePDF.pdf"; // Need dynamic names
    //     alink.click();
    //     console.log("RESPONSE: ");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const initialValues = { [data.reportCategory.name]: data.reportCategory.defaultValue };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onExportButtonClick}>
        {({ setFieldValue, values, handleChange, dirty }: any) => {
          return (
            <Form>
              <FormControl>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormLabel id="category-control-group">
                      {data.reportCategory.formLabel}
                    </FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      <RadioGroup
                        name={data.reportCategory.name}
                        value={values[data.reportCategory.name]}
                        onChange={(event, value) => {
                          setFieldValue(data.reportCategory.name, value);
                          handleChangeCategory(event);
                        }}
                      >
                        {renderRadioGroup(data.reportCategory, null)}
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item>
                    <FormLabel id="type-control-group">{data.reportType.formLabel}</FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      <RadioGroup
                        name={data.reportType.name}
                        value={values[data.reportType.name]}
                        onChange={(event, value) => {
                          setFieldValue(data.reportType.name, value);
                          handleChangeType(event);
                        }}
                      >
                        {renderRadioGroup(data.reportType, category)}
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item>
                    <FormLabel id="parameters-control-group">
                      {data.reportParameters.formLabel}
                    </FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      {renderParameters(data.reportParameters, setFieldValue, values)}
                    </Box>
                    <FormLabel id="description">{data.reportDescription.formLabel}</FormLabel>
                    <Box border={2} borderRadius={1} padding={1}>
                      {renderDescription(data.reportDescription)}
                    </Box>
                  </Grid>
                </Grid>
              </FormControl>

              <Box
                m={1}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                role={"submit_button"}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={dirty ? false : true}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
