import{_ as n,o as e,c as a,a as t}from"./app-5YDIVGs8.js";const s={},o=t(`<h1 id="deletebutton" tabindex="-1"><a class="header-anchor" href="#deletebutton"><span>DeleteButton</span></a></h1><p>The <code>DeleteButton</code> component is a custom React component that provides a delete button with integrated confirmation dialog functionality. It utilizes the Material-UI (MUI) library for styling and interaction.</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><p>The <code>DeleteButton</code> component is designed to handle delete actions with an integrated confirmation dialog. It extends the Material-UI <code>Button</code> component and takes the following props:</p><ul><li><code>handleDelete</code>: A function that will be called when the user confirms the delete action.</li><li>Other props: All other props from the Material-UI <code>Button</code> component, excluding <code>onClick</code> and <code>endIcon</code>.</li></ul><h2 id="styling" tabindex="-1"><a class="header-anchor" href="#styling"><span>Styling</span></a></h2><p>The <code>DeleteButton</code> component utilizes Material-UI <code>Button</code> component for its structure and styling. It has the following styling specifications:</p><ul><li>Color: <code>error</code></li><li>Variant: <code>contained</code></li><li>Icon: Delete icon from Material-UI</li></ul><h2 id="default-behavior" tabindex="-1"><a class="header-anchor" href="#default-behavior"><span>Default Behavior</span></a></h2><p>When the user clicks the delete button, a confirmation dialog will be displayed asking, &quot;Are you sure you want to delete?&quot; The user can confirm or cancel the delete action through the dialog.</p><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h2><div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> DeleteButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./DeleteButton&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Import the DeleteButton component</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">handleDelete</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Handle the delete logic here</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">DeleteButton</span></span> <span class="token attr-name">handleDelete</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleDelete<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),l=[o];function i(c,p){return e(),a("div",null,l)}const d=n(s,[["render",i],["__file","DeleteButton.html.vue"]]),r=JSON.parse('{"path":"/guide/Frontend/react_components/DeleteButton.html","title":"DeleteButton","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[]},{"level":2,"title":"Styling","slug":"styling","link":"#styling","children":[]},{"level":2,"title":"Default Behavior","slug":"default-behavior","link":"#default-behavior","children":[]},{"level":2,"title":"Example","slug":"example","link":"#example","children":[]}],"git":{"contributors":[{"name":"Shawn","email":"45861534+ShawnTurple@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/Frontend/react_components/DeleteButton.md"}');export{d as comp,r as data};
