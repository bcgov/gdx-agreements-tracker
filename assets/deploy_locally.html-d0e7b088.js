import{_ as t,r as l,o as i,c as r,b as e,d as n,e as o,a as s}from"./app-96a9ce47.js";const p={},c=s('<h1 id="deploying-using-node-and-docker" tabindex="-1"><a class="header-anchor" href="#deploying-using-node-and-docker" aria-hidden="true">#</a> Deploying Using Node and Docker</h1><h2 id="prerequisite" tabindex="-1"><a class="header-anchor" href="#prerequisite" aria-hidden="true">#</a> Prerequisite</h2><p>All development setup is done with a Mac OS</p><ul><li>Requirements: <ul><li>Node (V18)</li><li>Docker (Desktop, Ranger, Colima)</li><li>PGAdmin (not required but helpful)</li></ul></li></ul><p>Install brew if not already installed.</p><ul><li>Install mkcert tool for creating certificates <code>brew install mkcert</code></li><li>Only if using <strong>Firefox</strong>, Install nss<code>brew install nss</code></li><li>Create a self signed Certificate Authority <code>mkcert -install</code></li></ul><h2 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> Setup</h2><h3 id="download-source-code" tabindex="-1"><a class="header-anchor" href="#download-source-code" aria-hidden="true">#</a> Download Source Code</h3><p><code>git clone https://github.com/bcgov/gdx-agreements-tracker.git</code></p><h3 id="setup-certificates" tabindex="-1"><a class="header-anchor" href="#setup-certificates" aria-hidden="true">#</a> Setup Certificates</h3><p><strong>All bash commands are assumed from root of repository</strong> <code>./gdx-agreements-tracker</code> A self signed certificate is required for local development deployments.</p><ul><li>in a terminal window go to the GDX agreements tracker repository <code>cd gdx-agreements-tracker</code></li><li>create a <code>.cert</code> directory in the frontend folder if not already created <code>mkdir -p ./frontend/.cert</code><ul><li>This is where your certificates will be saved.</li><li>This folder is also excluded from the repository via the .gitignore file.</li></ul></li><li>create a key and cert file <code>mkcert -key-file ./frontend/.cert/key.pem -cert-file ./frontend/.cert/cert.pem &quot;localhost&quot;</code></li></ul><h2 id="setup-and-deploy-database" tabindex="-1"><a class="header-anchor" href="#setup-and-deploy-database" aria-hidden="true">#</a> Setup and Deploy Database</h2><p>The database is a postgres database, which needs to be deployed via docker compose.</p>',14),d=e("code",null,"./backend/.env",-1),u={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/backend/sample.env",target:"_blank",rel:"noopener noreferrer"},v=e("li",null,"Update/add all database [environment variables]",-1),m=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#/backend/.env</span>
<span class="token punctuation">..</span>.
<span class="token assign-left variable">POSTGRES_PORT</span><span class="token operator">=</span><span class="token number">15432</span>
<span class="token assign-left variable">POSTGRES_HOST</span><span class="token operator">=</span>localhost
<span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>postgres
<span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>postgres
<span class="token assign-left variable">POSTGRES_DATABASE</span><span class="token operator">=</span>gat_db
<span class="token assign-left variable">DATABASE_AUTO_DEPLOY</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Start the database by running the docker compose command <code>cd ./backend &amp;&amp; docker compose up --build</code><ul><li>if this fails you can manually build the image <code>docker build -t backend-db ./openshift/templates/images/postgres/</code> and then run <code>cd ./backend &amp;&amp; docker compose up</code></li></ul></li></ul><h2 id="backend-setup-and-deploy" tabindex="-1"><a class="header-anchor" href="#backend-setup-and-deploy" aria-hidden="true">#</a> Backend Setup and Deploy</h2><ul><li>Create/update an .env for the backend</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Json web token uri</span>
<span class="token assign-left variable">JWKSURI</span><span class="token operator">=</span>https://example.com/auth/realms/aaoozhcp/protocol/openid-connect/certs
<span class="token comment"># Node env</span>
<span class="token assign-left variable">NODE_ENV</span><span class="token operator">=</span>development
<span class="token comment"># Database</span>
<span class="token assign-left variable">POSTGRES_PORT</span><span class="token operator">=</span>
<span class="token assign-left variable">POSTGRES_HOST</span><span class="token operator">=</span>
<span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>
<span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>
<span class="token assign-left variable">POSTGRES_DATABASE</span><span class="token operator">=</span>
<span class="token assign-left variable">DATABASE_AUTO_DEPLOY</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token comment"># Common Component Token host/path used for CHES and CDOGS</span>
<span class="token assign-left variable">COMMON_COMPONENT_TOKEN_HOST</span><span class="token operator">=</span>
<span class="token assign-left variable">COMMON_COMPONENT_TOKEN_PATH</span><span class="token operator">=</span>
<span class="token comment"># Common Hosted Documentation Generation API</span>
<span class="token assign-left variable">CDOGS_CLIENT_ID</span><span class="token operator">=</span>
<span class="token assign-left variable">CDOGS_SECRET</span><span class="token operator">=</span>
<span class="token assign-left variable">COMMON_COMPONENT_CDOGS_API</span><span class="token operator">=</span>
<span class="token comment"># Common Hosted Email API</span>
<span class="token assign-left variable">CHES_CLIENT_ID</span><span class="token operator">=</span>
<span class="token assign-left variable">CHES_SECRET</span><span class="token operator">=</span>
<span class="token assign-left variable">COMMON_COMPONENT_CHES_API</span><span class="token operator">=</span>
<span class="token comment"># Single Sign on API</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_API_TOKEN_HOST</span><span class="token operator">=</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_API_TOKEN_PATH</span><span class="token operator">=</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_API_CLIENT_ID</span><span class="token operator">=</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_CLIENT_SECRET</span><span class="token operator">=</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_API</span><span class="token operator">=</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_INTEGRATION_ID</span><span class="token operator">=</span>
<span class="token assign-left variable">SINGLE_SIGN_ON_ENVIRONMENT</span><span class="token operator">=</span>
<span class="token comment"># Deprecated </span>
<span class="token assign-left variable">COMMON_COMPONENT_CLIENT_ID</span><span class="token operator">=</span>
<span class="token assign-left variable">COMMON_COMPONENT_SECRET</span><span class="token operator">=</span>
<span class="token assign-left variable">COMMON_COMPONENT_URL</span><span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>go to backend directory <code>cd ./backend</code></li><li>Ensure using the correct version of Node which is restricted by the <code>./backend/package.json</code> engines parameter</li><li>Using <code>NVM</code> switch versions for example <code>nvm use 18.18</code></li><li>Install dependencies <code>npm i</code></li><li>Run frontend app <code>npm run start</code></li></ul><h3 id="migrations-and-seeds" tabindex="-1"><a class="header-anchor" href="#migrations-and-seeds" aria-hidden="true">#</a> Migrations and Seeds</h3>`,7),k=e("code",null,"./backend/srcs/database/production_seeds",-1),b={href:"https://apps.itsm.gov.bc.ca/bitbucket/projects/DES/repos/pmo-mssql-converter/browse/README.md?useDefaultHandler=true#50",target:"_blank",rel:"noopener noreferrer"},h=s("<li>To migrate the database go to <code>./backend</code> folder and run <code>npx knex migrate:latest</code></li><li>To run the seeds go to the <code>./backend</code> folder and run <code>npx knex seed:run</code></li><li>To run a specific seed go to the <code>./backend</code> folder and run <code>npx knex seed:run --specific=the-name-of-the-seed</code></li>",3),g=s(`<h2 id="frontend-setup-and-deploy" tabindex="-1"><a class="header-anchor" href="#frontend-setup-and-deploy" aria-hidden="true">#</a> Frontend Setup and Deploy</h2><ul><li>Create/update an .env for frontend <ul><li>the <code>REACT_APP_KEYCLOAK_URL</code>, <code>REACT_APP_KEYCLOAK_CLIENT_ID</code>, <code>REACT_APP_KEYCLOAK_REALM</code> will have to be updated according to your keycloak server settings.</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#/frontend/.env</span>
<span class="token assign-left variable">WDS_SOCKET_PORT</span><span class="token operator">=</span><span class="token number">3000</span>
<span class="token assign-left variable">REACT_APP_API_URL</span><span class="token operator">=</span>https://localhost:8080
<span class="token assign-left variable">REACT_APP_KEYCLOAK_URL</span><span class="token operator">=</span><span class="token string">&quot;https://keyloak-login-server/auth&quot;</span>
<span class="token assign-left variable">REACT_APP_KEYCLOAK_CLIENT_ID</span><span class="token operator">=</span><span class="token string">&quot;keycloak-id&quot;</span>
<span class="token assign-left variable">REACT_APP_KEYCLOAK_REALM</span><span class="token operator">=</span>standard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Ensure using the correct version of Node which is restricted by the <code>./frontend/package.json</code></li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token comment">/*/frontend/package.json --- example node version*/</span>
  ...
  <span class="token property">&quot;engines&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;node&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&gt;=18.18.0&quot;</span>
  <span class="token punctuation">}</span>
  ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),_=e("li",null,[n("go to frontend directory "),e("code",null,"cd ./frontend")],-1),f=e("li",null,[n("Using "),e("code",null,"NVM"),n(" switch versions for example "),e("code",null,"nvm use 18.18")],-1),S=e("li",null,[n("Install dependencies "),e("code",null,"yarn i")],-1),E=e("li",null,[n("Run frontend app "),e("code",null,"npm run start")],-1),O={href:"https://localhost:3000",target:"_blank",rel:"noopener noreferrer"},N=s(`<h2 id="deployment-of-application-after-setup" tabindex="-1"><a class="header-anchor" href="#deployment-of-application-after-setup" aria-hidden="true">#</a> Deployment of Application After Setup</h2><ul><li>Deploy database <code>cd ./backend &amp;&amp; docker compose up</code></li><li>Deploy backend <code>cd ./backend &amp;&amp; npm run start</code></li><li>Deploy frontend <code>cd ./frontend &amp;&amp; npm run start</code></li></ul><h2 id="setting-up-pgadmin-to-access-postgres-database" tabindex="-1"><a class="header-anchor" href="#setting-up-pgadmin-to-access-postgres-database" aria-hidden="true">#</a> Setting up PGAdmin to Access Postgres Database</h2><p>Import the following into PGAdmin</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;Servers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;1&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;Name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;GDX Agreements Tracker&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Group&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Servers&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Port&quot;</span><span class="token operator">:</span> <span class="token number">15432</span><span class="token punctuation">,</span>
            <span class="token property">&quot;MaintenanceDB&quot;</span><span class="token operator">:</span> <span class="token string">&quot;postgres&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Username&quot;</span><span class="token operator">:</span> <span class="token string">&quot;postgres&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;SSLMode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prefer&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;SSLCompression&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;Timeout&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token property">&quot;UseSSHTunnel&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token property">&quot;TunnelPort&quot;</span><span class="token operator">:</span> <span class="token string">&quot;22&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;TunnelAuthentication&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deleting-gdx-agreements-database" tabindex="-1"><a class="header-anchor" href="#deleting-gdx-agreements-database" aria-hidden="true">#</a> Deleting GDX Agreements Database</h2><ul><li>If the database container is not running, go to the <code>./backend</code> folder and run <code>docker-compose up db</code></li><li>In pgAdmin, right click the pmo database and drop/delete it.</li><li>In pgAdmin, right click your pmo server and create a new database with the same name as the old pmo database.</li></ul>`,7);function T(A,y){const a=l("ExternalLinkIcon");return i(),r("div",null,[c,e("ul",null,[e("li",null,[n("Add a "),d,n(" by either creating a new file or using "),e("a",u,[n("sample.env"),o(a)]),n(" as the template")]),v]),m,e("ul",null,[e("li",null,[n("In order to fully seed the database with production data, the "),k,n(" folder needs to contain the *.dat production seeds. "),e("ul",null,[e("li",null,[n("See the "),e("a",b,[n("readme"),o(a)]),n(" for instructions.")])])]),h]),g,e("ul",null,[_,f,S,E,e("li",null,[n("Your browser should open up at "),e("a",O,[n("localhost:3000"),o(a)])])]),N])}const C=t(p,[["render",T],["__file","deploy_locally.html.vue"]]);export{C as default};