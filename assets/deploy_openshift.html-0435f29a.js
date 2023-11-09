import{_ as t,r as p,o as i,c as l,b as s,d as n,e,a as o}from"./app-5d4b73f9.js";const c={},u=s("h1",{id:"deploying-to-openshift",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#deploying-to-openshift","aria-hidden":"true"},"#"),n(" Deploying to OpenShift")],-1),d={href:"https://kustomize.io/",target:"_blank",rel:"noopener noreferrer"},r={href:"https://docs.openshift.com/container-platform/4.14/cli_reference/openshift_cli/getting-started-cli.html",target:"_blank",rel:"noopener noreferrer"},k=o(`<ul><li>Create a folder for your deployment for this example we use <code>deployment</code></li><li>Add a <code>kustomization.yaml</code> and a <code>patch.yaml</code> to your deployment</li><li>Copy the sample code into these files and add configuration and secretes</li><li><a href="#deploying-image-builds-to-openshift">Create images</a> for your deployment, which needs to be accessible by your deployment, and also match the architecture of kubernetes cluster (amd/arm)</li><li>View and test your deployment run <code>oc kustomize ./deployment</code></li><li>Deploy your deployment <code>oc apply -k ./deployment</code></li></ul><h2 id="deploying-gdx-agreements-tracker-to-openshift" tabindex="-1"><a class="header-anchor" href="#deploying-gdx-agreements-tracker-to-openshift" aria-hidden="true">#</a> Deploying Gdx Agreements tracker to OpenShift</h2><h3 id="kustomization-yaml" tabindex="-1"><a class="header-anchor" href="#kustomization-yaml" aria-hidden="true">#</a> kustomization.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#/deployment/kustomization.yaml</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deploying-image-builds-to-openshift" tabindex="-1"><a class="header-anchor" href="#deploying-image-builds-to-openshift" aria-hidden="true">#</a> Deploying Image Builds to OpenShift</h2><ul><li>Create a folder for your deployment for this example we use <code>image-deployments</code></li><li>Add a <code>kustomization.yaml</code> to your image-deployments</li><li>Copy the sample configuration into the <code>kkustomization.yaml</code>, the only thing that should need to be changed is the namespace.</li><li>View and test your deployment run <code>oc kustomize ./image-deployments</code></li><li>Deploy your deployment <code>oc apply -k ./image-deployments</code></li></ul><h3 id="kustomization-yaml-1" tabindex="-1"><a class="header-anchor" href="#kustomization-yaml-1" aria-hidden="true">#</a> kustomization.yaml</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#/image-deployments/kustomization.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> github.com/bcgov/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker/deployments/kustomize/image<span class="token punctuation">-</span>builds
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> 12345<span class="token punctuation">-</span>tools
<span class="token comment">#patchesStrategicMerge:</span>
<span class="token comment">#- patch.yaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function m(v,y){const a=p("ExternalLinkIcon");return i(),l("div",null,[u,s("p",null,[n("In order to deploy to a kubernetes cluster, follow these steps. "),s("a",d,[n("Kustomize"),e(a)]),n(" is used to deploy to Kubernetes. You will also need the "),s("a",r,[n("OpenShift CLI"),e(a)])]),k])}const h=t(c,[["render",m],["__file","deploy_openshift.html.vue"]]);export{h as default};
