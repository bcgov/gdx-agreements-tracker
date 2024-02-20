# Report Types

## Description

The `ReportTypes` component renders a list of radio buttons, each representing a type of report within the selected category. It takes the currently selected category and renders radio buttons for each type within that category. The component uses Material-UI's `FormControlLabel` and `Radio` components for rendering the radio buttons.

## Props

- `values`: An object containing the current form values.
- `categoriesAndTypes`: An array containing the list of report categories and types.

## State

None

## Functions

None

## Usage

```jsx
<ReportTypes
  values={values}
  categoriesAndTypes={categoriesAndTypes}
/>
