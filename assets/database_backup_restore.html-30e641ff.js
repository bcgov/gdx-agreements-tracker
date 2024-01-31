import{_ as a,r as s,o as l,c as n,b as e,d as t,e as r,a as i}from"./app-cd22dd0b.js";const p={},c=e("h1",{id:"database-backup-restore",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#database-backup-restore","aria-hidden":"true"},"#"),t(" Database Backup Restore")],-1),u=e("p",null,[e("strong",null,"Login to Openshift:")],-1),d={href:"https://console.apps.silver.devops.gov.bc.ca/",target:"_blank",rel:"noopener noreferrer"},m=e("li",null,"Log in to your Openshift environment.",-1),h=e("li",null,"Navigate to the project where you are wanting to perform the restore",-1),g=i(`<li><p><strong>Select the Backup Deployment:</strong></p><ul><li>Navigate to either &quot;Deployment Configs&quot; &gt; &quot;pmo-backup&quot; or &quot;Deployments&quot; &gt; &quot;pmo-backup.&quot;</li></ul></li><li><p><strong>Start the Backup Pod:</strong></p><ul><li>If the &quot;pmo-backup&quot; pod is not running, start it.</li></ul></li><li><p><strong>Access Backup Pod:</strong></p><ul><li>Go to &quot;Pods&quot; &gt; &quot;pmo-backup-{temp-name}.&quot;</li></ul></li><li><p><strong>Open Pod Terminal:</strong></p><ul><li>Access the terminal for the selected pod.</li></ul></li><li><p><strong>Run Command for Latest Backup:</strong></p><ul><li>For the latest backup, run the following command:<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./backup.sh <span class="token parameter variable">-r</span> pmo-postgres-service:5432/pmodb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>Run Command for Specific Backup:</strong></p><ul><li>For a specific backup, use the following command as an example:<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./backup.sh <span class="token parameter variable">-r</span> pmo-postgres-service:5432/pmodb <span class="token parameter variable">-f</span> /backups/weekly/2023-12-10/pmo-postgres-service-pmodb_2023-12-10_01-00-22.sql.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p><strong>Delete Backup Pod:</strong></p><ul><li>Once the restoration is complete, delete the backup pod.</li></ul></li>`,7);function b(_,k){const o=s("ExternalLinkIcon");return l(),n("div",null,[c,e("ol",null,[e("li",null,[u,e("ul",null,[e("li",null,[t("Go to "),e("a",d,[t("OpenShift"),r(o)]),t(".")]),m,h])]),g])])}const f=a(p,[["render",b],["__file","database_backup_restore.html.vue"]]);export{f as default};
