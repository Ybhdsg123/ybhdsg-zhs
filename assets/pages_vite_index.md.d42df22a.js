import{_ as s,o as a,c as l,a as n}from"./app.3b042b83.js";const A=JSON.parse('{"title":"vite \u76F8\u5173","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. i\u200Bmport.meta.glob \u83B7\u53D6\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6","slug":"_1-import-meta-glob-\u83B7\u53D6\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6","link":"#_1-import-meta-glob-\u83B7\u53D6\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6","children":[]},{"level":2,"title":"2. vite \u6BD4 webpack \u5FEB\u7684\u539F\u56E0","slug":"_2-vite-\u6BD4-webpack-\u5FEB\u7684\u539F\u56E0","link":"#_2-vite-\u6BD4-webpack-\u5FEB\u7684\u539F\u56E0","children":[]}],"relativePath":"pages/vite/index.md"}'),e={name:"pages/vite/index.md"},o=n(`<h1 id="vite-\u76F8\u5173" tabindex="-1">vite \u76F8\u5173 <a class="header-anchor" href="#vite-\u76F8\u5173" aria-hidden="true">#</a></h1><h2 id="_1-import-meta-glob-\u83B7\u53D6\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6" tabindex="-1">1. <a href="https://cn.vitejs.dev/guide/features.html#glob-import" target="_blank" rel="noreferrer"><code>i<wbr>mport.meta.glob</code></a> \u83B7\u53D6\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6 <a class="header-anchor" href="#_1-import-meta-glob-\u83B7\u53D6\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u83B7\u53D6\u6240\u6709\u7EC4\u4EF6\u4FE1\u606F</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> allRoutes </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">glob</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/components/**/index.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//\u8BBE\u7F6E\u4E3A true \u76F4\u63A5\u5F15\u5165\u6240\u6709\u7684\u6A21\u5757\uFF08\u4F8B\u5982\u4F9D\u8D56\u4E8E\u8FD9\u4E9B\u6A21\u5757\u4E2D\u7684\u526F\u4F5C\u7528\u9996\u5148\u88AB\u5E94\u7528\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">eager</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u52A0\u8F7D\u9ED8\u8BA4\u5BFC\u51FA\uFF0C\u4E0D\u52A0\u8FD9\u4E2A\u9700\u8981\u8FD9\u6837\u83B7\u53D6\u6587\u4EF6  allRoutes[key].default.name</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">import</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">default</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">install</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">allRoutes</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">allRoutes</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">allRoutes</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><h2 id="_2-vite-\u6BD4-webpack-\u5FEB\u7684\u539F\u56E0" tabindex="-1">2. vite \u6BD4 webpack \u5FEB\u7684\u539F\u56E0 <a class="header-anchor" href="#_2-vite-\u6BD4-webpack-\u5FEB\u7684\u539F\u56E0" aria-hidden="true">#</a></h2><details class="details custom-block"><summary><code>webpack</code>\uFF1A\u5206\u6790\u4F9D\u8D56 ==&gt; \u7F16\u8BD1\u6253\u5305 ==&gt; \u4EA4\u7ED9\u672C\u5730\u670D\u52A1\u5668\u6E32\u67D3</summary><ul><li>\u5206\u6790\u5404\u4E2A\u6A21\u5757\u4E4B\u95F4\u7684\u4F9D\u8D56\uFF0C\u518D\u8FDB\u884C\u6253\u5305\uFF0C\u7136\u540E\u901A\u8FC7<code>webpack-dev-server</code>\u8BF7\u6C42\uFF0C\u663E\u793A\u7ED3\u679C\u3002</li><li>\u9879\u76EE\u4F53\u79EF\u53D8\u5927\uFF0C<code>bundle</code>\u4F53\u79EF\u589E\u52A0\uFF0C\u5F71\u54CD\u70ED\u66F4\u65B0\u901F\u5EA6</li></ul></details><p>::: <code>vite</code>: \u5F00\u53D1\u9636\u6BB5\u901A\u8FC7 <code>esbuild</code>\u6784\u5EFA\uFF0C\u751F\u4EA7\u73AF\u5883\u901A\u8FC7 <code>rollup</code> \u8FDB\u884C\u6784\u5EFA</p><ul><li>\u5F00\u53D1\u9636\u6BB5\uFF1A\u91C7\u7528 <code>esbuild</code> \u8FDB\u884C\u4F9D\u8D56\u9884\u8D2D\u5EFA\uFF0C\u4F9D\u8D56\u4E0D\u6539\u53D8\uFF0C\u4E0D\u9700\u8981\u91CD\u65B0\u6784\u5EFA\uFF0C\u901A\u8FC7\u6D4F\u89C8\u5668\u81EA\u8EAB\u7684 <code>ES Modules(ESM)</code> \uFF0C\u7ED9<code>&lt;scrup</code> \u5199\u4E0A <code>type=&#39;module&#39;</code>\uFF0C\u6765\u4F7F\u7528\u6D4F\u89C8\u5668\u7684 esm \u6A21\u5757\u52A0\u8F7D\u6A21\u5757\uFF0C\u5F53\u6D4F\u89C8\u5668\u53D1\u8D77\u76F8\u5E94\u6A21\u5757\u7684\u8BF7\u6C42\u65F6\uFF0CVite \u5185\u7F6E\u7684\u57FA\u4E8E Koa \u6784\u5EFA\u7684 web \u670D\u52A1\u5668\u4F1A\u62E6\u622A ES Module \u8BF7\u6C42\uFF0C\u5E76\u901A\u8FC7 path \u627E\u5230\u60F3\u8981\u76EE\u5F55\u7684\u6587\u4EF6\uFF0C\u901A\u8FC7\u7B80\u5355\u7684\u5904\u7406\u518D\u8FD4\u56DE\u7ED9\u6D4F\u89C8\u5668\u3002</li></ul><p>:::</p><div class="tip custom-block"><p class="custom-block-title">\u603B\u7ED3</p><p><code>vite</code> \u5728\u5F00\u53D1\u9636\u6BB5\u6784\u5EFA\u9879\u76EE\u65F6\u4F1A\u5C06\u5176\u6784\u5EFA\u6210 ESM \u7684\u5F62\u5F0F\uFF0C\u8FD9\u8BA9\u6D4F\u89C8\u5668\u6765\u51B3\u5B9A\u4EC0\u4E48\u4F7F\u7528\u8981\u52A0\u8F7D\u4EC0\u4E48\u6A21\u5757\uFF0C\u7136\u540E Vite \u62E6\u622A\u5E76\u5904\u7406\u6D4F\u89C8\u5668\u5BF9\u6A21\u578B\u52A0\u8F7D\u7684\u8BF7\u6C42\uFF0C\u4ECE\u800C\u5B9E\u73B0\u771F\u6B63\u7684\u6309\u9700\u52A0\u8F7D\uFF0C<strong>\u4E0D\u518D\u9700\u8981\u6253\u5305</strong>\u3002</p></div>`,9),p=[o];function t(c,r,i,D,y,F){return a(),l("div",null,p)}const C=s(e,[["render",t]]);export{A as __pageData,C as default};