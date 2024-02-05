import{_ as i,r as t,o,c as l,b as e,d as a,e as s,a as r}from"./app-4351dcd4.js";const d={},c=e("h1",{id:"container-images",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#container-images","aria-hidden":"true"},"#"),a(" Container Images")],-1),p=e("h2",{id:"base-images-on-openshift",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#base-images-on-openshift","aria-hidden":"true"},"#"),a(" Base Images on OpenShift")],-1),u={class:"custom-container tip"},m=e("p",{class:"custom-container-title"},"TIP",-1),h=e("p",null,"Updating base images on OpenShift is only done at the specific Build config;",-1),g={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/deployments/kustomize/image-builds/nodejs-s2i.yaml#L29",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/deployments/kustomize/image-builds/nginx.yaml#L27",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/deployments/kustomize/image-builds/postgres.yaml#L31",target:"_blank",rel:"noopener noreferrer"},k=r(`<h3 id="updating-openshift-build-configs" tabindex="-1"><a class="header-anchor" href="#updating-openshift-build-configs" aria-hidden="true">#</a> Updating OpenShift Build Configs</h3><p>After the images have been updated into the Build Configs for Node, Nginx and Postgres, update the build configs by running the following commands.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Step 1 - Go to Directory of Repo</span>
<span class="token builtin class-name">cd</span> gdx-agreements-tracker
<span class="token comment"># Step 2 - Login to OpenShift oc command line</span>
oc login <span class="token parameter variable">--token</span><span class="token operator">=</span>secret-token <span class="token parameter variable">--server</span><span class="token operator">=</span>https://myopnshift.com
<span class="token comment"># Step 3 - Choose the tools folder</span>
oc project <span class="token number">12345</span>-tools
<span class="token comment"># step 4 - Apply kustomize file</span>
oc apply <span class="token parameter variable">-k</span> deployments/kustomize/image-builds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>Don&#39;t forget this step, otherwise base images will never get updated.</p></div><h3 id="s2i-node-base-image" tabindex="-1"><a class="header-anchor" href="#s2i-node-base-image" aria-hidden="true">#</a> S2I Node Base Image</h3><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code>        <span class="token key atrule">name</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>18.18<span class="token punctuation">-</span>alpine3.18
</code></pre></div><h3 id="s2i-nginx-base-image" tabindex="-1"><a class="header-anchor" href="#s2i-nginx-base-image" aria-hidden="true">#</a> S2I Nginx Base Image</h3><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code>        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.25.3
</code></pre></div><h3 id="postgres-base-image" tabindex="-1"><a class="header-anchor" href="#postgres-base-image" aria-hidden="true">#</a> Postgres Base Image</h3><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code>        <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span>15.5<span class="token punctuation">-</span>bullseye
</code></pre></div><h2 id="building-images-locally-using-docker" tabindex="-1"><a class="header-anchor" href="#building-images-locally-using-docker" aria-hidden="true">#</a> Building Images Locally using Docker</h2><p>Local development only uses docker for the database, and the app, and api use node on the local machine. The images builds for the app, and api utilizes the OpenShift s2i, therefor these image builds might only be useful for troubleshooting.</p><h3 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs" aria-hidden="true">#</a> NodeJs</h3><p>Is used for building both the api and frontend application.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Build</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> node-s2i <span class="token punctuation">\\</span>
<span class="token parameter variable">-f</span> openshift/templates/images/nodejs/Dockerfile <span class="token punctuation">\\</span>
./openshift/templates/images/nodejs/
<span class="token comment"># Verify</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> node-s2i /usr/local/s2i/usage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h3><p>Is required for building application, creates Nginx server.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Build</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> nginx-s2i <span class="token punctuation">\\</span>
<span class="token parameter variable">-f</span> openshift/templates/images/nginx/docker/Dockerfile <span class="token punctuation">\\</span>
./openshift/templates/images/nginx/docker/
<span class="token comment"># Verify</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> nginx-s2i <span class="token function">cat</span> /etc/nginx/conf.d/default.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="postgres" tabindex="-1"><a class="header-anchor" href="#postgres" aria-hidden="true">#</a> Postgres</h3><p>The PostgreSQL database image</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Build</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> postgres-run <span class="token punctuation">\\</span>
<span class="token parameter variable">-f</span> openshift/templates/images/postgres/Dockerfile <span class="token punctuation">\\</span>
./openshift/templates/images/postgres/
<span class="token comment"># Verify</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> postgres-run <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="application" tabindex="-1"><a class="header-anchor" href="#application" aria-hidden="true">#</a> Application</h3><p>The frontend application, however the build is failing on docker, but works with OpenShift</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Build</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> app-run <span class="token punctuation">\\</span>
<span class="token parameter variable">-f</span> ./frontend/Dockerfile <span class="token punctuation">\\</span>
./frontend/
<span class="token comment"># Verify</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> app-run <span class="token parameter variable">-p</span> <span class="token number">308080</span>:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># TBD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,26);function f(x,_){const n=t("ExternalLinkIcon");return o(),l("div",null,[c,p,e("div",u,[m,h,e("ul",null,[e("li",null,[e("a",g,[a("s2i Node"),s(n)])]),e("li",null,[e("a",b,[a("s2i Nginx"),s(n)])]),e("li",null,[e("a",v,[a("Postgres"),s(n)])])])]),k])}const B=i(d,[["render",f],["__file","building_images.html.vue"]]);export{B as default};