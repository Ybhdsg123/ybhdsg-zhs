import{_ as s,c as n,o as a,a as l}from"./app.bea040d8.js";const E=JSON.parse('{"title":"ref","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u77E5\u8BC6\uFF1A","slug":"\u57FA\u7840\u77E5\u8BC6","link":"#\u57FA\u7840\u77E5\u8BC6","children":[]}],"relativePath":"pages/vue3/basic/ref.md"}'),o={name:"pages/vue3/basic/ref.md"},p=l(`<h1 id="ref" tabindex="-1">ref <a class="header-anchor" href="#ref" aria-hidden="true">#</a></h1><h2 id="\u57FA\u7840\u77E5\u8BC6" tabindex="-1">\u57FA\u7840\u77E5\u8BC6\uFF1A <a class="header-anchor" href="#\u57FA\u7840\u77E5\u8BC6" aria-hidden="true">#</a></h2><p><strong><em><code>ref()</code> \u8BA9\u6211\u4EEC\u80FD\u521B\u9020\u4E00\u79CD\u5BF9\u4EFB\u610F\u503C\u7684 \u201C\u5F15\u7528\u201D\uFF0C\u5E76\u80FD\u591F\u5728\u4E0D\u4E22\u5931\u54CD\u5E94\u6027\u7684\u524D\u63D0\u4E0B\u4F20\u9012\u8FD9\u4E9B\u5F15\u7528</em></strong></p><blockquote><ol><li><code>ref()</code> \u65B9\u6CD5\u6765\u5141\u8BB8\u6211\u4EEC\u521B\u5EFA\u53EF\u4EE5\u4F7F\u7528<code>\u4EFB\u4F55\u503C</code>\u7C7B\u578B\u7684<code>\u54CD\u5E94\u5F0F ref</code>;</li><li><code>ref()</code> \u5C06\u4F20\u5165\u53C2\u6570\u7684\u503C\u5305\u88C5\u4E3A\u4E00\u4E2A\u5E26 <code>.value</code> \u5C5E\u6027\u7684 ref \u5BF9\u8C61;</li><li>ref \u7684 <code>.value</code> \u5C5E\u6027\u4E5F\u662F\u54CD\u5E94\u5F0F\u7684\u3002\u540C\u65F6\uFF0C\u5F53\u503C\u4E3A\u5BF9\u8C61\u7C7B\u578B\u65F6\uFF0C\u4F1A\u7528 reactive() \u81EA\u52A8\u8F6C\u6362\u5B83\u7684 .value;</li><li>\u4E00\u4E2A\u5305\u542B\u5BF9\u8C61\u7C7B\u578B\u503C\u7684 ref \u53EF\u4EE5\u54CD\u5E94\u5F0F\u5730\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61; <code>reactive\u201C\u66FF\u6362\u201D\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61\uFF0C\u5C06\u5BFC\u81F4\u5BF9\u521D\u59CB\u5F15\u7528\u7684\u54CD\u5E94\u6027\u8FDE\u63A5\u4E22\u5931</code></li><li>ref \u88AB\u4F20\u9012\u7ED9\u51FD\u6570\u6216\u662F\u4ECE\u4E00\u822C\u5BF9\u8C61\u4E0A\u88AB\u89E3\u6784\u65F6\uFF0C\u4E0D\u4F1A\u4E22\u5931\u54CD\u5E94\u6027; <code>reactive \u5C06\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684\u5C5E\u6027\u8D4B\u503C\u6216\u89E3\u6784\u81F3\u672C\u5730\u53D8\u91CF\u65F6\uFF0C\u6216\u662F\u5C06\u8BE5\u5C5E\u6027\u4F20\u5165\u4E00\u4E2A\u51FD\u6570\u65F6\uFF0C\u4F1A\u5931\u53BB\u54CD\u5E94\u6027</code></li><li>\u5F53 ref \u5728<code>\u6A21\u677F\u4E2D\u4F5C\u4E3A\u9876\u5C42\u5C5E\u6027</code>\u88AB\u8BBF\u95EE\u65F6\uFF0C\u5B83\u4EEC\u4F1A\u88AB\u81EA\u52A8\u201C\u89E3\u5305\u201D</li><li>\u5F53\u4E00\u4E2A ref \u88AB\u5D4C\u5957\u5728\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61\u4E2D\uFF0C\u4F5C\u4E3A\u5C5E\u6027\u88AB\u8BBF\u95EE\u6216\u66F4\u6539\u65F6\uFF0C\u5B83\u4F1A\u81EA\u52A8\u89E3\u5305</li><li>\u5982\u679C\u5C06\u4E00\u4E2A\u65B0\u7684 ref \u8D4B\u503C\u7ED9\u4E00\u4E2A\u5173\u8054\u4E86\u5DF2\u6709 ref \u7684\u5C5E\u6027\uFF0C\u90A3\u4E48\u5B83\u4F1A\u66FF\u6362\u6389\u65E7\u7684 ref</li><li>\u53EA\u6709\u5F53\u5D4C\u5957\u5728\u4E00\u4E2A\u6DF1\u5C42\u54CD\u5E94\u5F0F\u5BF9\u8C61\u5185\u65F6\uFF0C\u624D\u4F1A\u53D1\u751F ref \u89E3\u5305\u3002\u5F53\u5176\u4F5C\u4E3A<code>\u6D45\u5C42\u54CD\u5E94\u5F0F\u5BF9\u8C61\u7684\u5C5E\u6027</code>\u88AB\u8BBF\u95EE\u65F6\u4E0D\u4F1A\u89E3\u5305\u3002</li><li>\u8DDF\u54CD\u5E94\u5F0F\u5BF9\u8C61\u4E0D\u540C\uFF0C\u5F53 ref \u4F5C\u4E3A<code>\u54CD\u5E94\u5F0F\u6570\u7EC4</code>\u6216\u50CF <code>Map \u8FD9\u79CD\u539F\u751F\u96C6\u5408\u7C7B\u578B</code>\u7684\u5143\u7D20\u88AB\u8BBF\u95EE\u65F6\uFF0C\u4E0D\u4F1A\u8FDB\u884C\u89E3\u5305\u3002</li></ol></blockquote><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">script</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">setup</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">ref</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">reactive</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#C98A7D;">vue</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">object</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#B8A965;">foo</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">(</span><span style="color:#4C9A91;">1</span><span style="color:#666666;">)</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">};</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// foo \u662F\u9876\u5C42\u5C5E\u6027\uFF0C\u4F46 object.foo \u4E0D\u662F\u3002</span></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">foo</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">object</span><span style="color:#666666;">;</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// \u6E32\u67D3\u7684\u7ED3\u679C\u4F1A\u662F\u4E00\u4E2A [object Object]\uFF0C\u56E0\u4E3A object.foo \u662F\u4E00\u4E2A ref \u5BF9\u8C61\u3002\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u5C06 foo \u6539\u6210\u9876\u5C42\u5C5E\u6027\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF1A</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">count</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">(</span><span style="color:#4C9A91;">0</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">state</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">reactive</span><span style="color:#666666;">({</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#BD976A;">count</span><span style="color:#666666;">,</span></span>
<span class="line"><span style="color:#666666;">});</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">count</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// { value: 0 }</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">count</span><span style="color:#666666;">.</span><span style="color:#BD976A;">value</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD976A;">count</span><span style="color:#666666;">.</span><span style="color:#BD976A;">value</span><span style="color:#CB7676;">++</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">count</span><span style="color:#666666;">.</span><span style="color:#BD976A;">value</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">state</span><span style="color:#666666;">.</span><span style="color:#BD976A;">count</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// 0</span></span>
<span class="line"><span style="color:#BD976A;">state</span><span style="color:#666666;">.</span><span style="color:#BD976A;">count</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">1</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">count</span><span style="color:#666666;">.</span><span style="color:#BD976A;">value</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">otherCount</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">(</span><span style="color:#4C9A91;">2</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#BD976A;">state</span><span style="color:#666666;">.</span><span style="color:#BD976A;">count</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">otherCount</span><span style="color:#666666;">;</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">state</span><span style="color:#666666;">.</span><span style="color:#BD976A;">count</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// 2</span></span>
<span class="line"><span style="color:#758575DD;">// \u539F\u59CB ref \u73B0\u5728\u5DF2\u7ECF\u548C state.count \u5931\u53BB\u8054\u7CFB</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">count</span><span style="color:#666666;">.</span><span style="color:#BD976A;">value</span><span style="color:#666666;">);</span><span style="color:#DBD7CAEE;"> </span><span style="color:#758575DD;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// \u4E00\u4E2A\u5305\u542B\u5BF9\u8C61\u7C7B\u578B\u503C\u7684 ref \u53EF\u4EE5\u54CD\u5E94\u5F0F\u5730\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\uFF1A</span></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">objectRef</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">({</span><span style="color:#DBD7CAEE;"> </span><span style="color:#B8A965;">count</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">0</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">});</span></span>
<span class="line"><span style="color:#758575DD;">// \u8FD9\u662F\u54CD\u5E94\u5F0F\u7684\u66FF\u6362</span></span>
<span class="line"><span style="color:#BD976A;">objectRef</span><span style="color:#666666;">.</span><span style="color:#BD976A;">value</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#B8A965;">count</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">1</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">// \u4F7F\u7528 reactive \u4F1A\u4E22\u5931\u54CD\u5E94\u5F0F ==\u300B \u201C\u66FF\u6362\u201D\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61\uFF0C\u56E0\u4E3A\u8FD9\u5C06\u5BFC\u81F4\u5BF9\u521D\u59CB\u5F15\u7528\u7684\u54CD\u5E94\u6027\u8FDE\u63A5\u4E22\u5931\uFF1A</span></span>
<span class="line"><span style="color:#CB7676;">let</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">state</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">reactive</span><span style="color:#666666;">({</span><span style="color:#DBD7CAEE;"> </span><span style="color:#B8A965;">count</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">0</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">});</span></span>
<span class="line"><span style="color:#758575DD;">// \u4E0A\u9762\u7684\u5F15\u7528 ({ count: 0 }) \u5C06\u4E0D\u518D\u88AB\u8FFD\u8E2A\uFF08\u54CD\u5E94\u6027\u8FDE\u63A5\u5DF2\u4E22\u5931\uFF01\uFF09</span></span>
<span class="line"><span style="color:#BD976A;">state</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">reactive</span><span style="color:#666666;">({</span><span style="color:#DBD7CAEE;"> </span><span style="color:#B8A965;">count</span><span style="color:#666666;">:</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">1</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">books</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">reactive</span><span style="color:#666666;">([</span><span style="color:#80A665;">ref</span><span style="color:#666666;">(</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#C98A7D;">Vue 3 Guide</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#666666;">)]);</span></span>
<span class="line"><span style="color:#758575DD;">// \u8FD9\u91CC\u9700\u8981 .value</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">books</span><span style="color:#666666;">[</span><span style="color:#4C9A91;">0</span><span style="color:#666666;">].</span><span style="color:#BD976A;">value</span><span style="color:#666666;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CB7676;">const</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">map</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">=</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">reactive</span><span style="color:#666666;">(</span><span style="color:#CB7676;">new</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">Map</span><span style="color:#666666;">([[</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#C98A7D;">count</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#666666;">,</span><span style="color:#DBD7CAEE;"> </span><span style="color:#80A665;">ref</span><span style="color:#666666;">(</span><span style="color:#4C9A91;">0</span><span style="color:#666666;">)]]));</span></span>
<span class="line"><span style="color:#758575DD;">// \u8FD9\u91CC\u9700\u8981 .value</span></span>
<span class="line"><span style="color:#BD976A;">console</span><span style="color:#666666;">.</span><span style="color:#80A665;">log</span><span style="color:#666666;">(</span><span style="color:#BD976A;">map</span><span style="color:#666666;">.</span><span style="color:#80A665;">get</span><span style="color:#666666;">(</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#C98A7D;">count</span><span style="color:#C98A7DAA;">&quot;</span><span style="color:#666666;">).</span><span style="color:#BD976A;">value</span><span style="color:#666666;">);</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">script</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&lt;</span><span style="color:#4D9375;">div</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#758575DD;">&lt;!-- \u65E0\u9700 .value --&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#666666;">{{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">count</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}}</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#758575DD;">&lt;!-- \u89E3\u6784object\uFF0C\u624D\u53EF\u4EE5\u6B63\u786E\u6E32\u67D3\uFF0C\u6E32\u67D3\u7ED3\u679C\u4E3A2 --&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">    </span><span style="color:#666666;">{{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">foo</span><span style="color:#DBD7CAEE;"> </span><span style="color:#CB7676;">+</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4C9A91;">1</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}}</span></span>
<span class="line"><span style="color:#DBD7CAEE;">  </span><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">div</span><span style="color:#666666;">&gt;</span></span>
<span class="line"><span style="color:#666666;">&lt;/</span><span style="color:#4D9375;">template</span><span style="color:#666666;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">script</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">setup</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">ref</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">reactive</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B56959AA;">&quot;</span><span style="color:#B56959;">vue</span><span style="color:#B56959AA;">&quot;</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">object</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#998418;">foo</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">(</span><span style="color:#2F798A;">1</span><span style="color:#999999;">)</span><span style="color:#393A34;"> </span><span style="color:#999999;">};</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// foo \u662F\u9876\u5C42\u5C5E\u6027\uFF0C\u4F46 object.foo \u4E0D\u662F\u3002</span></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">foo</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">object</span><span style="color:#999999;">;</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// \u6E32\u67D3\u7684\u7ED3\u679C\u4F1A\u662F\u4E00\u4E2A [object Object]\uFF0C\u56E0\u4E3A object.foo \u662F\u4E00\u4E2A ref \u5BF9\u8C61\u3002\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u5C06 foo \u6539\u6210\u9876\u5C42\u5C5E\u6027\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF1A</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">count</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">(</span><span style="color:#2F798A;">0</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">state</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">reactive</span><span style="color:#999999;">({</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#B07D48;">count</span><span style="color:#999999;">,</span></span>
<span class="line"><span style="color:#999999;">});</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">count</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// { value: 0 }</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">count</span><span style="color:#999999;">.</span><span style="color:#B07D48;">value</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B07D48;">count</span><span style="color:#999999;">.</span><span style="color:#B07D48;">value</span><span style="color:#AB5959;">++</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">count</span><span style="color:#999999;">.</span><span style="color:#B07D48;">value</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">state</span><span style="color:#999999;">.</span><span style="color:#B07D48;">count</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// 0</span></span>
<span class="line"><span style="color:#B07D48;">state</span><span style="color:#999999;">.</span><span style="color:#B07D48;">count</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">1</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">count</span><span style="color:#999999;">.</span><span style="color:#B07D48;">value</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">otherCount</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">(</span><span style="color:#2F798A;">2</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#B07D48;">state</span><span style="color:#999999;">.</span><span style="color:#B07D48;">count</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">otherCount</span><span style="color:#999999;">;</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">state</span><span style="color:#999999;">.</span><span style="color:#B07D48;">count</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// 2</span></span>
<span class="line"><span style="color:#A0ADA0;">// \u539F\u59CB ref \u73B0\u5728\u5DF2\u7ECF\u548C state.count \u5931\u53BB\u8054\u7CFB</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">count</span><span style="color:#999999;">.</span><span style="color:#B07D48;">value</span><span style="color:#999999;">);</span><span style="color:#393A34;"> </span><span style="color:#A0ADA0;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// \u4E00\u4E2A\u5305\u542B\u5BF9\u8C61\u7C7B\u578B\u503C\u7684 ref \u53EF\u4EE5\u54CD\u5E94\u5F0F\u5730\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\uFF1A</span></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">objectRef</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">({</span><span style="color:#393A34;"> </span><span style="color:#998418;">count</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">0</span><span style="color:#393A34;"> </span><span style="color:#999999;">});</span></span>
<span class="line"><span style="color:#A0ADA0;">// \u8FD9\u662F\u54CD\u5E94\u5F0F\u7684\u66FF\u6362</span></span>
<span class="line"><span style="color:#B07D48;">objectRef</span><span style="color:#999999;">.</span><span style="color:#B07D48;">value</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#998418;">count</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">1</span><span style="color:#393A34;"> </span><span style="color:#999999;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">// \u4F7F\u7528 reactive \u4F1A\u4E22\u5931\u54CD\u5E94\u5F0F ==\u300B \u201C\u66FF\u6362\u201D\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5BF9\u8C61\uFF0C\u56E0\u4E3A\u8FD9\u5C06\u5BFC\u81F4\u5BF9\u521D\u59CB\u5F15\u7528\u7684\u54CD\u5E94\u6027\u8FDE\u63A5\u4E22\u5931\uFF1A</span></span>
<span class="line"><span style="color:#AB5959;">let</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">state</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">reactive</span><span style="color:#999999;">({</span><span style="color:#393A34;"> </span><span style="color:#998418;">count</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">0</span><span style="color:#393A34;"> </span><span style="color:#999999;">});</span></span>
<span class="line"><span style="color:#A0ADA0;">// \u4E0A\u9762\u7684\u5F15\u7528 ({ count: 0 }) \u5C06\u4E0D\u518D\u88AB\u8FFD\u8E2A\uFF08\u54CD\u5E94\u6027\u8FDE\u63A5\u5DF2\u4E22\u5931\uFF01\uFF09</span></span>
<span class="line"><span style="color:#B07D48;">state</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">reactive</span><span style="color:#999999;">({</span><span style="color:#393A34;"> </span><span style="color:#998418;">count</span><span style="color:#999999;">:</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">1</span><span style="color:#393A34;"> </span><span style="color:#999999;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">books</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">reactive</span><span style="color:#999999;">([</span><span style="color:#59873A;">ref</span><span style="color:#999999;">(</span><span style="color:#B56959AA;">&quot;</span><span style="color:#B56959;">Vue 3 Guide</span><span style="color:#B56959AA;">&quot;</span><span style="color:#999999;">)]);</span></span>
<span class="line"><span style="color:#A0ADA0;">// \u8FD9\u91CC\u9700\u8981 .value</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">books</span><span style="color:#999999;">[</span><span style="color:#2F798A;">0</span><span style="color:#999999;">].</span><span style="color:#B07D48;">value</span><span style="color:#999999;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#AB5959;">const</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">map</span><span style="color:#393A34;"> </span><span style="color:#999999;">=</span><span style="color:#393A34;"> </span><span style="color:#59873A;">reactive</span><span style="color:#999999;">(</span><span style="color:#AB5959;">new</span><span style="color:#393A34;"> </span><span style="color:#59873A;">Map</span><span style="color:#999999;">([[</span><span style="color:#B56959AA;">&quot;</span><span style="color:#B56959;">count</span><span style="color:#B56959AA;">&quot;</span><span style="color:#999999;">,</span><span style="color:#393A34;"> </span><span style="color:#59873A;">ref</span><span style="color:#999999;">(</span><span style="color:#2F798A;">0</span><span style="color:#999999;">)]]));</span></span>
<span class="line"><span style="color:#A0ADA0;">// \u8FD9\u91CC\u9700\u8981 .value</span></span>
<span class="line"><span style="color:#B07D48;">console</span><span style="color:#999999;">.</span><span style="color:#59873A;">log</span><span style="color:#999999;">(</span><span style="color:#B07D48;">map</span><span style="color:#999999;">.</span><span style="color:#59873A;">get</span><span style="color:#999999;">(</span><span style="color:#B56959AA;">&quot;</span><span style="color:#B56959;">count</span><span style="color:#B56959AA;">&quot;</span><span style="color:#999999;">).</span><span style="color:#B07D48;">value</span><span style="color:#999999;">);</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">script</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#A0ADA0;">&lt;!-- \u65E0\u9700 .value --&gt;</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#999999;">{{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">count</span><span style="color:#393A34;"> </span><span style="color:#999999;">}}</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#A0ADA0;">&lt;!-- \u89E3\u6784object\uFF0C\u624D\u53EF\u4EE5\u6B63\u786E\u6E32\u67D3\uFF0C\u6E32\u67D3\u7ED3\u679C\u4E3A2 --&gt;</span></span>
<span class="line"><span style="color:#393A34;">    </span><span style="color:#999999;">{{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">foo</span><span style="color:#393A34;"> </span><span style="color:#AB5959;">+</span><span style="color:#393A34;"> </span><span style="color:#2F798A;">1</span><span style="color:#393A34;"> </span><span style="color:#999999;">}}</span></span>
<span class="line"><span style="color:#393A34;">  </span><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">div</span><span style="color:#999999;">&gt;</span></span>
<span class="line"><span style="color:#999999;">&lt;/</span><span style="color:#1E754F;">template</span><span style="color:#999999;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,5),e=[p];function c(t,r,y,A,D,B){return a(),n("div",null,e)}const C=s(o,[["render",c]]);export{E as __pageData,C as default};
