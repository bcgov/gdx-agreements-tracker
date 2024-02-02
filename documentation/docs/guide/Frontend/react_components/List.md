# List

The `List` component is a React component that displays a list of data in a card format. It utilizes the Material-UI (MUI) library for styling and includes features such as styled typography, title box, and a responsive grid layout.

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
