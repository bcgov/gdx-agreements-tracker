# Yup Form Validation
### Adding Validation Schema to a Form

To add a validation schema to a form section, you need to export a `validationSchema` object within the `FormConfig.ts` file. This object will define the validation rules for the fields in that specific form section. Below is an example implementation using the Yup validation library.

### Example Implementation

Assuming you have a `FormConfig.ts` file, you can follow these steps:

1. Import necessary validation methods from Yup at the beginning of your file:

```typescript
import { object, number } from "yup";
```

2. Create the validationSchema object using Yup's API. Here's an example with a field named exampleField:

```typescript
const validationSchema = object().shape({
  exampleField: number().typeError("Custom not a number message!"),
});

export { validationSchema };
```

In this example, the validationSchema is defining that the exampleField should be a number, and if it's not, a custom error message will be displayed.


Here is the whole code:

```typescript
import { object, number } from "yup";

const validationSchema = object().shape({
  exampleField: number().typeError("Custom not a number message!"),
});

export { validationSchema };

```

### Yup Documentation
For more information about Yup and its validation methods, you can refer to the [Yup documentation](https://github.com/jquense/yup).