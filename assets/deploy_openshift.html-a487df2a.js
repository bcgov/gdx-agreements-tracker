import{_ as t,r as p,o as i,c as l,b as s,d as n,e,a as o}from"./app-609e90c7.js";const c={},u=s("h1",{id:"deploying-to-openshift",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#deploying-to-openshift","aria-hidden":"true"},"#"),n(" Deploying to OpenShift")],-1),r={href:"https://kustomize.io/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://docs.openshift.com/container-platform/4.14/cli_reference/openshift_cli/getting-started-cli.html",target:"_blank",rel:"noopener noreferrer"},k=o(`<ul><li>Create a folder for your deployment for this example we use <code>deployment</code></li><li>Add a <code>kustomization.yaml</code> and a <code>patch.yaml</code> to your deployment</li><li>Copy the sample code into these files and add configuration and secretes</li><li><a href="#deploying-image-builds-to-openshift">Create images</a> for your deployment, which needs to be accessible by your deployment, and also match the architecture of kubernetes cluster (amd/arm)</li><li>Deploy to OpenShift using the <code>oc apply -k</code> command</li></ul><h2 id="deploying-gdx-agreements-tracker-to-openshift" tabindex="-1"><a class="header-anchor" href="#deploying-gdx-agreements-tracker-to-openshift" aria-hidden="true">#</a> Deploying Gdx Agreements tracker to OpenShift</h2><h3 id="kustomization-yaml" tabindex="-1"><a class="header-anchor" href="#kustomization-yaml" aria-hidden="true">#</a> kustomization.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#/deployment/kustomization.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization
<span class="token key atrule">bases</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> github.com/bcgov/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker/deployments/kustomize/overlays/openshift

<span class="token key atrule">namespace</span><span class="token punctuation">:</span> &lt;licenseplate<span class="token punctuation">&gt;</span>
<span class="token key atrule">commonLabels</span><span class="token punctuation">:</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span> test
<span class="token key atrule">images</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bcgovgdx/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker<span class="token punctuation">-</span>app<span class="token punctuation">-</span>run
    <span class="token key atrule">newName</span><span class="token punctuation">:</span> yourimage<span class="token punctuation">-</span>app<span class="token punctuation">-</span>run
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> latest
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bcgovgdx/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker<span class="token punctuation">-</span>api<span class="token punctuation">-</span>run
    <span class="token key atrule">newName</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>image<span class="token punctuation">-</span>api<span class="token punctuation">-</span>run
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> latest
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bcgovgdx/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker<span class="token punctuation">-</span>postgres<span class="token punctuation">-</span>run
    <span class="token key atrule">newName</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>image<span class="token punctuation">-</span>postgres<span class="token punctuation">-</span>run
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> latest
<span class="token key atrule">configMapGenerator</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
    <span class="token key atrule">behavior</span><span class="token punctuation">:</span> merge
    <span class="token key atrule">literals</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> POSTGRES_DB=
      <span class="token punctuation">-</span> POSTGRES_USER=
      <span class="token punctuation">-</span> POSTGRES_HOST=
      <span class="token punctuation">-</span> NODE_ENV=test
      <span class="token punctuation">-</span> JWKSURI=
      <span class="token punctuation">-</span> CDOGS_CLIENT_ID=
      <span class="token punctuation">-</span> CDOGS_SECRET=
      <span class="token punctuation">-</span> CHES_CLIENT_ID=
      <span class="token punctuation">-</span> CHES_SECRET=
      <span class="token punctuation">-</span> COMMON_COMPONENT_CDOGS_API=&#39;&#39;
      <span class="token punctuation">-</span> COMMON_COMPONENT_CHES_API=&#39;&#39;
      <span class="token punctuation">-</span> COMMON_COMPONENT_TOKEN_HOST=&#39;&#39;
      <span class="token punctuation">-</span> COMMON_COMPONENT_TOKEN_PATH=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API_TOKEN_HOST=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API_TOKEN_PATH=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API_CLIENT_ID=s
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_CLIENT_SECRET=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_INTEGRATION_ID=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_ENVIRONMENT=
<span class="token key atrule">secretGenerator</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> secrets
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
    <span class="token key atrule">behavior</span><span class="token punctuation">:</span> merge
    <span class="token key atrule">literals</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> POSTGRES_PASSWORD=
<span class="token key atrule">patchesStrategicMerge</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> patch.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="patch-yaml" tabindex="-1"><a class="header-anchor" href="#patch-yaml" aria-hidden="true">#</a> patch.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#/deployment/patch.yaml</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Route
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> route.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> api<span class="token punctuation">-</span>route
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">host</span><span class="token punctuation">:</span> my.application.com

<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Route
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> route.openshift.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> app<span class="token punctuation">-</span>route
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">haproxy.router.openshift.io/ip_whitelist</span><span class="token punctuation">:</span> <span class="token punctuation">&gt;</span><span class="token punctuation">-</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">host</span><span class="token punctuation">:</span> my.application.com

<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> app<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> app
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_API_URL
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /api
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_KEYCLOAK_URL
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_KEYCLOAK_CLIENT_ID
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_KEYCLOAK_REALM
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="deploying" tabindex="-1"><a class="header-anchor" href="#deploying" aria-hidden="true">#</a> Deploying</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Create a kubomization.yaml, and patch.yaml</span>
<span class="token comment"># View your deployments (outputs to screen, but doesn&#39;t apply to OpenShift)</span>
oc kustomize ./deployment
<span class="token comment"># Deploys and applies to OpenShift</span>
oc apply <span class="token parameter variable">-k</span> ./deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function v(m,b){const a=p("ExternalLinkIcon");return i(),l("div",null,[u,s("p",null,[n("In order to deploy to a kubernetes cluster, follow these steps. "),s("a",r,[n("Kustomize"),e(a)]),n(" is used to deploy to Kubernetes. You will also need the "),s("a",d,[n("OpenShift CLI"),e(a)])]),k])}const _=t(c,[["render",v],["__file","deploy_openshift.html.vue"]]);export{_ as default};
