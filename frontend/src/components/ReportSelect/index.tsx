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
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const ReportSelect = ({ data }: { data: IData }) => {
  // Handle state changes
  const [category, setCategory] = useState(data.reportCategory.defaultValue);
  const [type, setType] = useState(data.reportType.defaultValue);
  const [date, setDate] = React.useState<Date | null>(new Date());

  const handleChangeCategory = (event: React.FormEvent<HTMLInputElement>) => {
    setCategory(event.currentTarget.value);
  };
  const handleChangeType = (event: React.FormEvent<HTMLInputElement>) => {
    setType(event.currentTarget.value);
  };
  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
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

  const renderSelect = (parameter: ISelect) => {
    return (
      <FormControl key={parameter.id + "_div"}>
        <FormLabel id={parameter.id} key={parameter.id + "_label"}>
          {parameter.label}:
        </FormLabel>
        <Select
          id={parameter.id}
          defaultValue={parameter.defaultValue}
          label={parameter.label}
          key={parameter.id + "_select"}
        >
          {parameter.options.map((menuItem: IOption) => {
            return (
              <MenuItem value={menuItem.value} key={menuItem.value}>
                {menuItem.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const renderDate = (parameter: IDate) => {
    return (
      <FormControl key={parameter.id + "_div"}>
        <FormLabel id={parameter.id} key={parameter.id + "_label"}></FormLabel>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    );
  };

  const renderCheckbox = (parameter: ICheckbox) => {
    return (
      <FormControl key={parameter.id + "_div"}>
        <FormLabel component="legend">{parameter.label}</FormLabel>
        <FormGroup>
          {parameter.options.map((checkbox: IOption) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                label={checkbox.value}
                key={checkbox.value}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    );
  };

  const renderParameters = (
    reportParameters: {
      name: string;
      formLabel: string;
      components: Array<ISelect | IDate | ICheckbox>;
    },
    state: string
  ) => {
    return reportParameters.components.map((component: ISelect | IDate | ICheckbox) => {
      if (component.parents.includes(state)) {
        switch (component.input) {
          case "select":
            return renderSelect(component);
          case "date":
            return renderDate(component);
          case "checkbox":
            return renderCheckbox(component);
          default:
            return <FormControl></FormControl>;
        }
      }
    });
  };

  const renderDescription = (reportDescription: IDescription, state: string) => {
    return reportDescription.options.map(
      (description: { id: number; value: string; parent: string }) => {
        if (state === description.parent) {
          return <p key={description.id}>{description.value}</p>;
        }
      }
    );
  };

  return (
    <FormControl>
      <Grid container spacing={2}>
        <Grid item>
          <FormLabel id="category-control-group">{data.reportCategory.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            <RadioGroup
              name={data.reportCategory.name}
              value={category}
              defaultValue={data.reportCategory.defaultValue}
              onChange={handleChangeCategory}
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
              value={type}
              defaultValue={data.reportType.defaultValue}
              onChange={handleChangeType}
            >
              {renderRadioGroup(data.reportType, category)}
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item>
          <FormLabel id="parameters-control-group">{data.reportParameters.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            {renderParameters(data.reportParameters, type)}
          </Box>
          <FormLabel id="description">{data.reportDescription.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            {renderDescription(data.reportDescription, type)}
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );
};
