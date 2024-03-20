import{_ as a,o as n,c as e,a as s}from"./app-OuJT1XMS.js";const t={},o=s(`<h1 id="pageheader" tabindex="-1"><a class="header-anchor" href="#pageheader"><span>PageHeader</span></a></h1><p>The <code>PageHeader</code> component is a React component that represents the header of a page. It utilizes the Material-UI (MUI) library for styling and includes features such as a menu toggle button, page title, and a sign-out button.</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><p>The <code>PageHeader</code> component is designed to be used as the header at the top of a page. It takes a prop <code>handleDrawerToggle</code> to handle the toggle of the sidebar menu.</p><h2 id="styling" tabindex="-1"><a class="header-anchor" href="#styling"><span>Styling</span></a></h2><p>The <code>PageHeader</code> component utilizes Material-UI <code>AppBar</code>, <code>Toolbar</code>, <code>IconButton</code>, and <code>Typography</code> components for its structure and styling. It has the following styling specifications:</p><ul><li>Background Color: <code>#fff</code></li><li>Width: Adjusted based on the presence of a sidebar menu (<code>calc(100% - \${drawerWidth}px)</code>)</li><li>Margin Left: Adjusted based on the presence of a sidebar menu (<code>\${drawerWidth}px</code>)</li><li>Title Text Color: <code>#000</code></li></ul><h2 id="default-behavior" tabindex="-1"><a class="header-anchor" href="#default-behavior"><span>Default Behavior</span></a></h2><p>The <code>PageHeader</code> component renders a responsive header with a menu toggle button, page title, and a sign-out button.</p><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h2><div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> PageHeader <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./PageHeader&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Import the PageHeader component</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">handleDrawerToggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Handle the sidebar toggle logic here</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">PageHeader</span></span> <span class="token attr-name">handleDrawerToggle</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleDrawerToggle<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span><span class="token comment">/* Your page content goes here */</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),p=[o];function l(c,i){return n(),e("div",null,p)}const r=a(t,[["render",l],["__file","PageHeader.html.vue"]]),u=JSON.parse('{"path":"/guide/Frontend/react_components/Layout/PageHeader.html","title":"PageHeader","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[]},{"level":2,"title":"Styling","slug":"styling","link":"#styling","children":[]},{"level":2,"title":"Default Behavior","slug":"default-behavior","link":"#default-behavior","children":[]},{"level":2,"title":"Example","slug":"example","link":"#example","children":[]}],"git":{"contributors":[{"name":"ASpiteri-BCGov","email":"49036255+ASpiteri-BCGov@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/Frontend/react_components/Layout/PageHeader.md"}');export{r as comp,u as data};