# Accordion

The `Accordion` component is a custom React component designed to create expandable sections or panels within a user interface. It utilizes the Material-UI (MUI) library for styling and interaction.

### Usage

The `Accordion` component is used to wrap content that you want to be hidden by default but expandable when the user interacts with it. It takes the following props:

- `children`: Accepts JSX elements or components that represent the content to be displayed within the accordion when expanded.
- `sectionTitle`: A string that represents the title or label of the accordion section.



### Styling

The `Accordion` component utilizes the Material-UI `Accordion`, `AccordionSummary`, and `AccordionDetails` components for its functionality. It also applies custom styling using the `styled` utility from Material-UI.

- The summary section of the accordion is styled with a background color of `#f3f3f3`.
- The section title text is styled with a bold font weight and a color based on the primary color defined in the `bcgovTheme`.

### Default Behavior

The `Accordion` component is set to be expanded by default, meaning that its content will be visible when the component is initially rendered. Users can interact with the accordion to collapse or expand it by clicking on the expand/collapse icon.

Feel free to integrate this component into your React application to create collapsible sections or panels with ease.


### Example

```jsx
import * as React from "react";
import { Accordion } from "./Accordion"; // Import the Accordion component

function App() {
  return (
    <div>
      <Accordion sectionTitle="Section 1">
        {/* Content for Section 1 */}
      </Accordion>
      <Accordion sectionTitle="Section 2">
        {/* Content for Section 2 */}
      </Accordion>
    </div>
  );
}


export default App;



