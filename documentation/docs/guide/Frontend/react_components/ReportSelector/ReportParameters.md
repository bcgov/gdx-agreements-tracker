# Report Parameters

## Description

The `ReportParameters` component is responsible for rendering form inputs based on the selected report category and type. It dynamically generates form inputs for various parameters such as fiscal year, portfolio, contractor name, contract, date, quarter, project type, project, and subcontractor. The component uses Material-UI's `FormInput` component for rendering the form inputs.

## Props

- `values`: An object containing the current form values.
- `setFieldValue`: A function to set form field values.
- `categoriesAndTypes`: An array containing the list of report categories and types.
- `touched`: An object containing the current touched state of form fields.

## State

None

## Functions

- `renderComponent(parameter: IReportCategoriesAndTypesParameters)`: A function that takes a parameter object and returns a `FormInput` component based on the parameter's label.

## Usage

```jsx
<ReportParameters
  values={values}
  setFieldValue={setFieldValue}
  categoriesAndTypes={categoriesAndTypes}
  touched={touched}
/>
