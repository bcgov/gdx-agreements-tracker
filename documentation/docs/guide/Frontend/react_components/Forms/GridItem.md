# Grid Item

The `GridItem` component is a custom React component designed to act as a layout container for child components, specifically Form Inputs; be they Text, Numerical, or Checkboxes.
It has no styling of its own, though it uses a `Grid` component to wrap the children that are passed in as props.

### Props

The `GridItem` component wraps its child components in a `Grid` component from the Material-UI library, which is a layout component that arranges its child component(s) in a grid. The `Grid` component does the actual layout, and takes a [number of props](https://mui.com/material-ui/api/grid/), potentially, but in `GridItem` we only utilize `children` and the `lg` breakpoint, which determines the number of columns that will be used in the grid layer (either 12 or 6)

- `children` (JSX.element): one or more components to be laid out in a grid
- `width` (string): either "half" or "full", which correspond to 6 and 12 columns, respectively.
  - the xs, sm, and md breakpoints are literally assigned 12 columns
  - the lg breakpoint will be set to 6 if `width` prop is "half", and 12 if `width` is "full".

### Usage

In the example below, you can see where the `Field` is used to pass the `children` into the container component. each child gets its own set of props, but otherwise this container needs no other properties in order to perform its grid layout task.

### Example

```jsx
import React from 'react';
import GridItem from '@mui/material/GridItem';
import Field from '../Field';

export default function BasicGrid() {
  return (
        <GridItem width={width}>
          // children
          <Field
            required={required}
            fullWidth={true}
            as={TextField}
            name={fieldName}
            onChange={(newValue: string) => {
              handleChange(newValue);
            }}
            label={fieldLabel}
            id={fieldName}
            role={`${fieldName}_input`}
            helperText={touched[fieldName] && errors[fieldName]}
            error={touched[fieldName] && Boolean(errors[fieldName])}
          />
        </GridItem>
}

```

##### for a current in-use example, see: [components/Forms/Fields](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/Fields/index.tsx)
