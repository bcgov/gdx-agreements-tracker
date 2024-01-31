# Database Backup Restore

1. **Login to Openshift:**
   - Go to [OpenShift](https://console.apps.silver.devops.gov.bc.ca/).
   - Log in to your Openshift environment.
   - Navigate to the project where you are wanting to perform the restore

2. **Select the Backup Deployment:**
   - Navigate to either "Deployment Configs" > "pmo-backup" or "Deployments" > "pmo-backup."

3. **Start the Backup Pod:**
   - If the "pmo-backup" pod is not running, start it.

4. **Access Backup Pod:**
   - Go to "Pods" > "pmo-backup-{temp-name}."

5. **Open Pod Terminal:**
   - Access the terminal for the selected pod.

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

8. **Delete Backup Pod:**
   - Once the restoration is complete, delete the backup pod.
