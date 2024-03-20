import{_ as n,o as a,c as s,a as e}from"./app-OuJT1XMS.js";const t={},o=e(`<h1 id="accordion" tabindex="-1"><a class="header-anchor" href="#accordion"><span>Accordion</span></a></h1><p>The <code>Accordion</code> component is a custom React component designed to create expandable sections or panels within a user interface. It utilizes the Material-UI (MUI) library for styling and interaction.</p><h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h3><p>The <code>Accordion</code> component is used to wrap content that you want to be hidden by default but expandable when the user interacts with it. It takes the following props:</p><ul><li><code>children</code>: Accepts JSX elements or components that represent the content to be displayed within the accordion when expanded.</li><li><code>sectionTitle</code>: A string that represents the title or label of the accordion section.</li></ul><h3 id="styling" tabindex="-1"><a class="header-anchor" href="#styling"><span>Styling</span></a></h3><p>The <code>Accordion</code> component utilizes the Material-UI <code>Accordion</code>, <code>AccordionSummary</code>, and <code>AccordionDetails</code> components for its functionality. It also applies custom styling using the <code>styled</code> utility from Material-UI.</p><ul><li>The summary section of the accordion is styled with a background color of <code>#f3f3f3</code>.</li><li>The section title text is styled with a bold font weight and a color based on the primary color defined in the <code>bcgovTheme</code>.</li></ul><h3 id="default-behavior" tabindex="-1"><a class="header-anchor" href="#default-behavior"><span>Default Behavior</span></a></h3><p>The <code>Accordion</code> component is set to be expanded by default, meaning that its content will be visible when the component is initially rendered. Users can interact with the accordion to collapse or expand it by clicking on the expand/collapse icon.</p><p>Feel free to integrate this component into your React application to create collapsible sections or panels with ease.</p><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3><div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Accordion <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./Accordion&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Import the Accordion component</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Accordion</span></span> <span class="token attr-name">sectionTitle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Section 1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token comment">/* Content for Section 1 */</span><span class="token punctuation">}</span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Accordion</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Accordion</span></span> <span class="token attr-name">sectionTitle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Section 2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token punctuation">{</span><span class="token comment">/* Content for Section 2 */</span><span class="token punctuation">}</span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Accordion</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[o];function i(p,l){return a(),s("div",null,c)}const r=n(t,[["render",i],["__file","Accordion.html.vue"]]),u=JSON.parse('{"path":"/guide/Frontend/react_components/Accordion.html","title":"Accordion","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"Usage","slug":"usage","link":"#usage","children":[]},{"level":3,"title":"Styling","slug":"styling","link":"#styling","children":[]},{"level":3,"title":"Default Behavior","slug":"default-behavior","link":"#default-behavior","children":[]},{"level":3,"title":"Example","slug":"example","link":"#example","children":[]}],"git":{"contributors":[{"name":"ASpiteri-BCGov","email":"49036255+ASpiteri-BCGov@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/Frontend/react_components/Accordion.md"}');export{r as comp,u as data};