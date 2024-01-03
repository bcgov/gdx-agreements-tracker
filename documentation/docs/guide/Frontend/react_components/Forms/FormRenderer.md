# Form Renderer

The `FormRenderer` component is a custom React component designed to display a Form and to handle CRUD operations between it and the backend instance. It uses several material UI components for styling, including Box, Button, and LinearProgress. The Form itself relies on MUI and Formik for validation, rendering, and on the `react-query` library to support CRUD operations.

### Usage

The `FormRenderer` component takes in several props including `formControls`, `tableName`, `formConfig`, `formDataApiEndpoint`, and `isReadOnly`.
It uses several hooks to generate the props it needs to generate a dynamic form capable of CRUD operations on the table data it displays and updates. The hooks include `useQueryClient` to generate a client function for validating and running queries against the backend, and throw snackbar alerts to the client app. The `useSnackbar` hook is used to display success/fail methods on CRUD operations in the client app. It also uses several custom hooks including `useFormSubmit`, `useFormControls`, and `useFormLock` to handle form submission, form controls, and database locking respectively. This is how the props are used:

- `formControls` (object): A hook generated state object for form control information such as row data, edit mode, open/close, and form type.
- `tableName` (string[]): The key used to find the react query cache for the that item
- `formConfig` (function): A factory function that generates a form configuration object to be consumed by this renderer.
- `formDataApiEndpoint` (string): A string representing the API endpoint for form data.
- `isReadOnly` (boolean): A boolean value to indicate whether to display this form as read-only

### Example

```jsx
// This is a real example where the form renderer component
// will display a Project Details form, complete with CRUD operations
// available to the client.
import { FormRenderer } from "components/Forms/FormRenderer";
import { useParams } from "react-router";
import { FormConfig } from "./FormConfig";
import { useFormControls } from "hooks";
import { IFormControls } from "types";

export const ProjectRegistrationSection = () => {
  const { projectId } = useParams();

  const formControls: IFormControls = useFormControls();

  return (
    <FormRenderer
      formControls={formControls}
      tableName={"projects"}
      formConfig={FormConfig}
      formDataApiEndpoint={`/projects/${projectId}`}
    />
  );
};
```

##### For a current in-use example, see: [pages/Projects/Project/ProjectDetails/ProjectRegistrationSection](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/pages/Projects/Project/ProjectDetails/ProjectRegistrationSection/index.tsx)
