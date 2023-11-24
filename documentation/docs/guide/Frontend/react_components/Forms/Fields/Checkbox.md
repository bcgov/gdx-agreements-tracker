# Checkbox

The `Checkbox` component is a custom React component designed to act as a standard checkbox with enhanced validation and look & feel from the Formik and MUI libraries, respectively.
It utilizes the Material-UI (MUI) Checkbox component for styling and interaction.

### Usage

1. `Create a checkbox input`: The Checkbox component is a custom React component that renders a checkbox input with a label. It is imported from ./Checkbox and used inside a Formik form.

2. `Handle user selection`: The Checkbox component allows users to check or uncheck the option represented by the checkbox. The name prop is used to bind the checkbox value to the Formik values object. The label prop is used to display the text next to the checkbox.
3. `Validate user input` The Checkbox component also handles the validation and error messages for the checkbox input. It uses the Yup schema validation library to define the validation rules and display the error messages.

The Checkbox component takes the following props:
- `checked`: tells the checkbox whether it should display checked or not on each render
- `fieldName`: this references the field whose value the checkbox controls
- `setFieldValue`: controls the referenced Field using `fieldname` and `event.target.checked`
- `helperText`: this holds a custom error to display to the user below the checkbox
- `error`: if error === true, then display the `helperText` message in red

### Styling

The `Checkbox` custom component wraps the Material-UI Checkbox component and applies custom styling to the helperText using Material UI classes.

### Example


```jsx
import React from 'react';
import { Formik, Form } from 'formik';
import { Checkbox } from './Checkbox';

const App = () => {
  return (
    <Formik
      initialValues={{
        agree: false,
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        errors, // error list, organized by fieldName
        checked,
        handleChange = () => {},
        fieldName,
        setFieldValue,
        helperText,
        touched, // tracks whether the checkbox was clicked yet
      }) => (
        <Form>
          <Checkbox
            checked={fieldValue as boolean}
            onChange={handleChange as Function}
            fieldName={fieldName}
            setFieldValue={setFieldValue as Function}
            helperText={touched[fieldName] && errors[fieldName]}
            error={touched[fieldName] && Boolean(errors[fieldName])}
          />
        </Form>
      )}
    </Formik>
  );
};

export default App;
```
##### for a current in-use example, see: [components/Forms/FormInput](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/FormInput/index.tsx)

