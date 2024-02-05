import{_ as p,r as o,o as c,c as l,b as n,d as s,e as t,a as e}from"./app-4351dcd4.js";const i={},u=e('<h1 id="formbuttons" tabindex="-1"><a class="header-anchor" href="#formbuttons" aria-hidden="true">#</a> FormButtons</h1><p>The <code>FormButtons</code> component is a React component that renders a form with two buttons: Cancel and Submit.</p><h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3><p><code>FormButtons</code> takes in two props: handleOnCancel, which is a function to be called when the Cancel button is clicked, and dirty, which is a boolean value indicating whether the form has been modified. The component returns a JSX element representing the form with two buttons.</p><ul><li><code>handleOnCancel</code> (Function): callback function to invoke when the cancel button is clicked.</li><li><code>dirty</code> (boolean): if dirty, enable the Submit button, otherwise disable it.</li></ul><h1 id="styling" tabindex="-1"><a class="header-anchor" href="#styling" aria-hidden="true">#</a> Styling</h1><p>The buttons are styled using the custom props provided by the MUI <code>&lt;Button&gt;</code> Component:</p>',7),r=n("code",null,"variant",-1),k={href:"https://mui.com/material-ui/api/button/",target:"_blank",rel:"noopener noreferrer"},d=n("code",null,"<Button>",-1),m=n("code",null,"color",-1),v={href:"https://mui.com/material-ui/customization/palette/#default-colors",target:"_blank",rel:"noopener noreferrer"},b=e(`<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// the &lt;FormButtons&gt; component appears at the bottom of this snippet</span>

<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> FormButtons <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./FormButtons&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">IFormValues</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  email<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">MyForm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>formValues<span class="token punctuation">,</span> setFormValues<span class="token punctuation">]</span> <span class="token operator">=</span>
    useState <span class="token operator">&lt;</span> IFormValues <span class="token operator">&gt;</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> email<span class="token operator">:</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>dirty<span class="token punctuation">,</span> setDirty<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleInputChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token operator">:</span> React<span class="token punctuation">.</span>ChangeEvent<span class="token operator">&lt;</span>HTMLInputElement<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> value <span class="token punctuation">}</span> <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">;</span>
    <span class="token function">setFormValues</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>formValues<span class="token punctuation">,</span> <span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token operator">:</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setDirty</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleFormSubmit</span> <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token operator">:</span> React<span class="token punctuation">.</span>FormEvent<span class="token operator">&lt;</span>HTMLFormElement<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Form submitted:&quot;</span><span class="token punctuation">,</span> formValues<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setDirty</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleFormCancel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Form cancelled&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setDirty</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">onSubmit</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleFormSubmit<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        Name:
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
          <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>formValues<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>
          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleInputChange<span class="token punctuation">}</span></span>
        <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        Email:
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
          <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>email<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>formValues<span class="token punctuation">.</span>email<span class="token punctuation">}</span></span>
          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleInputChange<span class="token punctuation">}</span></span>
        <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">FormButtons</span></span> <span class="token attr-name">dirty</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>dirty<span class="token punctuation">}</span></span> <span class="token attr-name">handleOnCancel</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleFormCancel<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h={href:"https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/Forms/InputForm/index.tsx",target:"_blank",rel:"noopener noreferrer"},g=n("code",null,"components/Forms/InputForm",-1),f={href:"https://github.com/bgov/gdx-agreements-tracker/blob/development/frontend/src/pages/Contracts/Contract/ContractDetails",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"<formRenderer>",-1);function x(y,w){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("ul",null,[n("li",null,[n("p",null,[r,s(': "contained", which has a drop-shadow, is from the MUI '),n("a",k,[d,t(a)]),s(" component.")])]),n("li",null,[n("p",null,[m,s(': "success" (green), "secondary" (white). these come from the MUI theme '),n("a",v,[s("default color palette"),t(a)])])])]),b,n("p",null,[s("There is a working example "),n("a",h,[g,t(a)]),s(" used by the "),n("a",f,[_,t(a)]),s(" on the Contracts > ContractDetails page.")])])}const q=p(i,[["render",x],["__file","FormButtons.html.vue"]]);export{q as default};