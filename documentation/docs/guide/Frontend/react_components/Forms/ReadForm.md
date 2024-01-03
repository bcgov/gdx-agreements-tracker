# Read Form

This React component is designed to create a flexible and reusable input form using the Formik library for form management and validation. The component, named `ReadForm`,
serves as a wrapper that encapsulates the configuration and rendering of form fields based on the provided parameters.


### Usage
1. **Form Configuration**: The component takes several parameters (`handleOnSubmit`, `initialValues`, `handleOnCancel`, `editFields`, `validationSchema`) to configure the form's behavior.

2. **Dynamic Field Rendering**: The `editFields` array allows the dynamic rendering of input fields based on the specified configuration for each field. Each field is described by properties like `fieldName`, `fieldType`, `fieldLabel`, etc.

3. **Formik Integration**: The component integrates with Formik, a popular form management library for React. It uses the `Formik` component to handle form state, form submission (`handleOnSubmit`), and form validation (`validationSchema`).

4. **Customization**: The component allows customization of field behavior through various optional properties such as `customOnChange`. This enables the user to define custom logic when a specific input field changes.

5. **Form Layout and Buttons**: The form structure is managed with a custom `FormLayout` component. Additionally, there's a `FormButtons` component responsible for rendering form buttons, including a cancellation button (`handleOnCancel`) and dynamic enablement based on form dirtiness (`dirty`).

In summary, this `InputForm` component is a configurable and reusable form that leverages Formik for state management and validation. It provides a way to easily create input forms with dynamic fields and customizable behavior for different use cases within a React application.


## Styling

The `InputForm` component utilizes Material-UI components for its structure and interaction.



### Example

```jsx
  import React from 'react';
  import { InputForm } from './InputForm'; // Adjust the import path based on your project structure

  // Assume you have a function for handling form submission
  const handleFormSubmit = (values) => {
    // Logic to handle form submission
    console.log('Form submitted with values:', values);
  };

  // Assume you have a function for handling form cancellation
  const handleFormCancel = () => {
    // Logic to handle form cancellation
    console.log('Form canceled');
  };

  // Sample initial form values
  const initialFormValues = {
    username: '',
    email: '',
    password: '',
    // ... other fields
  };

  // Sample validation schema
  // (Yup is what we use natively - search for 'validationSchema' in this repo globally to see working examples)
  const validationSchema = /* ... */;

  // Sample configuration for editFields
  const editFields = [
    {
      fieldName: 'username',
      fieldType: 'text',
      fieldLabel: 'Username',
      width: 6,
      required: true,
    },
    {
      fieldName: 'email',
      fieldType: 'email',
      fieldLabel: 'Email',
      width: 6,
      required: true,
    },
    {
      fieldName: 'password',
      fieldType: 'password',
      fieldLabel: 'Password',
      width: 12,
      required: true,
    },
    // ... add more fields as needed
  ];

  const App = () => {
    return (
      <div>
        <h1>User Registration Form</h1>
        <InputForm
          handleOnSubmit={handleFormSubmit}
          initialValues={initialFormValues}
          handleOnCancel={handleFormCancel}
          editFields={editFields}
          validationSchema={validationSchema}
        />
      </div>
    );
  };

  export default App;
```

##### For a current in-use example, see: [components/Forms/ReadForm](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/ReadForm/index.tsx)
