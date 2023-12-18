# MoneyField

The `MoneyField` component is a custom text field for entering money amounts. It uses the AutoNumeric library to format the input as North American currency in real-time. The component shows a dollar sign before the input, fills the width of its parent element, and can show a label and helper text. It also validates the input and triggers an onChange function when the input changes.

## Usage

The `MoneyField` component is a custom text field designed to format numbers entered as monetary values.

Props this component will accept:

- `onChange`: A function that is called when the value of the text field changes.
- `id`: A unique identifier for the text field.
- `value`: The initial value of the text field. (expects a Number)
- `label`: The label for the text field.
- `helperText`: The helper text that appears below the text field.
- `error`: A boolean indicating whether there is an error with the text field.

The nested components `AutoNumeric` and `TextField` accept:

- **AutoNumeric**: Inside a `useEffect` hook (which runs once on initial render due to the empty dependency array), it initializes a new instance of `AutoNumeric`. This is a library that provides real-time, automatic formatting for numeric inputs. It's configured with a specific output format and minimum/maximum values.

- **TextField**: The component returns a `TextField` component (from Material-UI) with various props set. Notably:
  - `fullWidth={true}`: This makes the text field take up the full width of its container.
  - `variant="outlined"`: This gives the text field an outlined appearance.
  - `InputProps`: This prop is used to add a dollar sign (`$`) adornment to the start of the input field.
  - `id`, `onChange`, `label`, `error`, and `helperText` are passed through from the props.

## Styling

The `MoneyField` component utilizes the Material-UI `TextField` component and `InputAdornment` for its structure and styling:

- **TextField** handles the input styling
- **InputAdornment** is nested inside the InputProps of the `TextField`: this prepends the currency symbol

## Default Behavior

When the user enters a dollar amount, the number will be formatted as North American currency. Any non-numeric values will be rejected instantly. The component converts the number entered to 'money', but will handle changes using a callback called 'onChange'. This allows it to run validation routines against the number, and to make changes to other parts of the form in real time, e.g.: providing a sum of several `MoneyFields` on the same form.

_(see Projects > Project Details > Budget > ADD NEW)_

## Example

```jsx
import React, { useState } from "react";
import { MoneyField } from "./MoneyField"; // Assuming MoneyField is exported from './MoneyField'

const ParentComponent = () => {
  const [value, setValue] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <MoneyField
        id="money-input"
        value={value}
        onChange={handleChange}
        label="Enter Amount"
        helperText="Please enter a monetary amount."
      />
      <p>The current value is: {value}</p>
    </div>
  );
};

export default ParentComponent;
```

> for a working implementation, look at [frontend/src/components/Forms/Fields/index.tsx](https://github.com/bcgov/gdx-agreements-tracker/blob/2bd225b8a5c06a68cc11429a68db7e44ead9fc3c/frontend/src/components/Forms/Fields/index.tsx#L62)
