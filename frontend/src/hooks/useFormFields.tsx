import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from "react";

const useFormFields = (dataTypes: string) => {
  switch (dataTypes) {
    case "text":
      return (
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={""}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      );

    case "integer":
      return (
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onInput={(e:any) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12);
          }}
        />
      );

    default:
    // code block
  }
};

export default useFormFields;
