# Select

The Select component is designed to be a flexible and reusable React component that provides a user interface element for selecting values from a list with autocomplete functionality. Its design and features suggest that it is intended for scenarios where users need to choose from a set of predefined options, and the component enhances the user experience by allowing for autocompletion and dynamic suggestions.

### Props

The Select component accepts several props that provide configuration options and data to customize its behavior. Here's an explanation of each prop based on the provided IPickerProps. These props collectively allow the Select component to be highly configurable and adaptable to various use cases, providing a flexible and reusable UI element for selecting values with autocomplete functionality.

- `error` (string): Purpose: Represents an error message associated with the field. If an error occurs in the field (e.g., validation error), this prop is used to display an error message below the input field.
- `fieldLabel` (string): Specifies the label for the input field. Sets the visible label for the input field, providing a description of the expected input.

- `fieldName` (string): Represents the name of the field. Used as the id for the Autocomplete component and the name for the TextField component. It's a unique identifier for the field.

- `fieldValue` (IOption): Represents the current value of the field. Specifies the selected value in the input field. It is controlled by the parent component, and changes trigger the onChange callback.

- `helperText` (string): Provides additional helper text below the input field. Used to give users additional information or guidance related to the input field.

- `multiple` (boolean): Indicates whether the field allows multiple selections. If true, the Autocomplete component allows users to select multiple options. If false, only a single option can be selected.

- `onChange` (Function): Specifies the callback function to be executed when the field value changes.
  Usage: The function is called with the newly selected value as an argument, allowing the parent component to handle changes to the field value.

- `pickerData` (object): Provides data to populate the autocomplete options. Contains the options that users can select from. It includes a definition property, which is an array of options, and a title property used for the label if fieldLabel is not provided.

- `required` (boolean): Indicates whether the field is required. If true, the input field is marked as required, typically influencing form validation.

### Styles

The provided `Select` component doesn't explicitly contain any custom styling within the code snippet you provided. Instead, it relies on the styling capabilities provided by Material-UI components (`Autocomplete`, `Skeleton`, `TextField`). Material-UI components often come with their own default styles and allow for customization through the use of classes, themes, and style props.

Here are some aspects to consider regarding the styling of this component:

1. **Material-UI Styles:**

   - Material-UI components often come with default styles that provide a consistent Material Design look and feel.
   - The appearance of the `Autocomplete`, `Skeleton`, and `TextField` components is likely influenced by the default Material-UI styles.

2. **Theme Styling:**

   - Material-UI allows styling customization through the use of themes. The component's appearance may be influenced by the theme in use in the broader application.

3. **Inline Styles and Props:**

   - The component uses various props like `error`, `label`, `name`, etc., to customize the appearance of the `TextField` component within the `Autocomplete`.
   - The `Skeleton` component might have some default styles applied, and its dimensions are set using the `width` and `height` props.

4. **CSS-in-JS Libraries:**

   - If your project uses a CSS-in-JS library like `@emotion/styled` (commonly used with Material-UI), the styling may be defined using such a library.

5. **Global Styles:**
   - The styling of the `Select` component could also be influenced by global styles applied to Material-UI components or other global stylesheets in your application.

### example usage:

###### Note: You shouldn't have to modify or directly call this component. This component is configured in a way that you can use it by adding a config for it in the formConfig > editFields of any frontend section. See below for more information.

```jsx
import React, { useState } from "react";
import { Select } from "./path-to-Select-component"; // Adjust the path accordingly

const FormComponent = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  // Mock data for the Autocomplete options
  const pickerData = {
    title: "Select an Option",
    definition: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  };

  const handleChange = (newValue) => {
    // Handle the change of the selected value
    setSelectedValue(newValue);
  };

  return (
    <div>
      <h2>Your Form</h2>
      <Select
        error={/* Error message, if any */}
        fieldLabel="Select Field"
        fieldName="selectField"
        fieldValue={selectedValue}
        helperText="Choose an option from the list"
        multiple={false} // Set to true if you want to allow multiple selections
        onChange={handleChange}
        pickerData={pickerData}
        required={true}
      />
      <p>Selected Value: {selectedValue ? selectedValue.label : "None"}</p>
    </div>
  );
};

export default FormComponent;
```

##### for a current in-use example, see: [components/Forms/ReadForm/ReadField](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/ReadForm/ReadField/index.tsx)
