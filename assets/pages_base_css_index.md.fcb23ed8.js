import{_ as s,o as a,c as n,a as l}from"./app.3b042b83.js";const i=JSON.parse('{"title":"css","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u7F51\u7AD9\u7F6E\u7070","slug":"_1-\u7F51\u7AD9\u7F6E\u7070","link":"#_1-\u7F51\u7AD9\u7F6E\u7070","children":[]},{"level":2,"title":"2. css \u7684\u5C42/\u5806\u53E0\u4E0A\u4E0B\u6587","slug":"_2-css-\u7684\u5C42-\u5806\u53E0\u4E0A\u4E0B\u6587","link":"#_2-css-\u7684\u5C42-\u5806\u53E0\u4E0A\u4E0B\u6587","children":[]},{"level":2,"title":"3. css \u65B0\u5EFA\u56FE\u5C42","slug":"_3-css-\u65B0\u5EFA\u56FE\u5C42","link":"#_3-css-\u65B0\u5EFA\u56FE\u5C42","children":[]},{"level":2,"title":"4. \u591A\u884C\u7701\u7565","slug":"_4-\u591A\u884C\u7701\u7565","link":"#_4-\u591A\u884C\u7701\u7565","children":[]},{"level":2,"title":"5. \u6EDA\u52A8\u6761\u6837\u5F0F\u6539\u53D8","slug":"_5-\u6EDA\u52A8\u6761\u6837\u5F0F\u6539\u53D8","link":"#_5-\u6EDA\u52A8\u6761\u6837\u5F0F\u6539\u53D8","children":[]}],"relativePath":"pages/base/css/index.md"}'),p={name:"pages/base/css/index.md"},o=l(`<h1 id="css" tabindex="-1">css <a class="header-anchor" href="#css" aria-hidden="true">#</a></h1><p><strong>Flexbox \u5E03\u5C40\u6700\u9002\u5408\u5E94\u7528\u7A0B\u5E8F\u7684\u7EC4\u4EF6\u548C\u5C0F\u89C4\u6A21\u5E03\u5C40\uFF08\u4E00\u7EF4\u5E03\u5C40\uFF09\uFF0C\u800C Grid \u5E03\u5C40\u5219\u9002\u7528\u4E8E\u66F4\u5927\u89C4\u6A21\u7684\u5E03\u5C40\uFF08\u4E8C\u7EF4\u5E03\u5C40\uFF09</strong></p><p><a href="https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/" target="_blank" rel="noreferrer">Grid \u5E03\u5C40\u94FE\u63A5</a>\uFF1AGrid \u5E03\u5C40\u4E2D\uFF0C<code>float</code>\uFF0C<code>display:inline-block</code>\uFF0C<code>display:table-cell</code>\uFF0C<code>vertical-align</code>\u4EE5\u53CA<code>column-*</code>\u8FD9\u4E9B<strong>\u5C5E\u6027\u548C\u58F0\u660E\u5BF9 grid \u5B50\u9879\u662F\u6CA1\u6709\u4EFB\u4F55\u4F5C\u7528\u7684</strong>\u3002\u9762\u8BD5\u7ECF\u5E38\u4F1A\u95EE\u7684\uFF0C\u4E00\u5B9A\u8981\u8BB0\u5F97\u3002</p><p><a href="https://www.zhangxinxu.com/wordpress/2018/10/display-flex-css3-css/" target="_blank" rel="noreferrer">Flexbox \u5E03\u5C40\u94FE\u63A5</a>\uFF1A<strong>flex \u5B50\u5143\u7D20</strong>\u7684\u8BBE\u7F6E <code>float\`\`\uFF0Cclear</code> \u4EE5\u53CA <code>vertical-align</code> \u5C5E\u6027\u90FD\u662F\u6CA1\u6709\u7528\u7684\u3002</p><h2 id="_1-\u7F51\u7AD9\u7F6E\u7070" tabindex="-1">1. \u7F51\u7AD9\u7F6E\u7070 <a class="header-anchor" href="#_1-\u7F51\u7AD9\u7F6E\u7070" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">html</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">gray-mode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">grayscale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.95</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-webkit-filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">grayscale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0.95</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></div><details class="details custom-block"><summary>\u66F4\u591A\u989C\u8272</summary><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">blur </span><span style="color:#FFCB6B;">\u6A21\u7CCA</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;">blur</span><span style="color:#A6ACCD;">(2px)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">brightness </span><span style="color:#FFCB6B;">\u4EAE\u5EA6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;">brightness</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">25</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">contrast </span><span style="color:#FFCB6B;">\u5BF9\u6BD4\u5EA6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">contrast</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">drop</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">shadow </span><span style="color:#FFCB6B;">\u9634\u5F71</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> drop</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">shadow</span><span style="color:#A6ACCD;">(5px 5px 5px </span><span style="color:#82AAFF;">rgba</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.5</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">opacity </span><span style="color:#FFCB6B;">\u900F\u660E\u5EA6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">opacity</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">grayscale </span><span style="color:#FFCB6B;">\u7070\u5EA6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">grayscale</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">sepia </span><span style="color:#FFCB6B;">\u8910\u8272</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sepia</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">invert </span><span style="color:#FFCB6B;">\u53CD\u8272</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">invert</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">hue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">rotate </span><span style="color:#FFCB6B;">\u8272\u76F8\u65CB\u8F6C</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">hue</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">rotate</span><span style="color:#A6ACCD;">(180deg)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">saturate </span><span style="color:#FFCB6B;">\u9971\u548C\u5EA6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">saturate</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div></details><h2 id="_2-css-\u7684\u5C42-\u5806\u53E0\u4E0A\u4E0B\u6587" tabindex="-1">2. <a href="https://juejin.cn/post/7230460443189084197" target="_blank" rel="noreferrer">css \u7684\u5C42/\u5806\u53E0\u4E0A\u4E0B\u6587</a> <a class="header-anchor" href="#_2-css-\u7684\u5C42-\u5806\u53E0\u4E0A\u4E0B\u6587" aria-hidden="true">#</a></h2><blockquote><p><strong>\u4ECE\u5E95\u5C42\u5230\u9876\u5C42\u987A\u5E8F\uFF1A</strong> \u80CC\u666F\u56FE/\u8FB9\u6846 ==&gt; <code>z-index</code> \u4E3A<strong>\u8D1F\u6570</strong> ==&gt; \u5757\u7EA7\u5143\u7D20 ==&gt; <code>float</code> \u5143\u7D20 ==&gt; \u884C\u5185\u5143\u7D20 ==&gt; <strong>z-index= 1 / auto</strong> ==&gt; <code>z-index</code> \u4E3A<strong>\u6B63\u6570</strong></p></blockquote><h2 id="_3-css-\u65B0\u5EFA\u56FE\u5C42" tabindex="-1">3. <a href="https://juejin.cn/post/7051926604666109988#heading-1" target="_blank" rel="noreferrer">css \u65B0\u5EFA\u56FE\u5C42</a> <a class="header-anchor" href="#_3-css-\u65B0\u5EFA\u56FE\u5C42" aria-hidden="true">#</a></h2><details class="details custom-block"><summary>\u4EA7\u751F\u65B0\u56FE\u5C42\u7684\u539F\u56E0</summary><ul><li>\u6839\u5143\u7D20</li><li>\u6709 z-index \u662F\u8D1F\u503C\u7684\u5B50\u5143\u7D20</li><li>\u6709 3D \u8F6C\u6362</li><li>position\uFF1Afixed</li><li>\u4E0E\u5176\u4ED6\u5143\u7D20\u53EF\u80FD\u91CD\u53E0</li><li>will-change \u6837\u5F0F\u7684\u503C\u4E3A opacity\u3001transform\u3001transform-style\u3001perspective\u3001filter\u3001backdrop-filter \u8FD9 6 \u4E2A\u4E4B\u4E00</li></ul></details><h2 id="_4-\u591A\u884C\u7701\u7565" tabindex="-1">4. \u591A\u884C\u7701\u7565 <a class="header-anchor" href="#_4-\u591A\u884C\u7701\u7565" aria-hidden="true">#</a></h2><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">/* \u7528\u6765\u9650\u5236\u5728\u4E00\u4E2A\u5757\u5143\u7D20\u663E\u793A\u7684\u6587\u672C\u7684\u884C\u6570 */</span></span>
<span class="line"><span style="color:#A6ACCD;">-webkit-line-clamp: 2;</span></span>
<span class="line"><span style="color:#FFCB6B;">text-overflow</span><span style="color:#A6ACCD;">: ellipsis;</span></span>
<span class="line"><span style="color:#A6ACCD;">display: -webkit-box;</span></span>
<span class="line"><span style="color:#A6ACCD;">-webkit-box-orient: vertical;</span></span>
<span class="line"></span></code></pre></div><h2 id="_5-\u6EDA\u52A8\u6761\u6837\u5F0F\u6539\u53D8" tabindex="-1">5. \u6EDA\u52A8\u6761\u6837\u5F0F\u6539\u53D8 <a class="header-anchor" href="#_5-\u6EDA\u52A8\u6761\u6837\u5F0F\u6539\u53D8" aria-hidden="true">#</a></h2><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">// \u4FEE\u6539\u6EDA\u52A8\u6761\u6837\u5F0F \u5927\u5C0F</span></span>
<span class="line"><span style="color:#A6ACCD;">&amp;</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u6EDA\u52A8\u6761\u6837\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">&amp;</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar-thumb</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">888</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u8F68\u9053</span></span>
<span class="line"><span style="color:#A6ACCD;">&amp;</span><span style="color:#89DDFF;">::</span><span style="color:#C792EA;">-webkit-scrollbar-track</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/*\u6EDA\u52A8\u6761\u91CC\u9762\u8F68\u9053*/</span></span>
<span class="line"><span style="color:#A6ACCD;">  // </span><span style="color:#B2CCD6;">box-shadow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> inset </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5px</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rgba</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,15),e=[o];function c(t,r,D,F,y,C){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{i as __pageData,d as default};