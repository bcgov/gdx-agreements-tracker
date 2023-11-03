# OpenShift temporary documentation

## OpenShift environment
**Note:** All OpenShift steps will have to be reproduced on ***every*** namespace that needs to be updated.
### 1. Stop the app and api containers
1. Set the gdx-agreements-tracker-api deployment pod count to 0.
2. Set the gdx-agreements-tracker-app deployment pod count to 0.
### 2. Reset the pmo database
1. From gdx-agreements-tracker-postgres pod terminal, run:
```postgres
psql -U <postgres_username>
DROP DATABASE <database_name>;
CREATE DATABASE <database_name>;
```

#### 4. Update the .dat files for migrations and seeds
1. Set the gdx-agreements-tracker-api deployment pod count to 1.
2. If the [oc client](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html) is not installed locally, install it:
```bash
brew install openshift-cli
```
3. From a terminal with the oc client installed, log in by copying the login command from silver cluster, eg:
```
oc login --token=<your_token_hash> --server=<server_address>
```
4. Copy the contents of the updated migrations and production seeds folders to the gdx-agreements-tracker-api pod:
```bash
oc cp <local_updated_migrations_folder>/. <namespace><pod_name>:<opt/api-root/src/database/migrations>

oc cp <local_updated_production_seeds_folder>/. <namespace><pod_name>:<opt/api-root/src/database/production_seeds>
```

#### 5. Run migrations and seeders
1. From the gdx-agreements-tracker-api pod terminal, run:
```bash
cd /opt/app-root
npx knex migrate:latest
npx knex seed:run
```
#### 6. Restart the app process
1. Set the gdx-agreements-tracker-app deployment pod count to 1.



### DEPLOYING DEV => TEST:  Tagging the APP, API, and POSTGRES DB

* login to oc on your local terminal, using the link to the login command by clicking your username in the upper-right of the openshift page
* or use the web-based terminal: click the  ' *>_* ' icon at the top-right of your openshift interface next to the help icon

enter the following:

```bash
 oc tag gdx-agreements-tracker-api-run:dev gdx-agreements-tracker-api-run:test
 oc tag gdx-agreements-tracker-app-run:dev gdx-agreements-tracker-app-run:test
 oc tag gdx-agreements-tracker-postgres-run:dev gdx-agreements-tracker-postgres-run:test
```

* you can observe progress back in the openshift window by clicking on the workflow for gdx-agreements-tracker-a**-run, and scrolling to the bottom.