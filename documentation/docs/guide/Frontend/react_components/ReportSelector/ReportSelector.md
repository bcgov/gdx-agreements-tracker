# ResportSelector

A component that provides a form for selecting a category, type, and exporting reports.

## Props

None

## Description

The `ResportSelector` component is a form that allows users to select a category and a type of report. It also provides a description of the selected report type and allows the user to export the report in either PDF or XLSX format.

## State

- `typeDescription`: A state variable that holds the description of the selected report type.
- `initialValues`: An object that holds the initial form values, including date, category, type, exportType, and templateType.
- `PDFExportButtonDisabled` and `XLSXExportButtonDisabled`: State variables that control the disabled state of the export buttons.

## Form Management

The component uses Formik for form management. It defines a `formik` object that handles form submission and manages form values and state.

## Handlers

- `handleCategoryChange`: A handler function that updates the category value in the form and resets the type and description.
- `handleTypeChange`: A handler function that updates the type value in the form and retrieves the description of the selected type.
- `handleExportType`: A handler function that sets the exportType and templateType values in the form, triggering the form submission.

## Components

- `RadioGroup`: Displays radio buttons for selecting the category and type.
- `ReportParameters`: Displays additional parameters for the selected report type.
- `Button`: Allows the user to export the report in PDF or XLSX format.

## Dependencies

- Material-UI components for the UI elements.
- `categoriesAndTypes` from "./reportSelectorConfig" for the list of report categories and types.
- `handleReportExport` from "../../utils/handleReportExport" for handling report export logic.

## Notes

- This component provides a dynamic form for selecting and exporting reports based on user inputs.
- It is designed to be flexible and can be easily extended to support additional report types and export formats.
