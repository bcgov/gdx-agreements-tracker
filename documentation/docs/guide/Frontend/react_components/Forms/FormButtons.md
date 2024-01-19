# FormButtons

The `FormButtons` component is a React component that renders a form with two buttons: Cancel and Submit.

### Usage

`FormButtons` takes in two props: handleOnCancel, which is a function to be called when the Cancel button is clicked, and dirty, which is a boolean value indicating whether the form has been modified. The component returns a JSX element representing the form with two buttons.

- `handleOnCancel` (Function): callback function to invoke when the cancel button is clicked.
- `dirty` (boolean): if dirty, enable the Submit button, otherwise disable it.

# Styling

The buttons are styled using the custom props provided by the MUI `<Button>` Component:

- `variant`: "contained", which has a drop-shadow, is from the MUI [`<Button>`](https://mui.com/material-ui/api/button/) component.

- `color`: "success" (green), "secondary" (white). these come from the MUI theme [default color palette](https://mui.com/material-ui/customization/palette/#default-colors)

### Example

```tsx
// the <FormButtons> component appears at the bottom of this snippet

import React, { useState } from "react";
import { FormButtons } from "./FormButtons";

interface IFormValues {
  name: string;
  email: string;
}

export const MyForm = () => {
  const [formValues, setFormValues] =
    useState < IFormValues > { name: "", email: "" };
  const [dirty, setDirty] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setDirty(true);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formValues);
    setDirty(false);
  };

  const handleFormCancel = () => {
    console.log("Form cancelled");
    setDirty(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <FormButtons dirty={dirty} handleOnCancel={handleFormCancel} />
    </form>
  );
};
```

There is a working example [`components/Forms/InputForm`](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/InputForm/index.tsx)
used by the [`<formRenderer>`](https://github.com/bgov/gdx-agreements-tracker/blob/development/frontend/src/pages/Contracts/Contract/ContractDetails) on the Contracts > ContractDetails page.
