# AutocompleteTable

The `AutocompleteTable` component is a React component designed for integration into forms, providing an autocomplete feature with a table display. It utilizes Material-UI components such as `Autocomplete`, `Table`, and `TextField` for rendering and user interaction.

### Props

The `AutocompleteTable` component accepts the following props:

- `fieldName` (string): The name of the field associated with the component.
- `fieldValue` (string): The current value of the field.
- `fieldLabel` (string, optional): The label to display for the field.
- `onChange` (function): A callback function triggered when the selection changes.
- `pickerData` (`IAutocompleteTable`, required): Data for the Autocomplete component, including definition and title.
- `required` (boolean, optional): Indicates whether the field is required.
- `helperText` (string, optional): Additional text to provide assistance or context.
- `error` (boolean, optional): Indicates whether there is an error with the field.
- `autocompleteTableColumns` (array of `IAutocompleteTableColumn`): Configuration for table columns.

### IAutocompleteTableColumn

- `field` (string): The field key for the column.
- `headerName` (string): The header name to display for the column.

### IOption

Represents an option in the autocomplete dropdown.

### Styles

The component uses a hover effect (`tableCellStyles`) to highlight rows when hovered over.

### example usage:
###### Note: You shouldn't have to modify or directly call this component.  This component is configured in a way that you can use it by adding a config for it in the formConfig > editFields of any frontend section.  See below for more information. 
```jsx
<AutocompleteTable
    required={required}
    as={AutocompleteTable}
    onChange={(newValue: string) => {
    setFieldValue?.(fieldName, newValue);
    }}
    fieldName={fieldName}
    fieldValue={fieldValue as IOption}
    fieldLabel={fieldLabel}
    setFieldValue={setFieldValue as Function}
    pickerData={GetPickerOptions()}
    autocompleteTableColumns={autocompleteTableColumns}
/>
```

### Data Configuration

To add a new picker option, update the picker_options model's tableLookupValues:

```js

{
  id: "autoCompleteTest",
  name: "auto_complete_test",
  title: "ACTest",
  description: "A test for autocomplete table",
  table: "",
  value: "",
  label: "",
  queryAdditions: ``,
  customDefinition: `
    (
      SELECT COALESCE(json_agg(autoCompleteTest), '[]')
      FROM (
        SELECT STOB as STOB,
        stob_id as value
        FROM data.project_budget
        WHERE project_deliverable_id = 303
      ) as autoCompleteTest
    )`,
}
```

Ensure you have a value property in your query as it is used to send data to the database.

### Frontend configuration

To configure the frontend, add a new object to the formconfig edit fields for the appropriate section, specifying the fieldType as "autocompleteTable" and providing the necessary details.

```js
    {
      fieldName: "example_name",
      fieldLabel: "Example Name",
      fieldType: "autocompleteTable",
      width: "full",
      pickerName: "auto_complete_test",  //This should match the picker name used to create the picker options in the previous step.
      autocompleteColumns:[{ field: "STOB", headerName: "STOB " }]
    },
```
