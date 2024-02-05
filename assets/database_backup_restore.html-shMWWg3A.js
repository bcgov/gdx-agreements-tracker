import{_ as p,r as l,o,c,b as n,d as s,e,a as t}from"./app-5YDIVGs8.js";const i={},u=n("h1",{id:"database-backup-restore",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#database-backup-restore"},[n("span",null,"Database Backup Restore")])],-1),r=n("h2",{id:"database-backups",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#database-backups"},[n("span",null,"Database Backups")])],-1),k={href:"https://developer.gov.bc.ca/Backup-Container",target:"_blank",rel:"noopener noreferrer"},d=t(`<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment"># this is used to create a cronjob that will run a backup of the database</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CronJob
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>cron
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">openshift.io/display-name</span><span class="token punctuation">:</span> Cron job templates for backups.
    <span class="token key atrule">description</span><span class="token punctuation">:</span> CronJob to backup gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker database<span class="token punctuation">,</span> https<span class="token punctuation">:</span>//developer.gov.bc.ca/Backup<span class="token punctuation">-</span>Container.
    <span class="token key atrule">tags</span><span class="token punctuation">:</span> backups<span class="token punctuation">,</span>pmo<span class="token punctuation">,</span>postgres<span class="token punctuation">,</span>gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token string">&quot;postgres-cron-cronjob&quot;</span>
    <span class="token key atrule">cronjob</span><span class="token punctuation">:</span> <span class="token string">&quot;postgres-cron-backup&quot;</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">&quot;0 9 * * *&quot;</span> <span class="token comment"># 1 am PST / 0900 UTC</span>
  <span class="token key atrule">concurrencyPolicy</span><span class="token punctuation">:</span> Forbid
  <span class="token key atrule">successfulJobHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">failedJobHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">jobTemplate</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token string">&quot;postgres-cron-cronjob&quot;</span>
      <span class="token key atrule">cronjob</span><span class="token punctuation">:</span> <span class="token string">&quot;postgres-cron-backup&quot;</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">backoffLimit</span><span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token key atrule">template</span><span class="token punctuation">:</span>
        <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
          <span class="token key atrule">labels</span><span class="token punctuation">:</span>
            <span class="token key atrule">template</span><span class="token punctuation">:</span> <span class="token string">&quot;postgres-cron-cronjob&quot;</span>
            <span class="token key atrule">cronjob</span><span class="token punctuation">:</span> <span class="token string">&quot;postgres-cron-backup&quot;</span>
        <span class="token key atrule">spec</span><span class="token punctuation">:</span>
          <span class="token key atrule">containers</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres<span class="token punctuation">-</span>backup<span class="token punctuation">-</span>runner
              <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;bcgovgdx/gdx-agreements-tracker-backup-container&quot;</span>
              <span class="token key atrule">command</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token string">&quot;/bin/bash&quot;</span>
                <span class="token punctuation">-</span> <span class="token string">&quot;-c&quot;</span>
                <span class="token punctuation">-</span> <span class="token string">&quot;/backup.sh -1&quot;</span>
              <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>db
                  <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /backups/
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>verification
                  <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/pgsql/data
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>config
                  <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /backup.conf
                  <span class="token key atrule">subPath</span><span class="token punctuation">:</span> backup.conf
              <span class="token key atrule">env</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> BACKUP_STRATEGY
                  <span class="token key atrule">value</span><span class="token punctuation">:</span> rolling
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> BACKUP_DIR
                  <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
                    <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>config
                      <span class="token key atrule">key</span><span class="token punctuation">:</span> BACKUP_DIR
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MONTHLY_BACKUPS
                  <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DATABASE_USER
                  <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
                    <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span> config
                      <span class="token key atrule">key</span><span class="token punctuation">:</span> POSTGRES_USER
                <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DATABASE_PASSWORD
                  <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
                    <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
                      <span class="token key atrule">name</span><span class="token punctuation">:</span> secrets
                      <span class="token key atrule">key</span><span class="token punctuation">:</span> POSTGRES_PASSWORD
          <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>db
              <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
                <span class="token key atrule">claimName</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>db
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>verification
              <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
                <span class="token key atrule">claimName</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>verification
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>config
              <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> backup<span class="token punctuation">-</span>config
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> backup.conf
                    <span class="token key atrule">path</span><span class="token punctuation">:</span> backup.conf
                    <span class="token comment"># make sure all these configKeyRefs are correct</span>
          <span class="token key atrule">dnsPolicy</span><span class="token punctuation">:</span> <span class="token string">&quot;ClusterFirst&quot;</span>
          <span class="token key atrule">successfulJobHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">failedJobHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">2</span>
          <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> <span class="token string">&quot;Never&quot;</span>
          <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
          <span class="token key atrule">activeDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">1600</span>
          <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> <span class="token string">&quot;default&quot;</span>
          <span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> <span class="token string">&quot;default&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="database-restore" tabindex="-1"><a class="header-anchor" href="#database-restore"><span>Database Restore</span></a></h2>`,2),v=n("p",null,[n("strong",null,"Login to Openshift:")],-1),m={href:"https://console.apps.silver.devops.gov.bc.ca/",target:"_blank",rel:"noopener noreferrer"},b=n("li",null,"Log in to your Openshift environment.",-1),y=n("li",null,"Navigate to the project where you are wanting to perform the restore",-1),g=t(`<li><p><strong>Select the Backup Deployment:</strong></p><ul><li>Navigate to either &quot;Deployments&quot; &gt; &quot;pmo-backup-restore&quot;</li></ul></li><li><p><strong>Start the Backup Pod:</strong></p><ul><li>If the &quot;pmo-backup-restore&quot; pod is not running, start it, but increasing the pod deployments from 0 to 1</li></ul></li><li><p><strong>Access Backup Pod:</strong></p><ul><li>Go to &quot;Pods&quot; &gt; &quot;pmo-backup-restore-{temp-name}.&quot;</li></ul></li><li><p><strong>Open Pod Terminal:</strong></p><ul><li>Access the terminal for the selected pod.</li><li>To get the a list of all the backups run the following command:<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./backup.sh <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>Run Command for Latest Backup:</strong></p><ul><li>For the latest backup, run the following command:<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./backup.sh <span class="token parameter variable">-r</span> pmo-postgres-service:5432/pmodb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>Run Command for Specific Backup:</strong></p><ul><li>For a specific backup, use the following command as an example:<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./backup.sh <span class="token parameter variable">-r</span> pmo-postgres-service:5432/pmodb <span class="token parameter variable">-f</span> /backups/weekly/2023-12-10/pmo-postgres-service-pmodb_2023-12-10_01-00-22.sql.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>Reset the Deployments down to 0 Pods:</strong></p><ul><li>Once the restoration is complete go to the pmo-backup-restore deployment and reset to 0 Pod.</li></ul></li>`,7);function h(f,_){const a=l("ExternalLinkIcon");return o(),c("div",null,[u,r,n("ul",null,[n("li",null,[s("The database backups are performed by a cronjob which uses the "),n("a",k,[s("bcgov backup-container"),e(a)])])]),d,n("ol",null,[n("li",null,[v,n("ul",null,[n("li",null,[s("Go to "),n("a",m,[s("OpenShift"),e(a)]),s(".")]),b,y])]),g])])}const S=p(i,[["render",h],["__file","database_backup_restore.html.vue"]]),P=JSON.parse('{"path":"/guide/openshift/database_backup_restore.html","title":"Database Backup Restore","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Database Backups","slug":"database-backups","link":"#database-backups","children":[]},{"level":2,"title":"Database Restore","slug":"database-restore","link":"#database-restore","children":[]}],"git":{"contributors":[{"name":"Shawn","email":"45861534+ShawnTurple@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/openshift/database_backup_restore.md"}');export{S as comp,P as data};
