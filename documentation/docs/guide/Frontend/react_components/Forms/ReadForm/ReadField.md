# ReadField

The `ReadForm` component is a React component designed to render a form layout with read-only fields.

### Usage

The `ReadField` component is designed to render a read-only field based on the specified properties. It serves as a flexible component capable of displaying various types of read-only content, such as text, checkboxes, multi-select options, or links, depending on the provided `type` prop. The primary purpose is to present information in a visually consistent and accessible manner.

Key features and purposes of the `ReadField` component:

1. **Dynamic Rendering:** The component dynamically renders different types of content based on the `type` prop. It supports rendering text fields, checkboxes, multi-select options, and links.

2. **Consistent Styling:** The component ensures a consistent visual style for read-only fields, with attention to disabled states, color schemes, and layout.

3. **Accessibility:** It includes accessibility features, such as providing additional helper text and error indicators when applicable. The use of color contrast and disabled states enhances the component's accessibility.

4. **Routing:** In the case of links (`type` set to "link"), the component utilizes React Router's `useNavigate` function to enable navigation when a link is clicked.

5. **Modularity:** The code structure and usage of modular components, such as `GridItem`, contribute to the overall maintainability and reusability of the code.

Overall, the `ReadField` component is designed to be a versatile and user-friendly tool for rendering read-only information in a variety of formats within a larger application.

#### The `ReadField` component accepts the following props:

1. **width (required):**

   - Type: `string`
   - Purpose: Specifies the width of the read-only field, allowing for flexible layout configurations.

2. **title (required):**

   - Type: `string`
   - Purpose: Represents the title or label associated with the field, providing context for the displayed information.

3. **value (required):**

   - Type: `IReturnValue`
   - Purpose: Holds the value to be displayed within the read-only field. The type `IReturnValue` suggests it can accommodate various data types.

4. **type (optional):**

   - Type: `string`
   - Default: `undefined`
   - Purpose: Determines the type of content to be rendered within the field. Valid options include "multiSelect," "checkbox," "link," or undefined for a default text field.

5. **helperText (optional):**

   - Type: `string`
   - Default: `undefined`
   - Purpose: Provides additional text that can offer guidance or clarification related to the displayed information. This is particularly useful for conveying supplementary details or instructions.

6. **error (optional):**
   - Type: `boolean`
   - Default: `undefined`
   - Purpose: Indicates whether an error is associated with the field. If `true`, it triggers error styling and may display the provided `helperText` to convey relevant error information.

These props collectively allow the `ReadField` component to be highly configurable and adaptable to different use cases. The dynamic rendering of content based on the `type` prop enhances its versatility, making it suitable for various scenarios within a larger application.

### Example

```jsx
import React from "react";
import { ReadField } from "./path/to/ReadFieldComponent";
import { IReturnValue } from "types";

const ExampleComponent = () => {
  // Example data
  const stringValue: IReturnValue = "Example Text";
  const checkboxValue: IReturnValue = true;
  const multiSelectValue: IReturnValue = ["Option 1", "Option 2"];
  const linkValue: IReturnValue = [
    { link: "/details/1", label: "Details 1" },
    { link: "/details/2", label: "Details 2" },
  ];

  return (
    <div>
      {/* Example of a default text field */}
      <ReadField width="50%" title="Text Field" value={stringValue} />

      {/* Example of a checkbox field */}
      <ReadField
        width="50%"
        title="Checkbox Field"
        value={checkboxValue}
        type="checkbox"
      />

      {/* Example of a multi-select field */}
      <ReadField
        width="50%"
        title="Multi-Select Field"
        value={multiSelectValue}
        type="multiSelect"
      />

      {/* Example of a link field */}
      <ReadField width="50%" title="Link Field" value={linkValue} type="link" />

      {/* Example with error and helper text */}
      <ReadField
        width="50%"
        title="Error Field"
        value={stringValue}
        error={true}
        helperText="This is an example error message."
      />
    </div>
  );
};

export default ExampleComponent;
```

##### For a current in-use example, see: [components/Forms/ReadForm](https://github.com/bcgov/gdx-agreements-tracker/tree/development/frontend/src/components/Forms/ReadForm)
