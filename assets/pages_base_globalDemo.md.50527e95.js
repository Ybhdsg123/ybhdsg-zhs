import{_ as l,h as p,o as e,c as t,b as s,g as c,i as o,a}from"./app.3b042b83.js";const x=JSON.parse('{"title":"node.js(http://www.nodejs.com.cn/7-days-nodejs/#2.5.5)","description":"","frontmatter":{},"headers":[{"level":2,"title":"!. process","slug":"process","link":"#process","children":[]},{"level":2,"title":"1. \u57FA\u672C\u4FE1\u606F","slug":"_1-\u57FA\u672C\u4FE1\u606F","link":"#_1-\u57FA\u672C\u4FE1\u606F","children":[]},{"level":2,"title":"2. \u6A21\u5757\u8DEF\u5F84\u89E3\u6790\u89C4\u5219","slug":"_2-\u6A21\u5757\u8DEF\u5F84\u89E3\u6790\u89C4\u5219","link":"#_2-\u6A21\u5757\u8DEF\u5F84\u89E3\u6790\u89C4\u5219","children":[]},{"level":2,"title":"3. \u5305package","slug":"_3-\u5305package","link":"#_3-\u5305package","children":[]},{"level":2,"title":"4. fs\u6A21\u5757","slug":"_4-fs\u6A21\u5757","link":"#_4-fs\u6A21\u5757","children":[]},{"level":2,"title":"5. path\u6A21\u5757","slug":"_5-path\u6A21\u5757","link":"#_5-path\u6A21\u5757","children":[]}],"relativePath":"pages/base/globalDemo.md"}'),r={name:"pages/base/globalDemo.md"},D=a(`<h1 id="node-js-http-www-nodejs-com-cn-7-days-nodejs-2-5-5" tabindex="-1">node.js(<a href="http://www.nodejs.com.cn/7-days-nodejs/#2.5.5" target="_blank" rel="noreferrer">http://www.nodejs.com.cn/7-days-nodejs/#2.5.5</a>) <a class="header-anchor" href="#node-js-http-www-nodejs-com-cn-7-days-nodejs-2-5-5" aria-hidden="true">#</a></h1><h2 id="process" tabindex="-1">!. <code>process</code> <a class="header-anchor" href="#process" aria-hidden="true">#</a></h2><ul><li><code>process</code>\uFF1A\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\uFF0C\u63D0\u4F9B\u4E86\u6709\u5173\u5F53\u524D Node.js \u8FDB\u7A0B\u7684\u4FE1\u606F\u5E76\u5BF9\u5176\u8FDB\u884C\u63A7\u5236</li><li>\u7531\u4E8E JavaScript \u662F\u4E00\u4E2A\u5355\u7EBF\u7A0B\u8BED\u8A00\uFF0C\u6240\u4EE5\u901A\u8FC7 node xxx \u542F\u52A8\u4E00\u4E2A\u6587\u4EF6\u540E\uFF0C\u53EA\u6709\u4E00\u6761\u4E3B\u7EBF\u7A0B</li></ul><details class="details custom-block"><summary><code>process</code>\u5E38\u89C1\u5C5E\u6027</summary><ul><li>p<wbr>rocess.env\uFF1A\u73AF\u5883\u53D8\u91CF\uFF0C\u4F8B\u5982\u901A\u8FC7 \`p<wbr>rocess.env.NODE_ENV \u83B7\u53D6\u4E0D\u540C\u73AF\u5883\u9879\u76EE\u914D\u7F6E\u4FE1\u606F</li><li>process.nextTick\uFF1A\u8FD9\u4E2A\u5728\u8C08\u53CA EventLoop \u65F6\u7ECF\u5E38\u4E3A\u4F1A\u63D0\u5230</li><li>process.pid\uFF1A\u83B7\u53D6\u5F53\u524D\u8FDB\u7A0B id</li><li>process.ppid\uFF1A\u5F53\u524D\u8FDB\u7A0B\u5BF9\u5E94\u7684\u7236\u8FDB\u7A0B</li><li>process.cwd()\uFF1A\u83B7\u53D6\u5F53\u524D\u8FDB\u7A0B\u5DE5\u4F5C\u76EE\u5F55\uFF0C</li><li>process.platform\uFF1A\u83B7\u53D6\u5F53\u524D\u8FDB\u7A0B\u8FD0\u884C\u7684\u64CD\u4F5C\u7CFB\u7EDF\u5E73\u53F0</li><li>process.uptime()\uFF1A\u5F53\u524D\u8FDB\u7A0B\u5DF2\u8FD0\u884C\u65F6\u95F4\uFF0C\u4F8B\u5982\uFF1Apm2 \u5B88\u62A4\u8FDB\u7A0B\u7684 uptime \u503C</li><li>\u8FDB\u7A0B\u4E8B\u4EF6\uFF1Aprocess.on(\u2018uncaughtException\u2019,cb) \u6355\u83B7\u5F02\u5E38\u4FE1\u606F\u3001 process.on(\u2018exit\u2019,cb\uFF09\u8FDB\u7A0B\u63A8\u51FA\u76D1\u542C</li><li>\u4E09\u4E2A\u6807\u51C6\u6D41\uFF1Aprocess.stdout \u6807\u51C6\u8F93\u51FA\u3001 process.stdin \u6807\u51C6\u8F93\u5165\u3001 process.stderr \u6807\u51C6\u9519\u8BEF\u8F93\u51FA</li><li>process.title \u6307\u5B9A\u8FDB\u7A0B\u540D\u79F0\uFF0C\u6709\u7684\u65F6\u5019\u9700\u8981\u7ED9\u8FDB\u7A0B\u6307\u5B9A\u4E00\u4E2A\u540D\u79F0</li></ul></details><div class="tip custom-block"><p class="custom-block-title"><code>process</code>\u5E38\u89C1\u65B9\u6CD5</p><ul><li><p><code>process.argv()</code>\uFF1A\u5728\u7EC8\u7AEF\u901A\u8FC7 node \u547D\u4EE4\u6267\u884C\u65F6\uFF0C\u83B7\u53D6\u547D\u4EE4\u884C\u53C2\u6570\uFF0C\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A\u6570\u7EC4</p><pre><code>- [0] node\u8DEF\u5F84
- [1] \u5F53\u524D\u6267\u884C\u7684\u6587\u4EF6\u8DEF\u5F84
- 2-n : \u53C2\u6570
</code></pre></li><li><p><code>process.cwd()</code>\uFF1A\u8FD4\u56DE\u5F53\u524D Node \u8FDB\u7A0B\u6267\u884C\u7684\u76EE\u5F55</p></li></ul></div><h2 id="_1-\u57FA\u672C\u4FE1\u606F" tabindex="-1">1. \u57FA\u672C\u4FE1\u606F <a class="header-anchor" href="#_1-\u57FA\u672C\u4FE1\u606F" aria-hidden="true">#</a></h2><ul><li><p><strong><code>NodeJS</code>\u662F\u4E00\u4E2A JS \u811A\u672C\u89E3\u6790\u5668</strong>\uFF0C\u4EFB\u4F55\u64CD\u4F5C\u7CFB\u7EDF\u4E0B\u5B89\u88C5<code>NodeJS</code>\u672C\u8D28\u4E0A\u505A\u7684\u4E8B\u60C5\u90FD\u662F<strong>\u628A NodeJS \u6267\u884C\u7A0B\u5E8F\u590D\u5236\u5230\u4E00\u4E2A\u76EE\u5F55</strong>\uFF0C\u7136\u540E<strong>\u4FDD\u8BC1\u8FD9\u4E2A\u76EE\u5F55\u5728\u7CFB\u7EDF <code>PATH</code> \u73AF\u5883\u53D8\u91CF\u4E0B</strong>\uFF0C\u4EE5\u4FBF\u7EC8\u7AEF\u4E0B\u53EF\u4EE5\u4F7F\u7528 node \u547D\u4EE4\u3002</p></li><li><p>\u7EC8\u7AEF\u4E0B\u76F4\u63A5\u8F93\u5165 node \u547D\u4EE4\u53EF\u8FDB\u5165\u547D\u4EE4\u4EA4\u4E92\u6A21\u5F0F\uFF0C\u5F88\u9002\u5408\u7528\u6765\u6D4B\u8BD5\u4E00\u4E9B JS \u4EE3\u7801\u7247\u6BB5\uFF0C\u6BD4\u5982\u6B63\u5219\u8868\u8FBE\u5F0F\u3002</p></li><li><p>NodeJS \u4F7F\u7528 CMD \u6A21\u5757\u7CFB\u7EDF\uFF0C\u4E3B\u6A21\u5757\u4F5C\u4E3A\u7A0B\u5E8F\u5165\u53E3\u70B9\uFF0C<strong>\u6240\u6709\u6A21\u5757\u5728\u6267\u884C\u8FC7\u7A0B\u4E2D\u53EA\u521D\u59CB\u5316\u4E00\u6B21</strong>\u3002</p></li><li><p>\u9664\u975E JS \u6A21\u5757\u4E0D\u80FD\u6EE1\u8DB3\u9700\u6C42\uFF0C\u5426\u5219\u4E0D\u8981\u8F7B\u6613\u4F7F\u7528\u4E8C\u8FDB\u5236\u6A21\u5757\uFF0C\u5426\u5219\u4F60\u7684\u7528\u6237\u4F1A\u53EB\u82E6\u8FDE\u5929\u3002</p></li></ul><h2 id="_2-\u6A21\u5757\u8DEF\u5F84\u89E3\u6790\u89C4\u5219" tabindex="-1">2. \u6A21\u5757\u8DEF\u5F84\u89E3\u6790\u89C4\u5219 <a class="header-anchor" href="#_2-\u6A21\u5757\u8DEF\u5F84\u89E3\u6790\u89C4\u5219" aria-hidden="true">#</a></h2><ul><li><strong>\u5185\u7F6E\u6A21\u5757</strong>\uFF1A\u4E0D\u505A\u8DEF\u5F84\u89E3\u6790\uFF0C<strong>\u76F4\u63A5\u8FD4\u56DE\u5185\u90E8\u6A21\u5757\u7684\u5BFC\u51FA\u5BF9\u8C61</strong>\uFF0C\u4F8B\u5982<code>require(fs)</code></li><li><code>node-modules</code>\u76EE\u5F55\uFF1A\u5728\u6A21\u5757<code>/home/user/hello.js</code>\u4E2D\u4F7F\u7528<code>require(&#39;foo/bar&#39;)</code>\uFF0C\u90A3\u4E48\u4F1A\u4F9D\u6B21\u67E5\u627E<div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">home</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">modules</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">bar</span></span>
<span class="line"><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">modules</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">bar</span></span>
<span class="line"><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">modules</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">bar</span></span>
<span class="line"></span></code></pre></div></li><li><code>NODE_PATH</code>\u53D8\u91CF\uFF1A<code>NodeJs</code>\u5141\u8BB8\u901A\u8FC7<code>NODE_PATH</code>\u73AF\u5883\u53D8\u91CF\u6765\u8BBE\u7F6E\u641C\u7D22\u8DEF\u5F84\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u4E00\u4E2A\u6216\u8005\u591A\u4E2A\u76EE\u5F55\uFF0C\u5728<code>linux</code>\u4E0B\u4F7F\u7528<code>:</code>\uFF0C\u5728<code>window</code>\u4E0B\u4F7F\u7528<code>;</code>\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u73AF\u5883\u53D8\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">NODE_PATH </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home/user/lib:/home/lib</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;">// \u4F7F\u7528</span></span>
<span class="line"><span style="color:#82AAFF;">requir</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo / bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u67E5\u627E\u8DEF\u5F84</span></span>
<span class="line"><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home/user/lib/foo/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home/lib/foo/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="_3-\u5305package" tabindex="-1">3. \u5305<code>package</code> <a class="header-anchor" href="#_3-\u5305package" aria-hidden="true">#</a></h2><ul><li>js \u6A21\u5757\u7684\u57FA\u672C\u5355\u4F4D\u662F js \u6587\u4EF6\uFF0C\u591A\u4E2A\u5B50\u6A21\u5757\u7EC4\u6210\u5927\u6A21\u5757\uFF0C\u79F0\u4E3A\u5305\uFF0C\u5E76\u628A\u5B50\u6A21\u5757\u653E\u5728\u540C\u4E00\u76EE\u5F55\u4E2D</li><li>\u5F53\u6A21\u5757\u7684\u6587\u4EF6\u540D\u4E3A<code>index.js</code>\u65F6\uFF0C<strong>\u52A0\u8F7D\u6A21\u5757\u65F6\u53EF\u4EE5\u4F7F\u7528\u6A21\u5757\u6240\u5728\u76EE\u5F55\u7684\u8DEF\u5F84\u4EE3\u66FF\u6A21\u5757\u6587\u4EF6\u8DEF\u5F84</strong>\uFF0C\u4E0B\u9762\u4E24\u6761\u8BED\u53E5\u7B49\u4EF7</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> cat </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home/user/lib/cat</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> cat </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home/user/lib/cat/index</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><ul><li><code>package.json</code>\u6587\u4EF6\uFF0C\u81EA\u5B9A\u4E49\u5165\u53E3\u6A21\u5757\u7684<strong>\u6587\u4EF6\u540D</strong>\u548C<strong>\u5165\u53E3\u4F4D\u7F6E</strong>\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>require(&quot;/home/user/lib/cat&quot;)</code>\u6765\u52A0\u8F7D\u6A21\u5757</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// package.json</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cat</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u5305\u540D\uFF0C\u5728npm\u4E0A\u5FC5\u987B\u552F\u4E00</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">main</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./lib/main.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// \u5165\u53E3\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="_4-fs\u6A21\u5757" tabindex="-1">4. <code>fs</code>\u6A21\u5757 <a class="header-anchor" href="#_4-fs\u6A21\u5757" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title"><code>fs</code>\u6A21\u5757</p><ul><li>\u5F15\u5165 <code> const fs = require(&#39;fs&#39;)</code></li><li><code>fs.readFileSync(\u6587\u4EF6\u8DEF\u5F84,options)</code> \uFF1A\u4ECE\u6E90\u8DEF\u5F84\u8BFB\u53D6\u6587\u4EF6\u5185\u5BB9</li><li><code>fs.writeFileSync(\u76EE\u6807\u6587\u4EF6\u8DEF\u5F84\uFF08\u65E0\u65B0\u5EFA\uFF09</code>,\u5199\u5165\u6587\u4EF6,options)\uFF1A\u5199\u5165\u6587\u4EF6</li><li><code>fs.createReadStream()</code>\uFF1A\u521B\u5EFA\u4E00\u4E2A\u6E90\u6587\u4EF6\u7684\u53EA\u8BFB\u7684\u6570\u636E\u6D41</li><li><code>fs.createWriteStream()</code>\uFF1A\u521B\u5EFA\u4E00\u4E2A\u76EE\u6807\u6587\u4EF6\u7684\u53EA\u5199\u6570\u636E\u6D41</li><li><code>.pipe</code>\u8FDB\u884C\u8FDE\u63A5\uFF1A<code>js fs.createReadStream(src).pipe(fs.createWriteStream(dst));</code></li><li><strong>\u6587\u4EF6\u5C5E\u6027\u8BFB\u5199</strong>\u3002</li></ul><p>\u5176\u4E2D\u5E38\u7528\u7684\u6709<code>fs.stat</code>\u3001<code>fs.chmod</code>\u3001<code>fs.chown</code>\u7B49\u7B49\u3002</p><ul><li><strong>\u6587\u4EF6\u5185\u5BB9\u8BFB\u5199</strong>\u3002</li></ul><p>\u5176\u4E2D\u5E38\u7528\u7684\u6709<code>fs.readFile</code>\u3001<code>fs.readdir</code>\u3001<code>fs.writeFile</code>\u3001<code>fs.mkdir</code>\u7B49\u7B49\u3002</p><ul><li><strong>\u5E95\u5C42\u6587\u4EF6\u64CD\u4F5C</strong>\u3002</li></ul><p>\u5176\u4E2D\u5E38\u7528\u7684\u6709<code>fs.open</code>\u3001<code>fs.read</code>\u3001<code>fs.write</code>\u3001<code>fs.close</code>\u7B49\u7B49\u3002</p></div><h2 id="_5-path\u6A21\u5757" tabindex="-1">5. <code>path</code>\u6A21\u5757 <a class="header-anchor" href="#_5-path\u6A21\u5757" aria-hidden="true">#</a></h2>`,18),y={class:"tip custom-block"},i=s("p",{class:"custom-block-title"},"path",-1),d=s("p",null,[s("code",null,"path.normalize()"),o(": \u5C06\u4F20\u5165\u7684\u8DEF\u5F84\u8F6C\u6362\u4E3A"),s("strong",null,"\u6807\u51C6\u8DEF\u5F84"),o("\uFF0C"),s("strong",null,"\u89E3\u6790"),o("\u8DEF\u5F84\u4E2D\u7684"),s("code",null,"."),o("\u4E0E"),s("code",null,".."),o("\uFF0C\u8FD8\u80FD"),s("strong",null,"\u53BB\u6389"),o("\u591A\u4F59\u7684\u659C\u6760\u3002")],-1),F=s("strong",null,[o("Windows \u7CFB\u7EDF\u4E0B\u662F"),s("code",null,"\\")],-1),C=s("strong",null,[o("Linux \u7CFB\u7EDF\u4E0B\u662F"),s("code",null,"/")],-1),A=s("code",null,"/",-1),u=s("strong",null,[s("code",null,".replace(/\\\\/g, '/')")],-1),h=a(`<div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">normalize</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo//baz//../bar</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">==&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo/bar</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div>`,1),g=a(`<li><p><code>path.join()</code>\uFF1A\u5C06\u4F20\u5165\u7684\u591A\u4E2A\u8DEF\u5F84\u62FC\u63A5\u4E3A\u6807\u51C6\u8DEF\u5F84\u3002\u8BE5\u65B9\u6CD5\u53EF\u907F\u514D\u624B\u5DE5\u62FC\u63A5\u8DEF\u5F84\u5B57\u7B26\u4E32\u7684\u7E41\u7410\uFF0C\u5E76\u4E14\u80FD\u5728\u4E0D\u540C\u7CFB\u7EDF\u4E0B\u6B63\u786E\u4F7F\u7528\u76F8\u5E94\u7684\u8DEF\u5F84\u5206\u9694\u7B26.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">baz/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &quot;foo/bar&quot;</span></span>
<span class="line"></span></code></pre></div></li><li><p><code>path.extname()</code>\uFF1A<strong>\u8FD4\u56DE <code>path</code> \u7684\u6269\u5C55\u540D</strong>\uFF0C\u5373 <code>path</code> \u7684\u6700\u540E\u4E00\u90E8\u5206\u4E2D\u4ECE\u6700\u540E\u4E00\u6B21\u51FA\u73B0\u7684 .\uFF08\u53E5\u70B9\uFF09\u5B57\u7B26\u5230\u5B57\u7B26\u4E32\u7684\u7ED3\u5C3E</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo/bar.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &quot;.js&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.html</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;.html&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;.&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.index</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.index.md</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;.md&#39;</span></span>
<span class="line"></span></code></pre></div></li><li><p><code>path.resolve()</code>\uFF1A \u8DEF\u5F84\u6216\u8DEF\u5F84\u7247\u6BB5\u7684\u5E8F\u5217\u89E3\u6790\u4E3A<strong>\u7EDD\u5BF9\u8DEF\u5F84</strong>\u3002<strong>\u7ED9\u5B9A\u7684\u8DEF\u5F84\u5E8F\u5217\u4ECE\u53F3\u5230\u5DE6\u5904\u7406\uFF0C\u6BCF\u4E2A\u540E\u7EED\u7684 path \u4F1A\u88AB\u8FFD\u52A0\u5230\u524D\u9762\uFF0C\u76F4\u5230\u6784\u5EFA\u7EDD\u5BF9\u8DEF\u5F84\u3002</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u56E0\u4E3A baz \u4E0D\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u4F46\u662F /bar/baz \u662F</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/foo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">baz</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;/bar/baz&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/foo/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./baz</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;/foo/bar/baz&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/foo/bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/tmp/file/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// =&gt; &#39;/tmp/file&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">wwwroot</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">static_files/png/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../gif/image.gif</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;">// \u5982\u679C\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55\u662F /home/myself/node\uFF0C</span></span>
<span class="line"><span style="color:#676E95;">// \u5219\u8FD4\u56DE &#39;/home/myself/node/wwwroot/static_files/gif/image.gif&#39;</span></span>
<span class="line"></span></code></pre></div></li>`,3);function _(m,b,q,f,E,j){const n=p("MyText");return e(),t("div",null,[D,s("div",y,[i,s("ul",null,[s("li",null,[d,c(n,{text:"\u6CE8\u610F\uFF1A"}),o("\u6807\u51C6\u5316\u4E4B\u540E\u7684\u8DEF\u5F84\u91CC\u7684\u659C\u6760\u5728 "),F,o(" \uFF0C\u800C\u5728"),C,o("\u3002\u5982\u679C\u60F3\u4FDD\u8BC1\u4EFB\u4F55\u7CFB\u7EDF\u4E0B\u90FD\u4F7F\u7528"),A,o("\u4F5C\u4E3A\u8DEF\u5F84\u5206\u9694\u7B26\u7684\u8BDD\uFF0C\u9700\u8981\u7528 "),u,o(" \u518D\u66FF\u6362\u4E00\u4E0B\u6807\u51C6\u8DEF\u5F84\u3002"),h]),g])])])}const k=l(r,[["render",_]]);export{x as __pageData,k as default};