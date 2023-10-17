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
* View the YAML for the secret.
* Convert your desired password(s) to base64 using a conversion tool.
* Replace the desired password(s) in the YAML with your converted password, replacing the password(s) already there.
* Save the YAML.
