import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    clientId: 'gdx-agreements-tracker',
    url: 'https://oidc.gov.bc.ca/auth',
    realm: 'aaoozhcp',
    onLoad: 'check-sso',
});
 
export default keycloak