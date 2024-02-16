# Loader

The `Loader` component is a React component that wraps the `LinearProgress` component. The **`LinearProgress`** component in React is part of the **Material-UI** library. It serves as a visual indicator for ongoing processes, such as loading an app, submitting a form, or saving updates. Here are the key points about this component:

1. **Purpose**:

   - **Linear Progress** components inform users about the status of ongoing tasks.
   - They indicate how long an operation will take (determinate mode) or visualize an unspecified wait time (indeterminate mode).

2. **Usage**:

   - Import the component from `@mui/material`.
   - Use it within your React components to display a linear progress bar.

3. **Variants**:

   - **Indeterminate**: Represents an unspecified wait time.
   - **Determinate**: Shows how long an operation will take (requires setting a value).
   - **Buffer**: Displays a buffer progress (useful for file uploads or downloads).

4. **Customization**:
   - You can customize the color, size, and other properties of the `LinearProgress` component.

For more details and additional customization options, refer to the [Material-UI documentation](https://mui.com/material-ui/react-progress/) ¹.

## Usage

The `List` component is designed to display a list of data with a specified title. It takes the following props:

- `data`: An array of objects representing the rows of the list.
- `title`: A string representing the title of the list.

## Styling

The `List` component utilizes Material-UI `Card`, `CardContent`, `Grid`, `ListItem`, `Paper`, `Typography`, and `List` components for its structure and styling. It has the following styling specifications:

- Title Box: Centered text with a background color of `#666`, and text color of `#fff`.
- Typography Alignment: Left-aligned and right-aligned for different sections of the list.

## Default Behavior

The `List` component renders a card with a title box and a responsive grid layout displaying the provided data.

## Example

```jsx
import * as React from "react";
import { List } from "./List"; // Import the List component

function App() {
  const sampleData = [
    { key1: "Value1", key2: "Value2" },
    { key1: "Value3", key2: "Value4" },
    // Add more data rows as needed
  ];

  return (
    <div>
      <List data={sampleData} title="Sample List" />
    </div>
  );
}

export default App;
```
