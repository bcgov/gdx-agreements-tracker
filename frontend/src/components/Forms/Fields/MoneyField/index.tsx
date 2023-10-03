import { useEffect } from "react";
import AutoNumeric from "autonumeric";
import { TextField, InputAdornment } from "@mui/material";
import { IMoneyField } from "types";

/**
 * MoneyField component for displaying and editing money values with currency symbol.
 *
 * @param   {object}      props          - The component's props.
 * @param   {string}      props.id       - The unique identifier for the input field.
 * @param   {string}      props.value    - The current value of the input field.
 * @param   {string}      props.label    - The label for the input field.
 * @param   {Function}    props.onChange - A callback function to handle value changes.
 * @returns {JSX.Element}                - A MoneyField component with an input field for money values.
 * @example
 *
 * <MoneyField
 *   id="moneyInput"
 *   value="1000"
 *   label="Amount"
 *   onChange={(newValue) => {
 *     console.log('New value:', newValue);
 *   }}
 * />
 */

export const MoneyField = ({ onChange, id, value, label }: IMoneyField) => {
  useEffect(() => {
    // Empty dependency array for running once on initial mount
    new AutoNumeric(`#${id}`, value, { outputFormat: "number" });
  }, []);

  return (
    <TextField
      fullWidth={true}
      variant="outlined"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      id={id}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      label={label}
    />
  );
};
