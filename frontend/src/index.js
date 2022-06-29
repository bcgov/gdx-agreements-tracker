import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import bcgovTheme from "./bcgovTheme";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{
      pkceMethod: "S256",
      idpHint: "idir",
    }}
  >
    <ThemeProvider theme={bcgovTheme}>
      <App />
    </ThemeProvider>
  </ReactKeycloakProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
