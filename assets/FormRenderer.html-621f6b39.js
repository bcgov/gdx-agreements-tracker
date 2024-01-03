import{_ as e,r as t,o,c as p,b as n,d as s,e as c,a as r}from"./app-ba8df3b5.js";const i={},l=r(`<h1 id="form-renderer" tabindex="-1"><a class="header-anchor" href="#form-renderer" aria-hidden="true">#</a> Form Renderer</h1><p>The <code>FormRenderer</code> component is a custom React component designed to display a Form and to handle CRUD operations between it and the backend instance. It uses several material UI components for styling, including Box, Button, and LinearProgress. The Form itself relies on MUI and Formik for validation, rendering, and on the <code>react-query</code> library to support CRUD operations.</p><h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3><p>The <code>FormRenderer</code> component takes in several props including <code>formControls</code>, <code>tableName</code>, <code>formConfig</code>, <code>formDataApiEndpoint</code>, and <code>isReadOnly</code>. It uses several hooks to generate the props it needs to generate a dynamic form capable of CRUD operations on the table data it displays and updates. The hooks include <code>useQueryClient</code> to generate a client function for validating and running queries against the backend, and throw snackbar alerts to the client app. The <code>useSnackbar</code> hook is used to display success/fail methods on CRUD operations in the client app. It also uses several custom hooks including <code>useFormSubmit</code>, <code>useFormControls</code>, and <code>useFormLock</code> to handle form submission, form controls, and database locking respectively. This is how the props are used:</p><ul><li><code>formControls</code> (object): A hook generated state object for form control information such as row data, edit mode, open/close, and form type.</li><li><code>tableName</code> (string[]): The key used to find the react query cache for the that item</li><li><code>formConfig</code> (function): A factory function that generates a form configuration object to be consumed by this renderer.</li><li><code>formDataApiEndpoint</code> (string): A string representing the API endpoint for form data.</li><li><code>isReadOnly</code> (boolean): A boolean value to indicate whether to display this form as read-only</li></ul><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// This is a real example where the form renderer component</span>
<span class="token comment">// will display a Project Details form, complete with CRUD operations</span>
<span class="token comment">// available to the client.</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> FormRenderer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;components/Forms/FormRenderer&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useParams <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react-router&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> FormConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./FormConfig&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useFormControls <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;hooks&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> IFormControls <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;types&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">ProjectRegistrationSection</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> projectId <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token literal-property property">formControls</span><span class="token operator">:</span> IFormControls <span class="token operator">=</span> <span class="token function">useFormControls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">FormRenderer</span></span>
      <span class="token attr-name">formControls</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>formControls<span class="token punctuation">}</span></span>
      <span class="token attr-name">tableName</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&quot;projects&quot;</span><span class="token punctuation">}</span></span>
      <span class="token attr-name">formConfig</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>FormConfig<span class="token punctuation">}</span></span>
      <span class="token attr-name">formDataApiEndpoint</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/projects/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>projectId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span></span>
    <span class="token punctuation">/&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),u={id:"for-a-current-in-use-example-see-pages-projects-project-projectdetails-projectregistrationsection",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#for-a-current-in-use-example-see-pages-projects-project-projectdetails-projectregistrationsection","aria-hidden":"true"},"#",-1),m={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/pages/Projects/Project/ProjectDetails/ProjectRegistrationSection/index.tsx",target:"_blank",rel:"noopener noreferrer"};function k(h,f){const a=t("ExternalLinkIcon");return o(),p("div",null,[l,n("h5",u,[d,s(" For a current in-use example, see: "),n("a",m,[s("pages/Projects/Project/ProjectDetails/ProjectRegistrationSection"),c(a)])])])}const v=e(i,[["render",k],["__file","FormRenderer.html.vue"]]);export{v as default};
