import React, { ChangeEvent, ChangeEventHandler, ReactElement, useState } from "react";
import { Box, Radio, styled, RadioGroup, FormControlLabel, FormControlLabelProps, FormControl, FormLabel, useRadioGroup, } from "@mui/material";
import { EventType } from "@testing-library/react";

export const RadioSelect = ({ formLabel, defaultValue, name, options }:
  { formLabel: string, defaultValue: string, name: string, options:{parent:string, value:string, label:string}[]} ) => {

  const [selectedValue, setSelection] = useState(defaultValue)

  function onChangeValue(event:React.FormEvent<HTMLInputElement>) {
    setSelection(event.currentTarget.value);
    //console.log(event.currentTarget.name, '-', event.currentTarget.value);
  }

  return (
    <FormControl>
      <FormLabel id="radio-control-group">{formLabel}</FormLabel>
      <Box border={2} borderRadius={1} padding={1}>
        <RadioGroup id={name} name={name} value={selectedValue} defaultValue={defaultValue} onChange={onChangeValue}>
          {options.map((radioButton) => {
            return <FormControlLabel value={radioButton.value} label={radioButton.label} key={radioButton.value} control={<Radio />} />
          })}
        </RadioGroup>
      </Box>
    </FormControl>
  );
};
