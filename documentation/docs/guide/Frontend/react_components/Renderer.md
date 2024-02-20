# Renderer

A component that conditionally renders a loading indicator or a given component based on a boolean isLoading prop.

## Props

- `isLoading` (boolean): Indicates whether the loading indicator should be shown.
- `component` (JSX.Element): The component to render when isLoading is false.

## Example Usage

```jsx
import { LinearProgress } from "@mui/material";
import { Renderer } from "./Renderer";

const MyComponent = () => {
  const isLoading = true; // or false
  const content = <div>Content to render when not loading</div>;

  return (
    <Renderer isLoading={isLoading} component={content} />
  );
};
