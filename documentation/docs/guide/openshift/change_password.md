# Changing Passwords

## Postgres
* In a terminal from the tenant repo code root, run:
  ```
  git checkout main
  git pull
  git checkout -b <feature/your-branchname-goes-here>
  ```
* From the tenant repo, note the following in the kustomization.yaml for the project(s) you would like to change the password(s) for:
  * POSTGRES_USER
  * POSTGRES_REGULAR_USER
  * POSTGRES_DB
* In the same file(s), change any password(s) as needed in the section under:
    ```
    ...
    secretGenerator:
    - name: secrets
      type: Opaque
      behavior: merge
      literals:
      - POSTGRESS_PASSWORD=<some-password>
      - POSTGRES_REGULAR_USER=<some-password>
    ```
* Commit and submit your changes in a pull request so they can be merged into main.
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
        Pods
    ```
* Select the `pmo-postgres-deployment-<unique-identifier>` pod.
* Enter the terminal for the pod.
* In the terminal, use the command:
```sh
psql -U <POSTGRES_USER> -d <POSTGRES_DB> -c "ALTER USER <user-to-change> WITH PASSWORD '<new-password>';"
```
