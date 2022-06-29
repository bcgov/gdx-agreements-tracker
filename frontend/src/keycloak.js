import Keycloak from "keycloak-js";
require("dotenv").config({ path: ".env" });

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'

const clientId =
  window.localStorage.getItem("from_public_server--keycloak_client_id") ??
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
const url =
  window.localStorage.getItem("from_public_server--keycloak_url") ??
  process.env.REACT_APP_KEYCLOAK_URL;
const realm =
  window.localStorage.getItem("from_public_server--keycloak_realm") ??
  process.env.REACT_APP_KEYCLOAK_REALM;

const keycloak = new Keycloak({ clientId, url, realm });

export default keycloak;
