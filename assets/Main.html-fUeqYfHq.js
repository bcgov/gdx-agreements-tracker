import{_ as t,r as s,o,c,b as e,d as n,e as i,a as d}from"./app-I8A7UQY3.js";const l={},p=d(`<h1 id="main" tabindex="-1"><a class="header-anchor" href="#main"><span>Main</span></a></h1><p>The <code>Main</code> component is a React component that renders the main content of the application. It uses the React Router to switch between different pages based on the URL. It also handles the authentication and authorization logic using Keycloak.</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><p>The <code>Main</code> component is used to render the main content of the application. It uses the React Router to switch between different pages based on the URL. It also handles the authentication and authorization logic using Keycloak. The component does not take any props as input. The function returns a JSX element representing the main content of the application. The <code>Main</code> component is exported and can be imported into other files where it can be used as a building block for creating more complex components.</p><h2 id="styling" tabindex="-1"><a class="header-anchor" href="#styling"><span>Styling</span></a></h2><p>The <code>Main</code> component utilizes Material-UI <code>Box</code>, <code>PageHeader</code>, <code>Sidebar</code>, <code>Outlet</code>, and <code>PageFooter</code> components for its structure and styling. It has the following styling specifications:</p><ul><li>The <code>Box</code> component is used to create a container that holds the header, sidebar, main content, and footer.</li><li>The <code>PageHeader</code> component is used to create the header, which includes a title and a hamburger menu button that toggles the sidebar.</li><li>The <code>Sidebar</code> component is used to create the sidebar, which contains a list of links to different pages.</li><li>The <code>Outlet</code> component is used to render the content of the current page.</li><li>The <code>PageFooter</code> component is used to create the footer.</li><li>The <code>useDrawer</code> hook is used to manage the state of the sidebar.</li><li>The <code>drawerWidth</code> variable is used to set the width of the sidebar.</li><li>The <code>sx</code> prop is used to apply styles to the <code>Box</code> component. The <code>flexGrow</code>, <code>p</code>, <code>flex</code>, <code>display</code>, <code>flexDirection</code>, <code>boxSizing</code>, <code>width</code>, <code>ml</code>, and <code>mt</code> properties are used to control the layout and spacing of the main content.</li><li>The <code>component</code> property is used to specify the type of HTML element that the <code>Box</code> component should render as. The <code>sx</code> prop is also used to apply styles to the <code>Box</code> component that contains the main content.</li></ul><h2 id="default-behavior" tabindex="-1"><a class="header-anchor" href="#default-behavior"><span>Default Behavior</span></a></h2><p>Regarding the default behavior of the <code>Main</code> component, it is a functional component and does not have any lifecycle methods. Therefore, it does not have any default behavior that can be overridden. The component simply renders the main content of the application as described above. If you want to modify the behavior of the component, you will need to modify the code of the component itself.</p><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h2><div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Main <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./components/Main&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Import the Main component</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span><span class="token comment">/* Your page content goes here */</span><span class="token punctuation">}</span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Main</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),r={id:"for-a-current-in-use-example-see-routes-index-tsx",tabindex:"-1"},h={class:"header-anchor",href:"#for-a-current-in-use-example-see-routes-index-tsx"},u={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/routes/index.tsx",target:"_blank",rel:"noopener noreferrer"};function m(f,g){const a=s("ExternalLinkIcon");return o(),c("div",null,[p,e("h5",r,[e("a",h,[e("span",null,[n("For a current in-use example, see: "),e("a",u,[n("/routes/index.tsx"),i(a)])])])])])}const b=t(l,[["render",m],["__file","Main.html.vue"]]),v=JSON.parse(`{"path":"/guide/Frontend/react_components/Layout/Main.html","title":"Main","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[]},{"level":2,"title":"Styling","slug":"styling","link":"#styling","children":[]},{"level":2,"title":"Default Behavior","slug":"default-behavior","link":"#default-behavior","children":[]},{"level":2,"title":"Example","slug":"example","link":"#example","children":[]}],"git":{"contributors":[{"name":"Richard O'Brien","email":"122112933+robrien-bcgov@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/Frontend/react_components/Layout/Main.md"}`);export{b as comp,v as data};
