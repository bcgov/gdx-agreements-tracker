# Form Layout

The `FormLayout` component is a custom React component designed to act as a layout container for child components, specifically Forms.
It has no styling of its own, though it uses a `Grid` component to wrap the children that are passed in as props.

### Props

The `FormLayout` component wraps its child components in a `Grid` component from the Material-UI library, which is a layout component that arranges its child component(s) in a grid. The `Grid` component does the actual layout, and takes a [number of props](https://mui.com/material-ui/api/grid/), potentially, but in `formLayout` we only utilize two of them.

- `children` (JSX.element): one or more components to be laid out in a grid
  - `container` (boolean): If true, the container will have the `Flex` container property. default false.
  - `spacing` (Array(<number|string>) | number | object | string): default 0.
    This defines the space between the `item` components and can only be used on a `container` component, i.e. when the container prop above is true.

### Usage

In the example below, you can see where `fields.map` is used to pass the `children` into the container component. each `ReadField` child gets its own set of props, but otherwise this container needs no other properties in order to perform its grid layout task.

### Example

```jsx
import React from "react";
import { IReturnValue } from "types";
import { ReadField } from "./ReadField";
import { FormLayout } from "components/Forms/FormLayout";

export const ReadForm = ({
  fields,
}: {
  fields: {
    width: string,
    title: string,
    value: IReturnValue,
    type?: string,
  }[],
}) => {
  return (
    <FormLayout>
      {fields.map(({ width, title, value, type }) => {
        return (
          <ReadField
            width={width}
            title={title}
            value={value}
            key={title}
            type={type}
          ></ReadField>
        );
      })}
    </FormLayout>
  );
};
```

##### for a current in-use example, see: [components/Forms/InputForm](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/InputForm/index.tsx)
