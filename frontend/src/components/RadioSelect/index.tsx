import React, { ReactElement } from "react";
import { DataGrid, GridEventListener, GridEvents } from "@mui/x-data-grid";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, ListItemSecondaryAction, } from "@mui/material";

export const RadioSelect = ({ formLabel, defaultValue, name, data }: { formLabel: string, defaultValue: string, name: string, data:{ value:string, label:string }[] }) => {
  let radioButtons:Array<JSX.Element> = [];
  data.forEach(radioButton => {
    radioButtons.push(<FormControlLabel value={radioButton.value} control={<Radio />} label={radioButton.label} key={radioButton.value} />)
  });

    return (
    <FormControl>
            <FormLabel id="radio-buttons-group">{formLabel}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group"
                defaultValue={defaultValue}
                name={name}
            >
                {radioButtons}
            </RadioGroup>
        </FormControl>
  );
};
