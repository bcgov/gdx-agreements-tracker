# Form Input

The `FormInput` component in React is designed to handle the rendering of various form input fields with different types, such as text fields, date pickers, money fields, and more. It utilizes Material-UI components and integrates with Formik for form management.

### Usage

1. **Component Props**:
    - `errors`: Object containing form field errors.
    - `setFieldValue`: Function to set the form field value.
    - `fieldValue`: Current value of the form field.
    - `fieldName`: Unique identifier for the form field.
    - `fieldType`: Type of the form field (e.g., "money", "date", "select").
    - `fieldLabel`: Label for the form field.
    - `handleChange`: Function to handle changes in the form field.
    - `width`: Width of the form field within the grid layout.
    - `pickerName`: Name of the picker (for date pickers).
    - `tableName`: Name of the table (for picker options).
    - `projectId`: Identifier for the project (for picker options).
    - `contractId`: Identifier for the contract (for picker options).
    - `required`: Boolean indicating if the form field is required (default: `false`).
    - `touched`: Object containing information about touched form fields.
    - `autocompleteTableColumns`: Columns configuration for the AutocompleteTable field.
    - `customOnChange`: Function for custom handling of field changes.
    - `generateValueButton`: Configuration for a button that generates a field value dynamically.

2. **Field Types**:
    - **Money Field** (`fieldType: "money"`): A field for handling monetary values.
    - **Date Picker** (`fieldType: "date"`): A field for selecting dates.
    - **Single Text Field** (`fieldType: "singleText"`): A single-line text input field.
    - **Multi-Text Field** (`fieldType: "multiText"`): A multi-line text input field.
    - **Select Field** (`fieldType: "select"`): A dropdown/select field.
    - **Autocomplete Table Field** (`fieldType: "autocompleteTable"`): A field with autocomplete suggestions from a table.
    - **Number Field** (`fieldType: "number"`): A numeric input field.
    - **Checkbox Field** (`fieldType: "checkbox"`): A checkbox input field.
    - **Readonly Field** (`fieldType: "readonly"`): A read-only field.

3. **Integration**:
    - The component integrates with Formik for form state management.
    - Material-UI components such as `TextField`, `DatePicker`, and `Button` are used for rendering.

4. **Example**

```jsx
import React from 'react';
import { FormInput } from './FormInput'; // Adjust the import path based on your project structure

const ExampleForm = () => {
  const handleFieldChange = (newValue) => {
    // Custom logic for handling field changes
  };

  return (
    <form>
      {/* Example usage of FormInput for a money field */}
      <FormInput
        errors={/* ... */}
        setFieldValue={/* ... */}
        fieldValue={/* ... */}
        fieldName="exampleMoneyField"
        fieldType="money"
        fieldLabel="Money Field"
        handleChange={handleFieldChange}
        width={6}
        required={true}
      />
      
      {/* Other FormInput usage for different field types */}
      {/* ... */}

    </form>
  );
};

export default ExampleForm;
