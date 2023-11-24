# Debug

The `Debug` component is a custom React component designed to display the current user's Role and Parsed token.



### Usage
The `Debug` component should only be used for internal development around roles and keycloak authentication.
It accepts no props, but extracts several keycloak values from a KeyCloak object built by [keycloak-js](https://www.npmjs.com/package/keycloak-js).

- `clientID`: The client identifier.
- `idTokenParsed`: The Token matching this User's clientID.
- `realmAccess`: The realmAccess object, including this User's Roles (their read/write capabilities inside the App)



### Functionality

The `Debug` component displays Two items:
- A table with the User's keycloak data:
  - Their ClientID
  - Their Client Token(s)
  - Their Client Role(s)

- A `Token to Clipboard` Button that copies the Client Token to the clipboard for debugging
  - it is styled with a background color of `#000`, and a foreground color of `#fff`.

- A second (unstyled) `logout` Button that triggers a `keycloak.logout()`


### Example

```jsx
import React from "react";
import { Debug } from "./components/Debug";

function App() {
  return (
    <div className="App">
      <h1>My React App</h1>
      {/* Render the Debug component only if the environment is development */}
      {process.env.NODE_ENV === "development" && <Debug />}
    </div>
  );
}

export default App;
```
