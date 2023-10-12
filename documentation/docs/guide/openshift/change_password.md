# Changing Passwords

## Postgres
* Log in to [Silver Cluster](https://console.apps.silver.devops.gov.bc.ca/k8s/cluster/projects).
* Select the project you would like to change the password(s)for ie:
  * `<licenseplate>-test`
  * `<licenseplate>-dev`
  * `<licenseplate>-prod`
* Using the lefthand nav menu, navigate to:
    ```
    Administrator
      |
      Workloads
        |
        Secrets
    ```
* Select the most recently dated `pmo-secrets-<unique-identifier>` secret.
* Enter the YAML for the secret.
* Convert your desired password to base64 using a conversion tool.
* Replace the desired password in the YAML with your converted password.
* Save the YAML.
