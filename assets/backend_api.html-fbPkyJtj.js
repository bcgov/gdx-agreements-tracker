import{_ as r,r as i,o as l,c as d,b as e,d as a,e as n,w as c,a as t}from"./app-5YDIVGs8.js";const p={},u=t(`<h1 id="gdx-agreements-tracker-api" tabindex="-1"><a class="header-anchor" href="#gdx-agreements-tracker-api"><span>GDX Agreements Tracker API</span></a></h1><h2 id="what-the-api-does" tabindex="-1"><a class="header-anchor" href="#what-the-api-does"><span>What the API does</span></a></h2><ul><li>handles all CRUD operations for the application</li><li>handles all authentication and authorization for the application</li><li>handles all routing for the application</li></ul><h2 id="testing-the-api" tabindex="-1"><a class="header-anchor" href="#testing-the-api"><span>Testing the API</span></a></h2><h3 id="to-run-tests" tabindex="-1"><a class="header-anchor" href="#to-run-tests"><span>To run tests:</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="to-write-tests" tabindex="-1"><a class="header-anchor" href="#to-write-tests"><span>To Write tests:</span></a></h3><p>Many of the codebase&#39;s functions are asynchronous. In order to test them, you&#39;ll need to pass an &quot;async&quot; function as the second argument to <code>it()</code>. Within that function, you&#39;ll need to &quot;await&quot; the function you&#39;re testing. For example:</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;tests an asynchronous function&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">functionToTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="to-debug-tests" tabindex="-1"><a class="header-anchor" href="#to-debug-tests"><span>To debug tests:</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> run test:debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="to-get-test-coverage" tabindex="-1"><a class="header-anchor" href="#to-get-test-coverage"><span>To get test coverage:</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> run test:coverage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),h=e("p",null,"References:",-1),m={href:"https://jestjs.io/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.fastify.io/docs/latest/Guides/Testing/#benefits-of-using-fastifyinject",target:"_blank",rel:"noopener noreferrer"},b=t('<h2 id="database" tabindex="-1"><a class="header-anchor" href="#database"><span>Database</span></a></h2><h3 id="connecting" tabindex="-1"><a class="header-anchor" href="#connecting"><span>Connecting</span></a></h3><h4 id="to-connect-to-a-database-gui-tool-during-development-use-the-following-parameters" tabindex="-1"><a class="header-anchor" href="#to-connect-to-a-database-gui-tool-during-development-use-the-following-parameters"><span>To connect to a database GUI tool during development, use the following parameters:</span></a></h4><ul><li>Server host: <code>localhost</code></li><li>Server port: <code>15432</code></li><li>Username: <code>postgres</code></li><li>Password: <code>postgres</code></li></ul>',4),f={href:"/docker-compose.yml",target:"_blank",rel:"noopener noreferrer"},v={href:"/backend/knexfile.js",target:"_blank",rel:"noopener noreferrer"},k=t(`<h3 id="migrations" tabindex="-1"><a class="header-anchor" href="#migrations"><span>Migrations</span></a></h3><h4 id="create-a-new-migration" tabindex="-1"><a class="header-anchor" href="#create-a-new-migration"><span>Create a new migration:</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> backend npx knex migrate:make <span class="token operator">&lt;</span>name_of_migration<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="migrate-new-schema-into-the-database" tabindex="-1"><a class="header-anchor" href="#migrate-new-schema-into-the-database"><span>Migrate new Schema into the Database:</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> backend npx knex migrate:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="reverse-a-migration" tabindex="-1"><a class="header-anchor" href="#reverse-a-migration"><span>Reverse a migration:</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token builtin class-name">exec</span> backend npx knex migrate:rollback
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="seeds" tabindex="-1"><a class="header-anchor" href="#seeds"><span>Seeds</span></a></h3><h4 id="create-new-seeds" tabindex="-1"><a class="header-anchor" href="#create-new-seeds"><span>Create new Seeds:</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>npx knex seed:make <span class="token operator">&lt;</span>name_of_seed<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="execute-all-seeds" tabindex="-1"><a class="header-anchor" href="#execute-all-seeds"><span>Execute all seeds</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>npx knex seed:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><h4 id="database-migrations-that-target-tables-inside-the-data-schema-may-fail-under-some-conditions" tabindex="-1"><a class="header-anchor" href="#database-migrations-that-target-tables-inside-the-data-schema-may-fail-under-some-conditions"><span>Database migrations that target tables inside the <code>data</code> Schema may fail under some conditions:</span></a></h4><ul><li>if they require table structures to already exist before they can be run</li><li>example: <code>Schema.data.projects</code> migrations are run before the <code>data.projects</code> table has been created</li></ul><h4 id="we-need-to-guarantee-that-migrations-on-the-schemas-data-schema-run-in-this-order" tabindex="-1"><a class="header-anchor" href="#we-need-to-guarantee-that-migrations-on-the-schemas-data-schema-run-in-this-order"><span>We need to guarantee that migrations on the <code>Schemas.data</code> schema run in this order:</span></a></h4><ol><li>Migration of new Schema into database</li><li>Migrations of new tables into the existing Schema</li><li>Seeding those tables with data</li></ol></blockquote><h1 id="environment-variables-for-the-backend-api" tabindex="-1"><a class="header-anchor" href="#environment-variables-for-the-backend-api"><span>Environment Variables for the backend API</span></a></h1>`,14),x=e("li",null,"The .env file is not committed to the repo.",-1),y={href:"/backend/sample.env",target:"_blank",rel:"noopener noreferrer"},_={href:"/backend/.env",target:"_blank",rel:"noopener noreferrer"},w={href:"https://console.apps.silver.devops.gov.bc.ca/k8s/ns/acd38d-dev/configmaps/0-gdx-agreements-tracker-api-env-config/yaml",target:"_blank",rel:"noopener noreferrer"},R={href:"https://mykeycloak.com/realms/my-realm/protocol/openid-connect/certs",target:"_blank",rel:"noopener noreferrer"},T=e("h2",{id:"create-a-new-api-endpoints-for-existing-database-tables",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#create-a-new-api-endpoints-for-existing-database-tables"},[e("span",null,"Create a New API Endpoints for existing Database Tables")])],-1),P={id:"run-this-script-in-the-backend-directory",tabindex:"-1"},q={class:"header-anchor",href:"#run-this-script-in-the-backend-directory"},A={href:"/backend",target:"_blank",rel:"noopener noreferrer"},S=t(`<div class="language-script line-numbers-mode" data-ext="script" data-title="script"><pre class="language-script"><code>npm run createAPI
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>The cli will prompt you for the {API Name}</li><li>The cli generates the bare minimum files needed to create a new API endpoint:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>backend/src/controllers/<span class="token punctuation">{</span>API Name<span class="token punctuation">}</span>
backend/src/models/<span class="token punctuation">{</span>API Name<span class="token punctuation">}</span>
backend/src/routes/<span class="token punctuation">{</span>API Name<span class="token punctuation">}</span>
backend/src/validators/<span class="token punctuation">{</span>API Name<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),I={href:"http://localhost:8080/APIName",target:"_blank",rel:"noopener noreferrer"},C=e("blockquote",null,[e("p",null,[a("Note: if you run "),e("code",null,"createAPI"),a(" inside a remote docker container, your API URL may be different.")])],-1),M=t(`<h1 id="using-of-cdogs-and-ches-apis-inside-the-gdx-agreements-tracker-api" tabindex="-1"><a class="header-anchor" href="#using-of-cdogs-and-ches-apis-inside-the-gdx-agreements-tracker-api"><span>Using of CDOGS and CHES APIs <em>inside</em> the GDX Agreements Tracker API:</span></a></h1><h4 id="the-gdx-agreements-tracker-api-uses-the-common-components-with-this-syntax" tabindex="-1"><a class="header-anchor" href="#the-gdx-agreements-tracker-api-uses-the-common-components-with-this-syntax"><span>The GDX Agreements Tracker API uses the Common Components with this syntax:</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>  const cdogs <span class="token operator">=</span> useCommonComponents<span class="token punctuation">(</span><span class="token string">&quot;{cdogs|ches}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  const result <span class="token operator">=</span> cdogs.api.get<span class="token punctuation">(</span><span class="token string">&#39;/{uri}&#39;</span>, <span class="token assign-left variable">config</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  const result <span class="token operator">=</span> cdogs.api.post<span class="token punctuation">(</span><span class="token string">&#39;/{uri}&#39;</span>, <span class="token assign-left variable">body</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span>, <span class="token assign-left variable">config</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="how-routes-use-roles-to-control-user-edit-read-capabilities" tabindex="-1"><a class="header-anchor" href="#how-routes-use-roles-to-control-user-edit-read-capabilities"><span>How Routes use Roles to control user Edit/Read Capabilities:</span></a></h1><h3 id="the-globally-default-role-for-all-routes-is-pmo-manager-edit-capability" tabindex="-1"><a class="header-anchor" href="#the-globally-default-role-for-all-routes-is-pmo-manager-edit-capability"><span>The globally default Role for all Routes is <code>PMO-Manager-Edit-Capability</code>:</span></a></h3><blockquote><p>see <em>verifyRole()</em> in <a href="./src/facilities/fastify.js">./src/facilities/fastify.js</a></p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript" data-title="JavaScript"><pre class="language-JavaScript"><code>  // This sets the DEFAULT Role for ALL Routes globally
  const routeRoleRequired = request.routeConfig?.role ?? &quot;PMO-Manager-Edit-Capability&quot;;

   if (!roles.includes(routeRoleRequired)) {
    const message = \`User doesn&#39;t have required role \${routeRoleRequired}\`;
    request.log.warn(message);
    request.log.debug(roles);
    reply.code(401).send({ message });
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set-a-different-role-for-a-route" tabindex="-1"><a class="header-anchor" href="#set-a-different-role-for-a-route"><span>Set a different Role for a Route</span></a></h3><h3 id="how-to-set-a-different-role-for-a-route" tabindex="-1"><a class="header-anchor" href="#how-to-set-a-different-role-for-a-route"><span>How to set a different Role for a Route:</span></a></h3><p>Set config.role in the <code>fastify.route({ config.role })</code></p><blockquote><p>see example route at <a href="./src/routes/reports/genericRoute.js">./src/routes/reports/genericRoute.js</a></p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript" data-title="JavaScript"><pre class="language-JavaScript"><code>    fastify.route({
      method: &quot;GET&quot;,
      url: \`/report/:type\`,
      schema: getReport,
      preHandler: controller.reportHandler,
      handler: controller.getReport,
      config: {
        role: &quot;PMO-Reports-Capability&quot;,
      },
    });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="the-following-roles-are-available-for-use-in-routes" tabindex="-1"><a class="header-anchor" href="#the-following-roles-are-available-for-use-in-routes"><span>The following Roles are available for use in Routes:</span></a></h4><h6 id="composite-roles-each-composite-role-contains-one-or-more-individual-roles" tabindex="-1"><a class="header-anchor" href="#composite-roles-each-composite-role-contains-one-or-more-individual-roles"><span>Composite roles - each composite role contains one or more individual Roles</span></a></h6><ul><li>PMO-Admin-Role</li><li>PMO-Manager-Role</li><li>PMO-User-Role</li><li>pmo-sys-admin (<em>deprecated - do not use</em>)</li></ul><h6 id="individual-roles-they-determine-what-a-user-can-do" tabindex="-1"><a class="header-anchor" href="#individual-roles-they-determine-what-a-user-can-do"><span>Individual Roles: they determine what a user can do:</span></a></h6><ul><li>PMO-Admin-Edit-Capability</li><li>PMO-Manager-Edit-Capability</li><li>PMO-Manager-Read-Capability</li><li>PMO-Reports-Capability</li></ul><hr><h3 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h3><ul><li>coming soon!</li></ul><h3 id="folder-structure" tabindex="-1"><a class="header-anchor" href="#folder-structure"><span>Folder structure</span></a></h3><ul><li>coming soon!</li></ul>`,22);function E(N,O){const s=i("ExternalLinkIcon"),o=i("RouteLink");return l(),d("div",null,[u,e("blockquote",null,[h,e("ul",null,[e("li",null,[a("Test Runner: "),e("a",m,[a("Jest"),n(s)])]),e("li",null,[a("Test Utilities: "),e("a",g,[a("light-my-request"),n(s)])])])]),b,e("blockquote",null,[e("p",null,[a("If using the "),e("a",f,[a("docker-compose.yml"),n(s)]),a(" file to develop locally, you'll need to populate your database once the containers are up and running. Make sure to run these migrate and seed commands from within the "),n(o,{to:"/guide/Backend/"},{default:c(()=>[a("/backend")]),_:1}),a(" directory so that the knex command can find "),e("a",v,[a("/backend/knexfile.js"),n(s)]),a(".")])]),k,e("ul",null,[x,e("li",null,[a("There is an up to date sample.env file here: "),e("a",y,[a("/backend/sample.env"),n(s)])]),e("li",null,[a("you will need to create your own .env file in the backend directory: ("),e("a",_,[a("/backend/.env"),n(s)]),a(")")]),e("li",null,[a("For the values you will need, look here: "),e("a",w,[a("OpenShift config maps for acd38d-dev"),n(s)]),e("blockquote",null,[e("p",null,[a("note: The JSON Web Key Set (keycloak ) endpoint is: "),e("a",R,[a("https://mykeycloak.com/realms/my-realm/protocol/openid-connect/certs"),n(s)])])])])]),T,e("h3",P,[e("a",q,[e("span",null,[a("Run this script in the "),e("a",A,[a("/backend"),n(s)]),a(" directory:")])])]),S,e("ul",null,[e("li",null,[a("Once these files are created, you should have a (locally) working API at: "),e("a",I,[a("http://localhost:8080/{API NAME}"),n(s)]),C])]),M])}const D=r(p,[["render",E],["__file","backend_api.html.vue"]]),J=JSON.parse('{"path":"/guide/Backend/backend_api.html","title":"GDX Agreements Tracker API","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"What the API does","slug":"what-the-api-does","link":"#what-the-api-does","children":[]},{"level":2,"title":"Testing the API","slug":"testing-the-api","link":"#testing-the-api","children":[{"level":3,"title":"To run tests:","slug":"to-run-tests","link":"#to-run-tests","children":[]},{"level":3,"title":"To Write tests:","slug":"to-write-tests","link":"#to-write-tests","children":[]},{"level":3,"title":"To debug tests:","slug":"to-debug-tests","link":"#to-debug-tests","children":[]},{"level":3,"title":"To get test coverage:","slug":"to-get-test-coverage","link":"#to-get-test-coverage","children":[]}]},{"level":2,"title":"Database","slug":"database","link":"#database","children":[{"level":3,"title":"Connecting","slug":"connecting","link":"#connecting","children":[]},{"level":3,"title":"Migrations","slug":"migrations","link":"#migrations","children":[]},{"level":3,"title":"Seeds","slug":"seeds","link":"#seeds","children":[]}]},{"level":2,"title":"Create a New API Endpoints for existing Database Tables","slug":"create-a-new-api-endpoints-for-existing-database-tables","link":"#create-a-new-api-endpoints-for-existing-database-tables","children":[{"level":3,"title":"Run this script in the /backend directory:","slug":"run-this-script-in-the-backend-directory","link":"#run-this-script-in-the-backend-directory","children":[]},{"level":3,"title":"The globally default Role for all Routes is PMO-Manager-Edit-Capability:","slug":"the-globally-default-role-for-all-routes-is-pmo-manager-edit-capability","link":"#the-globally-default-role-for-all-routes-is-pmo-manager-edit-capability","children":[]},{"level":3,"title":"Set a different Role for a Route","slug":"set-a-different-role-for-a-route","link":"#set-a-different-role-for-a-route","children":[]},{"level":3,"title":"How to set a different Role for a Route:","slug":"how-to-set-a-different-role-for-a-route","link":"#how-to-set-a-different-role-for-a-route","children":[]},{"level":3,"title":"Troubleshooting","slug":"troubleshooting","link":"#troubleshooting","children":[]},{"level":3,"title":"Folder structure","slug":"folder-structure","link":"#folder-structure","children":[]}]}],"git":{"contributors":[{"name":"Shawn","email":"45861534+ShawnTurple@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/Backend/backend_api.md"}');export{D as comp,J as data};
