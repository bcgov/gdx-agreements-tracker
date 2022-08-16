import React, { ChangeEvent, ChangeEventHandler, ReactElement, useState } from "react";
import { Box, Radio, styled, RadioGroup, FormControlLabel, FormControlLabelProps, FormControl, FormLabel, useRadioGroup, Grid, Select, MenuItem, } from "@mui/material";
import { EventType } from "@testing-library/react";

export const ReportSelect = ({ data }:
  { data:any } ) => {

  // Handle state changes
  const [selectedCategory, setCategory] = useState(data.reportCategory.defaultValue)
  const [selectedType, setType] = useState(data.reportType.defaultValue)

  function onChangeCategory(event:React.FormEvent<HTMLInputElement>) {
    setCategory(event.currentTarget.value);
  }
  function onChangeType(event:React.FormEvent<HTMLInputElement>) {
    setType(event.currentTarget.value);
  }

  // Handle rendering complex elements
  function renderRadioGroup(radioGroup:any, state:string) {
   return (
      radioGroup.options.map((radioButton:any) => {
        if(state === radioButton.parent){
          return <FormControlLabel value={radioButton.value} label={radioButton.label} key={radioButton.value + "_radio_button"} control={<Radio />} />
        }
      })
    )
  }

  function renderParameters(reportParameters:any, state:string) {
    return(
      reportParameters.components.map((parameters:any) => {
        if(state === parameters.parent){
          return(
            <div key={parameters.id + "_div"}>
              <FormLabel id={parameters.id} key={parameters.id + "_label"}>{parameters.label}:</FormLabel>
              <Select id={parameters.id} value={parameters.defaultValue} label={parameters.label} key={parameters.value + "_select"}>
                {parameters.options.map((menuItem:any) => {
                  return(
                    <MenuItem value={menuItem.value} key={menuItem.value}>{menuItem.value}</MenuItem>
                  )
                })}
              </Select>
            </div>
      )}
      })
    )
  }

  function renderDescription(reportDescription:any, state:string) {
    return (
      reportDescription.options.map((description:any) => {
         if(state === description.parent) {
           return <p key={description.id} >{description.value}</p>
         }
       })
    )
  }

  return (
    <FormControl>
       <Grid container spacing={2}>
        <Grid item>
          <FormLabel id="category-control-group">{data.reportCategory.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            <RadioGroup name={data.reportCategory.name} value={selectedCategory} defaultValue={data.reportCategory.defaultValue} onChange={onChangeCategory}>
              {renderRadioGroup(data.reportCategory, "")}
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item>
          <FormLabel id="type-control-group">{data.reportType.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            <RadioGroup name={data.reportType.name} value={selectedType} defaultValue={data.reportType.defaultValue} onChange={onChangeType}>
              {renderRadioGroup(data.reportType, selectedCategory)}
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item>
          <FormLabel id="parameters-control-group">{data.reportParameters.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            {renderParameters(data.reportParameters, selectedType)}
          </Box>
          <FormLabel id="description">{data.reportDescription.formLabel}</FormLabel>
          <Box border={2} borderRadius={1} padding={1}>
            {renderDescription(data.reportDescription, selectedType)}
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );
};
