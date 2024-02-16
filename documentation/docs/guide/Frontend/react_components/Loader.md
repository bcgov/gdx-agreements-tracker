# Loader

The `Loader` component is a React component that wraps the `LinearProgress` component. The **`LinearProgress`** component in React is part of the **Material-UI** library. It serves as a visual indicator for ongoing processes, such as loading an app, submitting a form, or saving updates. Here are the key points about this component:

## Purpose

- **Linear Progress** components inform users about the status of ongoing tasks.
- They indicate how long an operation will take (determinate mode) or visualize an unspecified wait time (indeterminate mode).

## Usage

- Import the component from `@mui/material`.
- Use it within your React components to display a linear progress bar.

### Variants

- **Indeterminate**: Represents an unspecified wait time.
- **Determinate**: Shows how long an operation will take (requires setting a value).
- **Buffer**: Displays a buffer progress (useful for file uploads or downloads).

### Customization

- You can customize the color, size, and other properties of the `LinearProgress` component.

For more details and additional customization options, refer to the [Material-UI documentation](https://mui.com/material-ui/react-progress/) ¹.

## Example

```jsx
import { LinearProgress } from "@mui/material";
import { FC } from "react";

/**
 * Renders a linear progress loader.
 *
 * @returns {ReactNode} A React element representing the linear progress loader.
 */
export const Loader: FC = () => {
  return <LinearProgress />;
};
```
