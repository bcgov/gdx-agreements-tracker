# BudgetDisplay

The `BudgetDisplay` component is a React component designed to display budget-related data fetched from an API endpoint. It utilizes Material-UI, Axios, and React Query for data management and presentation.

### Usage

The `BudgetDisplay` component is used to fetch and display budget data from a specified API endpoint. It accepts the following prop:

- `apiUrl`: A string representing the URL of the API endpoint from which budget data should be fetched.

### Functionality

The `BudgetDisplay` component performs the following actions:

1. It uses the `useAxios` custom hook to manage Axios requests and fetch data from the provided API endpoint.

2. The `getBudgetData` function is an asynchronous function that fetches data from the API and extracts the budget-related data.

3. It utilizes the `useQuery` hook from the `react-query` library to cache and manage data retrieval. The options for `useQuery` are configured to control data fetching behavior.

4. The component displays a grid using Material-UI's `Grid` component with specified spacing and styling.

5. If data has not been fetched yet, it displays a loading indicator using the `Loader` component.

6. Once data is available, it maps over the budget data and creates a list for each budget object. Each list displays budget-related information, including total hours, fees, expenses, and other relevant details.

### Example

```jsx
import * as React from "react";
import { BudgetDisplay } from "./BudgetDisplay"; // Import the BudgetDisplay component

function App() {
  const apiUrl = "https://example.com/api/budget"; // Replace with your API endpoint URL

  return (
    <div>
      <BudgetDisplay apiUrl={apiUrl} />
    </div>
  );
}

export default App;