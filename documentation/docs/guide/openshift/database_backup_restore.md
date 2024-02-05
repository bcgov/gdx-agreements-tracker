# Database Backup Restore

## Database Backups
- The database backups are performed by a cronjob which uses the [bcgov backup-container](https://developer.gov.bc.ca/Backup-Container)
@[code](../../../../deployments/kustomize/backups/backup-db-cron.yaml)

## Database Restore

1. **Login to Openshift:**
   - Go to [OpenShift](https://console.apps.silver.devops.gov.bc.ca/).
   - Log in to your Openshift environment.
   - Navigate to the project where you are wanting to perform the restore

2. **Select the Backup Deployment:**
   - Navigate to either "Deployments" > "pmo-backup-restore"

3. **Start the Backup Pod:**
   - If the "pmo-backup-restore" pod is not running, start it, but increasing the pod deployments from 0 to 1

4. **Access Backup Pod:**
   - Go to "Pods" > "pmo-backup-restore-{temp-name}."

5. **Open Pod Terminal:**
   - Access the terminal for the selected pod.
   - To get the a list of all the backups run the following command:
     ```bash
     ./backup.sh -l
     ```

6. **Run Command for Latest Backup:**
   - For the latest backup, run the following command:
     ```bash
     ./backup.sh -r pmo-postgres-service:5432/pmodb
     ```

7. **Run Command for Specific Backup:**
   - For a specific backup, use the following command as an example:
     ```bash
     ./backup.sh -r pmo-postgres-service:5432/pmodb -f /backups/weekly/2023-12-10/pmo-postgres-service-pmodb_2023-12-10_01-00-22.sql.gz
     ```

8. **Reset the Deployments down to 0 Pods:**
   - Once the restoration is complete go to the pmo-backup-restore deployment and reset to 0 Pod.

