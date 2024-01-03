# Read Form

The `ReadForm` component is a React component designed to render a form layout with read-only fields.

### Usage

`ReadForm` takes a prop named `fields`, which is an array of field configurations. Each field configuration is an object with the following properties:

- `width` (string): Specifies the width of the field.
- `title` (string): Represents the title or label for the field.
- `value` (IReturnValue): Contains the value to be displayed in the field.
- `type` (optional, string): Indicates the type of the field (e.g., text, number).

The component then maps over the provided `fields` array, rendering a `ReadField` component for each field configuration. The `ReadField` component is assumed to be another component responsible for displaying a single read-only field based on the provided properties (width, title, value, type).

Overall, the `ReadForm` component serves as a reusable and configurable way to present read-only information in a structured form layout.

### Example

```jsx
import React from "react";
import { ReadForm } from "./ReadForm";

// Sample data for the fields
const sampleFields = [
  {
    width: "50%",
    title: "Name",
    value: "John Doe",
    type: "text",
  },
  {
    width: "30%",
    title: "Age",
    value: 25,
    type: "number",
  },
  {
    width: "100%",
    title: "Address",
    value: "123 Main St, Cityville",
    // Note: type is optional and not provided for this field
  },
  // Add more fields as needed
];

// Example usage of the ReadForm component
const App = () => {
  return (
    <div>
      <h1>User Information</h1>
      <ReadForm fields={sampleFields} />
    </div>
  );
};

export default App;
```

##### For a current in-use example, see: [components/Forms/FormRenderer](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/FormRenderer/index.tsx)
