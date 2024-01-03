import{_ as n,o as a,c as s,a as e}from"./app-a5d8b078.js";const t={},o=e(`<h1 id="autocompletetable" tabindex="-1"><a class="header-anchor" href="#autocompletetable" aria-hidden="true">#</a> AutocompleteTable</h1><p>The <code>AutocompleteTable</code> component is a React component designed for integration into forms, providing an autocomplete feature with a table display. It utilizes Material-UI components such as <code>Autocomplete</code>, <code>Table</code>, and <code>TextField</code> for rendering and user interaction.</p><h3 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h3><p>The <code>AutocompleteTable</code> component accepts the following props:</p><ul><li><code>fieldName</code> (string): The name of the field associated with the component.</li><li><code>fieldValue</code> (string): The current value of the field.</li><li><code>fieldLabel</code> (string, optional): The label to display for the field.</li><li><code>onChange</code> (function): A callback function triggered when the selection changes.</li><li><code>pickerData</code> (<code>IAutocompleteTable</code>, required): Data for the Autocomplete component, including definition and title.</li><li><code>required</code> (boolean, optional): Indicates whether the field is required.</li><li><code>helperText</code> (string, optional): Additional text to provide assistance or context.</li><li><code>error</code> (boolean, optional): Indicates whether there is an error with the field.</li><li><code>autocompleteTableColumns</code> (array of <code>IAutocompleteTableColumn</code>): Configuration for table columns.</li></ul><h3 id="iautocompletetablecolumn" tabindex="-1"><a class="header-anchor" href="#iautocompletetablecolumn" aria-hidden="true">#</a> IAutocompleteTableColumn</h3><ul><li><code>field</code> (string): The field key for the column.</li><li><code>headerName</code> (string): The header name to display for the column.</li></ul><h3 id="ioption" tabindex="-1"><a class="header-anchor" href="#ioption" aria-hidden="true">#</a> IOption</h3><p>Represents an option in the autocomplete dropdown.</p><h3 id="styles" tabindex="-1"><a class="header-anchor" href="#styles" aria-hidden="true">#</a> Styles</h3><p>The component uses a hover effect (<code>tableCellStyles</code>) to highlight rows when hovered over.</p><h3 id="example-usage" tabindex="-1"><a class="header-anchor" href="#example-usage" aria-hidden="true">#</a> example usage:</h3><h6 id="note-you-shouldn-t-have-to-modify-or-directly-call-this-component-this-component-is-configured-in-a-way-that-you-can-use-it-by-adding-a-config-for-it-in-the-formconfig-editfields-of-any-frontend-section-see-below-for-more-information" tabindex="-1"><a class="header-anchor" href="#note-you-shouldn-t-have-to-modify-or-directly-call-this-component-this-component-is-configured-in-a-way-that-you-can-use-it-by-adding-a-config-for-it-in-the-formconfig-editfields-of-any-frontend-section-see-below-for-more-information" aria-hidden="true">#</a> Note: You shouldn&#39;t have to modify or directly call this component. This component is configured in a way that you can use it by adding a config for it in the formConfig &gt; editFields of any frontend section. See below for more information.</h6><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AutocompleteTable</span></span>
    <span class="token attr-name">required</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>required<span class="token punctuation">}</span></span>
    <span class="token attr-name">as</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>AutocompleteTable<span class="token punctuation">}</span></span>
    <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">newValue</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    setFieldValue<span class="token operator">?.</span><span class="token punctuation">(</span>fieldName<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
    <span class="token attr-name">fieldName</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>fieldName<span class="token punctuation">}</span></span>
    <span class="token attr-name">fieldValue</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>fieldValue <span class="token keyword">as</span> IOption<span class="token punctuation">}</span></span>
    <span class="token attr-name">fieldLabel</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>fieldLabel<span class="token punctuation">}</span></span>
    <span class="token attr-name">setFieldValue</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>setFieldValue <span class="token keyword">as</span> Function<span class="token punctuation">}</span></span>
    <span class="token attr-name">pickerData</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">GetPickerOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
    <span class="token attr-name">autocompleteTableColumns</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>autocompleteTableColumns<span class="token punctuation">}</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="data-configuration" tabindex="-1"><a class="header-anchor" href="#data-configuration" aria-hidden="true">#</a> Data Configuration</h3><p>To add a new picker option, update the picker_options model&#39;s tableLookupValues:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&quot;autoCompleteTest&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;auto_complete_test&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;ACTest&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&quot;A test for autocomplete table&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">table</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">queryAdditions</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">customDefinition</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    (
      SELECT COALESCE(json_agg(autoCompleteTest), &#39;[]&#39;)
      FROM (
        SELECT STOB as STOB,
        stob_id as value
        FROM data.project_budget
        WHERE project_deliverable_id = 303
      ) as autoCompleteTest
    )</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ensure you have a value property in your query as it is used to send data to the database.</p><h3 id="frontend-configuration" tabindex="-1"><a class="header-anchor" href="#frontend-configuration" aria-hidden="true">#</a> Frontend configuration</h3><p>To configure the frontend, add a new object to the formconfig edit fields for the appropriate section, specifying the fieldType as &quot;autocompleteTable&quot; and providing the necessary details.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token punctuation">{</span>
      <span class="token literal-property property">fieldName</span><span class="token operator">:</span> <span class="token string">&quot;example_name&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">fieldLabel</span><span class="token operator">:</span> <span class="token string">&quot;Example Name&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">fieldType</span><span class="token operator">:</span> <span class="token string">&quot;autocompleteTable&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token string">&quot;full&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">pickerName</span><span class="token operator">:</span> <span class="token string">&quot;auto_complete_test&quot;</span><span class="token punctuation">,</span>  <span class="token comment">//This should match the picker name used to create the picker options in the previous step.</span>
      <span class="token literal-property property">autocompleteTableColumns</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">field</span><span class="token operator">:</span> <span class="token string">&quot;STOB&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">headerName</span><span class="token operator">:</span> <span class="token string">&quot;STOB &quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),p=[o];function i(l,c){return a(),s("div",null,p)}const u=n(t,[["render",i],["__file","AutocompleteTable.html.vue"]]);export{u as default};