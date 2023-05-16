import{_ as e,o,c as i,a as r}from"./app.c8e9b744.js";const v=JSON.parse('{"title":"vue2 \u76F8\u5173","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u4EC0\u4E48\u662F MVVM\uFF1F","slug":"_1-\u4EC0\u4E48\u662F-mvvm","link":"#_1-\u4EC0\u4E48\u662F-mvvm","children":[]},{"level":2,"title":"2. MVVM \u7684\u4F18\u7F3A\u70B9\u6709\u54EA\u4E9B\uFF1F","slug":"_2-mvvm-\u7684\u4F18\u7F3A\u70B9\u6709\u54EA\u4E9B","link":"#_2-mvvm-\u7684\u4F18\u7F3A\u70B9\u6709\u54EA\u4E9B","children":[]},{"level":2,"title":"3. \u8C08\u8C08\u5BF9 Vue \u751F\u547D\u5468\u671F\u7684\u7406\u89E3\uFF1F","slug":"_3-\u8C08\u8C08\u5BF9-vue-\u751F\u547D\u5468\u671F\u7684\u7406\u89E3","link":"#_3-\u8C08\u8C08\u5BF9-vue-\u751F\u547D\u5468\u671F\u7684\u7406\u89E3","children":[]},{"level":2,"title":"5. Vue \u7EC4\u4EF6\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u901A\u4FE1\uFF1F","slug":"_5-vue-\u7EC4\u4EF6\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u901A\u4FE1","link":"#_5-vue-\u7EC4\u4EF6\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u901A\u4FE1","children":[]},{"level":2,"title":"6. Vue \u53CC\u5411\u7ED1\u5B9A\u539F\u7406\uFF1F","slug":"_6-vue-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406","link":"#_6-vue-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406","children":[]},{"level":2,"title":"7. Object.defineProperty \u548C Proxy \u7684\u4F18\u7F3A\u70B9\uFF1F","slug":"_7-object-defineproperty-\u548C-proxy-\u7684\u4F18\u7F3A\u70B9","link":"#_7-object-defineproperty-\u548C-proxy-\u7684\u4F18\u7F3A\u70B9","children":[]},{"level":2,"title":"8. \u5982\u4F55\u7406\u89E3 Vue \u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF\uFF1F","slug":"_8-\u5982\u4F55\u7406\u89E3-vue-\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF","link":"#_8-\u5982\u4F55\u7406\u89E3-vue-\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF","children":[{"level":3,"title":"\u57FA\u672C\u539F\u7406","slug":"\u57FA\u672C\u539F\u7406","link":"#\u57FA\u672C\u539F\u7406","children":[]}]}],"relativePath":"pages/interviews/vue.md"}'),t={name:"pages/interviews/vue.md"},d=r('<h1 id="vue2-\u76F8\u5173" tabindex="-1">vue2 \u76F8\u5173 <a class="header-anchor" href="#vue2-\u76F8\u5173" aria-hidden="true">#</a></h1><p><a href="https://mp.weixin.qq.com/s/3KIaI65HqaD2hSM3NMFEOg" target="_blank" rel="noreferrer">vue \u539F\u7406\u9762\u8BD5</a></p><h2 id="_1-\u4EC0\u4E48\u662F-mvvm" tabindex="-1">1. \u4EC0\u4E48\u662F MVVM\uFF1F <a class="header-anchor" href="#_1-\u4EC0\u4E48\u662F-mvvm" aria-hidden="true">#</a></h2><p><strong>Model \u5C42</strong></p><p>\u5BF9\u5E94\u6570\u636E\u5C42\u7684\u57DF\u6A21\u578B\uFF0C\u4E3B\u8981\u7528\u6765\u505A\u57DF\u6A21\u578B\u7684\u540C\u6B65\u3002</p><p>\u901A\u8FC7 <code>Ajax</code>\u3001<code>fetch</code> \u7B49 API \u5B8C\u6210\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u4E1A\u52A1\u6A21\u578B\u7684\u540C\u6B65\u3002</p><p>\u5728\u5206\u5C42\u5173\u7CFB\u4E2D\uFF0C\u5B83\u4E3B\u8981\u2F64\u4E8E\u62BD\u8C61\u51FA ViewModel \u5C42\u4E2D\u89C6\u56FE\u7684 Model\u3002</p><p><strong>View \u5C42</strong></p><p>\u4F5C\u4E3A\u89C6\u56FE\u6A21\u677F\u5B58\u5728\uFF0C\u5176\u5B9E\u5728 MVVM \u4E2D\u6574\u4E2A View \u5C31\u662F\u2F00\u4E2A\u52A8\u6001\u6A21\u677F\u3002</p><p>\u9664\u4E86\u7528\u4E8E\u5B9A\u4E49\u7ED3\u6784\u548C\u5E03\u5C40\u4E4B\u5916\uFF0C\u5B83\u8FD8\u5C55\u793A\u4E86 ViewModel \u5C42\u7684\u6570\u636E\u548C\u72B6\u6001\u3002</p><p>View \u5C42\u5E76\u4E0D\u8D1F\u8D23\u72B6\u6001\u7684\u5B9E\u9645\u5904\u7406\uFF0C\u5B83\u53EA\u662F\u505A\uFF1A\u6570\u636E\u7ED1\u5B9A\u58F0\u660E\u3001 \u6307\u4EE4\u58F0\u660E\u3001 \u4E8B\u4EF6\u7ED1\u5B9A\u58F0\u660E\u3002</p><p><strong>ViewModel \u5C42</strong></p><p>\u8D1F\u8D23\u66B4\u9732\u6570\u636E\u7ED9 View \u5C42\uFF0C\u5E76\u5BF9 View \u5C42\u4E2D\u7684\u6570\u636E\u7ED1\u5B9A\u58F0\u660E\u3001 \u6307\u4EE4\u58F0\u660E\u3001 \u4E8B\u4EF6\u7ED1\u5B9A\u58F0\u660E\u8FDB\u884C\u5B9E\u9645\u7684\u4E1A\u52A1\u903B\u8F91\u3002</p><p>ViewModel \u5E95\u5C42\u4F1A\u505A\u597D\u7ED1\u5B9A\u5C5E\u6027\u7684\u76D1\u542C\uFF0C\u5F53 ViewModel \u4E2D\u7684\u6570\u636E\u53D8\u5316\u65F6\uFF0CView \u5C42\u4F1A\u81EA\u52A8\u8FDB\u884C\u66F4\u65B0\uFF1B\u2F7D\u5F53 View \u4E2D\u58F0\u660E\u4E86\u6570\u636E\u7684\u53CC\u5411\u7ED1\u5B9A\uFF08\u8868\u5355\u5143\u7D20\uFF09\uFF0C\u6846\u67B6\u4E5F\u4F1A\u76D1\u542C View \u5C42\uFF08\u8868\u5355\u5143\u7D20\uFF09\u503C\u7684\u53D8\u5316\uFF0C\u2F00\u65E6\u53D8\u5316\uFF0C\u5219 View \u5C42\u7ED1\u5B9A\u7684 ViewModel \u4E2D\u7684\u6570\u636E\u4E5F\u4F1A\u5F97\u5230\u2F83\u52A8\u66F4\u65B0\u3002</p><h2 id="_2-mvvm-\u7684\u4F18\u7F3A\u70B9\u6709\u54EA\u4E9B" tabindex="-1">2. MVVM \u7684\u4F18\u7F3A\u70B9\u6709\u54EA\u4E9B\uFF1F <a class="header-anchor" href="#_2-mvvm-\u7684\u4F18\u7F3A\u70B9\u6709\u54EA\u4E9B" aria-hidden="true">#</a></h2><p><strong>\u4F18\u70B9</strong></p><ol><li>\u5B9E\u73B0\u4E86\u89C6\u56FE\uFF08View\uFF09\u548C\u6A21\u578B\uFF08Model\uFF09\u7684\u5206\u79BB\uFF0C\u964D\u4F4E\u4EE3\u7801\u8026\u5408\u3001\u63D0\u2FBC\u89C6\u56FE\u6216\u903B\u8F91\u7684\u590D\u2F64\u6027</li></ol><blockquote><p>\u2F50\u5982\uFF1AView \u53EF\u4EE5\u72EC\u2F74\u4E8E Model \u53D8\u5316\u548C\u4FEE\u6539\uFF0C\u2F00\u4E2A ViewModel \u53EF\u4EE5\u7ED1\u5B9A\u4E8E\u4E0D\u540C\u7684 &quot;View&quot;\uFF0C\u5F53 View \u53D1\u751F\u53D8\u5316\u65F6 Model \u4E00\u5B9A\u4F1A\u968F\u4E4B\u6539\u53D8\uFF0C\u800C\u5F53 Model \u53D8\u5316\u65F6\u5219 View \u53EF\u4EE5\u4E0D\u53D8\u3002\u6211\u4EEC\u53EF\u4EE5\u628A\u2F00\u4E9B\u89C6\u56FE\u903B\u8F91\u653E\u5728\u2F00\u4E2A ViewModel \u2FA5\uFF0C\u4EE5\u6B64\u8BA9\u591A\u4E2A View \u91CD\u2F64\u8FD9\u6BB5\u89C6\u56FE\u903B\u8F91\u3002</p></blockquote><ol start="2"><li><p>\u63D0\u2FBC\u4E86\u53EF\u6D4B\u8BD5\u6027\uFF1AViewModel \u7684\u5B58\u5728\u53EF\u4EE5\u5E2E\u52A9\u5F00\u53D1\u8005\u66F4\u597D\u5730\u7F16\u5199\u6D4B\u8BD5\u4EE3\u7801</p></li><li><p>\u80FD\u2F83\u52A8\u66F4\u65B0 DOM\uFF1A\u5229\u2F64\u53CC\u5411\u7ED1\u5B9A\uFF0C\u6570\u636E\u66F4\u65B0\u540E\u89C6\u56FE\u2F83\u52A8\u66F4\u65B0\uFF0C\u8BA9\u5F00\u53D1\u8005\u4ECE\u7E41\u7410\u7684\u2F3F\u52A8\u64CD\u4F5C DOM \u4E2D\u89E3\u653E\u51FA\u6765</p></li></ol><p><strong>\u7F3A\u70B9</strong></p><ol><li><p>Bug \u5F88\u96BE\u88AB\u8C03\u8BD5\uFF1A\u56E0\u4E3A\u4F7F\u2F64\u4E86\u53CC\u5411\u7ED1\u5B9A\u7684\u6A21\u5F0F\uFF0C\u5F53\u6211\u4EEC\u770B\u5230\u754C\u2FAF\u53D1\u751F\u5F02\u5E38\u4E86\uFF0C\u6709\u53EF\u80FD\u662F View \u7684\u4EE3\u7801\u4EA7\u751F\u7684 Bug\uFF0C\u4E5F\u6709\u53EF\u80FD\u662F Model \u4EE3\u7801\u7684\u95EE\u9898\u3002\u6570\u636E\u7ED1\u5B9A\u4F7F\u5F97\u2F00\u4E2A\u4F4D\u7F6E\u7684 Bug \u88AB\u5FEB\u901F\u4F20\u9012\u5230\u522B\u7684\u4F4D\u7F6E\uFF0C\u8981\u5B9A\u4F4D\u539F\u59CB\u51FA\u95EE\u9898\u7684\u5730\u2F45\u5C31\u53D8\u5F97\u4E0D\u90A3\u4E48\u5BB9\u6613\u4E86\u3002\u53E6\u5916\uFF0C\u6570\u636E\u7ED1\u5B9A\u7684\u58F0\u660E\u662F\u6307\u4EE4\u5F0F\u5730\u5199\u5728 View \u6A21\u7248\u4E2D\u7684\uFF0C\u5B83\u4EEC\u6CA1\u529E\u6CD5\u6253\u65AD\u70B9\u8FDB\u884C Debug</p></li><li><p>\u5728\u2F00\u4E2A\u2F24\u7684\u6A21\u5757\u4E2D Model \u4E5F\u4F1A\u5F88\u2F24\uFF0C\u867D\u7136\u4F7F\u2F64\u4E0A\u6765\u8BF4\u2F45\u4FBF\u4E86\uFF0C\u4E5F\u80FD\u5F88\u5BB9\u6613\u7684\u4FDD\u8BC1\u4E86\u6570\u636E\u7684\u2F00\u81F4\u6027\uFF0C\u4F46\u5982\u679C\u2ED3\u671F\u6301\u6709\u4E0D\u91CA\u653E\u5185\u5B58\uFF0C\u5C31\u4F1A\u9020\u6210\u66F4\u591A\u7684\u5185\u5B58\u6D88\u8017</p></li><li><p>\u5BF9\u4E8E\u2F24\u578B\u7684\u56FE\u5F62\u5E94\u2F64\u7A0B\u5E8F\uFF0C\u89C6\u56FE\u72B6\u6001\u8F83\u591A\uFF0CViewModel \u7684\u6784\u5EFA\u548C\u7EF4\u62A4\u7684\u6210\u672C\u90FD\u4F1A\u2F50\u8F83\u2FBC</p></li></ol><h2 id="_3-\u8C08\u8C08\u5BF9-vue-\u751F\u547D\u5468\u671F\u7684\u7406\u89E3" tabindex="-1">3. \u8C08\u8C08\u5BF9 Vue \u751F\u547D\u5468\u671F\u7684\u7406\u89E3\uFF1F <a class="header-anchor" href="#_3-\u8C08\u8C08\u5BF9-vue-\u751F\u547D\u5468\u671F\u7684\u7406\u89E3" aria-hidden="true">#</a></h2><p><strong>\u751F\u547D\u5468\u671F\u7684\u6982\u5FF5</strong></p><p>\u6BCF\u4E2A Vue \u5B9E\u4F8B\u90FD\u6709\u2F00\u4E2A\u5B8C\u6574\u7684\u2F63\u547D\u5468\u671F\uFF1A</p><ol><li>\u5F00\u59CB\u521B\u5EFA</li><li>\u521D\u59CB\u5316\u6570\u636E</li><li>\u7F16\u8BD1\u6A21\u7248</li><li>\u6302\u8F7D DOM</li><li>\u6E32\u67D3\u3001\u66F4\u65B0\u6570\u636E =&gt; \u91CD\u65B0\u6E32\u67D3</li><li>\u5378\u8F7D</li></ol><p>\u8FD9\u2F00\u7CFB\u5217\u8FC7\u7A0B\u6211\u4EEC\u79F0\u4E4B\u4E3A Vue \u7684\u2F63\u547D\u5468\u671F\u3002</p><h2 id="_5-vue-\u7EC4\u4EF6\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u901A\u4FE1" tabindex="-1">5. Vue \u7EC4\u4EF6\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u901A\u4FE1\uFF1F <a class="header-anchor" href="#_5-vue-\u7EC4\u4EF6\u4E4B\u95F4\u5982\u4F55\u8FDB\u884C\u901A\u4FE1" aria-hidden="true">#</a></h2><p><strong><code>props</code> \u548C <code>$emit + v-on</code></strong></p><p>\u901A\u8FC7 <code>props</code> \u5C06\u6570\u636E\u5728\u7EC4\u4EF6\u6811\u4E2D\u8FDB\u884C\u2F83\u4E0A\u2F7D\u4E0B\u7684\u4F20\u9012\uFF1B</p><p>\u901A\u8FC7 <code>$emit</code> \u548C <code>v-on</code> \u6765\u4F5C\u4FE1\u606F\u7684\u5411\u4E0A\u4F20\u9012\u3002</p><p><strong>EventBus</strong></p><p>\u53EF\u901A\u8FC7 EventBus \u8FDB\u2F8F\u4FE1\u606F\u7684\u53D1\u5E03\u4E0E\u8BA2\u9605\u3002</p><p><strong>Vuex</strong></p><p>\u5168\u5C40\u72B6\u6001\u7BA1\u7406\u5E93\u3002\u53EF\u901A\u8FC7\u5B83\u6765\u8FDB\u884C\u5168\u5C40\u6570\u636E\u6D41\u7684\u7BA1\u7406\u3002</p><p><strong><code>$attrs</code> \u548C <code>$listeners</code></strong></p><p>\u5728 Vue 2.4 \u7248\u672C\u4E2D\u52A0\u2F0A\u7684 <code>$attrs</code> \u548C <code>$listeners</code> \u53EF\u4EE5\u7528\u6765\u4F5C\u4E3A\u8DE8\u7EA7\u7EC4\u4EF6\u4E4B\u95F4\u7684\u901A\u4FE1\u673A\u5236\u3002</p><p><strong><code>provide</code> \u548C <code>inject</code></strong></p><p>\u7531\u4E8E <code>provide</code> \u548C <code>inject</code> \u53EF\u4EE5\u5141\u8BB8\u2F00\u4E2A\u7956\u5148\u7EC4\u4EF6\u5411\u5B83\u7684\u6240\u6709\u2F26\u5B59\u7EC4\u4EF6\u6CE8\u2F0A\u2F00\u4E2A\u4F9D\u8D56\uFF08\u4E0D\u8BBA\u7EC4\u4EF6\u5C42\u6B21\u6709\u591A\u6DF1\uFF09\uFF0C\u5E76\u5728\u5176\u4E0A\u4E0B\u6E38\u5173\u7CFB\u6210\u2F74\u7684\u65F6\u95F4\u2FA5\u59CB\u7EC8\u2F63\u6548\uFF0C\u56E0\u6B64\u8FD9\u79CD\u673A\u5236\u4E5F\u5C31\u6210\u4E3A\u4E86\u4E00\u79CD\u8DE8\u7EC4\u4EF6\u901A\u4FE1\u7684\u624B\u6BB5\u3002</p><blockquote><p>\u53E6\u5916\u8FD8\u6709\u4E00\u4E9B\u65B9\u5F0F\u4F7F\u7528\u573A\u666F\u6709\u9650\uFF0C\u5728\u6B64\u4E0D\u4ECB\u7ECD\u4E86\u3002</p><p>\u53EF\u4EE5\u9605\u8BFB\u53C2\u8003\u6587\u7AE0\uFF1A<a href="https://juejin.cn/post/6844903887162310669" target="_blank" rel="noreferrer">Vue \u4E2D\u7684 8 \u79CD\u7EC4\u4EF6\u901A\u4FE1\u65B9\u5F0F</a></p></blockquote><h2 id="_6-vue-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406" tabindex="-1">6. Vue \u53CC\u5411\u7ED1\u5B9A\u539F\u7406\uFF1F <a class="header-anchor" href="#_6-vue-\u53CC\u5411\u7ED1\u5B9A\u539F\u7406" aria-hidden="true">#</a></h2><p>\u5728 Vue 2.x \u4E2D\uFF0C\u5229\u2F64\u7684\u662F <code>Object.defineProperty</code> \u53BB\u52AB\u6301\u5BF9\u8C61\u7684\u8BBF\u95EE\u5668\uFF08Getter\u3001Setter\uFF09\uFF0C\u5F53\u5BF9\u8C61\u5C5E\u6027\u503C\u53D1\u2F63\u53D8\u5316\u65F6\u53EF\u83B7\u53D6\u53D8\u5316\uFF0C\u7136\u540E\u6839\u636E\u53D8\u5316\u6765\u4F5C\u540E\u7EED\u54CD\u5E94\uFF1B</p><p>\u5728 Vue 3.0 \u4E2D\uFF0C\u5219\u662F\u901A\u8FC7 <code>Proxy</code> \u4EE3\u7406\u5BF9\u8C61\u8FDB\u2F8F\u7C7B\u4F3C\u7684\u64CD\u4F5C\u3002</p><h2 id="_7-object-defineproperty-\u548C-proxy-\u7684\u4F18\u7F3A\u70B9" tabindex="-1">7. Object.defineProperty \u548C Proxy \u7684\u4F18\u7F3A\u70B9\uFF1F <a class="header-anchor" href="#_7-object-defineproperty-\u548C-proxy-\u7684\u4F18\u7F3A\u70B9" aria-hidden="true">#</a></h2><p><strong>Proxy</strong></p><ul><li><p>\u53EF\u4EE5\u76F4\u63A5\u76D1\u542C\u6574\u4E2A\u5BF9\u8C61\uFF0C\u2F7D\u2FAE\u662F\u5BF9\u8C61\u7684\u5C5E\u6027</p></li><li><p>\u53EF\u4EE5\u76F4\u63A5\u76D1\u542C\u6570\u7EC4\u7684\u53D8\u5316</p></li><li><p>\u62E6\u622A\u2F45\u6CD5\u4E30\u5BCC\uFF1A\u591A\u8FBE 13 \u79CD\uFF0C\u4E0D\u9650\u4E8E <code>apply</code>\u3001<code>ownKeys</code>\u3001<code>deleteProperty</code>\u3001<code>has</code> \u7B49\u3002\u6BD4 <code>Object.defineProperty</code> \u5F3A\u5927\u5F88\u591A</p></li><li><p>\u8FD4\u56DE\u7684\u662F\u2F00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u5728\u4E0D\u5F71\u54CD\u539F\u5BF9\u8C61\u7684\u60C5\u51B5\u4E0B\uFF0C\u53EA\u64CD\u4F5C\u65B0\u5BF9\u8C61\u6765\u8FBE\u5230\u2F6C\u7684\uFF1B\u2F7D <code>Object.defineProperty</code> \u53EA\u80FD\u904D\u5386\u539F\u5BF9\u8C61\u5C5E\u6027\u5E76\u76F4\u63A5\u4FEE\u6539\u539F\u5BF9\u8C61</p></li><li><p>\u53D7\u5230\u5404\u6D4F\u89C8\u5668\u2F1A\u5546\u7684\u91CD\u70B9\u6301\u7EED\u6027\u80FD\u4F18\u5316\uFF0C\u80FD\u4EAB\u53D7\u5230\u4F5C\u4E3A\u65B0\u6807\u51C6\u7684\u6027\u80FD\u7EA2\u5229</p></li></ul><p><strong>Object.defineProperty</strong></p><ul><li>\u517C\u5BB9\u6027\u8F83\u597D\uFF08\u53EF\u2F40\u6301\u5230 IE9\uFF09</li></ul><h2 id="_8-\u5982\u4F55\u7406\u89E3-vue-\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF" tabindex="-1">8. \u5982\u4F55\u7406\u89E3 Vue \u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF\uFF1F <a class="header-anchor" href="#_8-\u5982\u4F55\u7406\u89E3-vue-\u7684\u54CD\u5E94\u5F0F\u7CFB\u7EDF" aria-hidden="true">#</a></h2><p>(\u8003\u5BDF MVVM) M: model \u6570\u636E\u6A21\u578B, V:view \u89C6\u56FE\u6A21\u578B, VM: viewModel \u89C6\u56FE\u6570\u636E\u6A21\u578B</p><p>\u53CC\u5411:</p><ol><li>\u89C6\u56FE\u53D8\u5316\u4E86, \u6570\u636E\u81EA\u52A8\u66F4\u65B0 =&gt; \u76D1\u542C\u539F\u751F\u7684\u4E8B\u4EF6\u5373\u53EF, \u8F93\u5165\u6846\u53D8\u4E86, \u76D1\u542C\u8F93\u5165\u6846 input \u4E8B\u4EF6</li><li>\u6570\u636E\u53D8\u5316\u4E86, \u89C6\u56FE\u8981\u81EA\u52A8\u66F4\u65B0 =&gt; vue2 \u548C vue3</li></ol><h3 id="\u57FA\u672C\u539F\u7406" tabindex="-1">\u57FA\u672C\u539F\u7406 <a class="header-anchor" href="#\u57FA\u672C\u539F\u7406" aria-hidden="true">#</a></h3><p>vue2.0 \u6570\u636E\u52AB\u6301: Object.defineProperty (es5)</p><p>vue3.0 \u6570\u636E\u52AB\u6301: Proxy (es6)</p><p>\u5206\u6790 :\u6B64\u9898\u8003\u67E5 Vue \u7684 MVVM \u539F\u7406</p><p>\u89E3\u7B54: Vue \u7684\u53CC\u5411\u7ED1\u5B9A\u539F\u7406\u5176\u5B9E\u5C31\u662F MVVM \u7684\u57FA\u672C\u539F\u7406, Vuejs \u5B98\u7F51\u5DF2\u7ECF\u8BF4\u660E, \u5B9E\u9645\u5C31\u662F\u901A\u8FC7 Object.defineProperty \u65B9\u6CD5 \u5B8C\u6210\u4E86\u5BF9\u4E8E Vue \u5B9E\u4F8B\u4E2D\u6570\u636E\u7684 <strong><code>\u52AB\u6301</code></strong>, \u901A\u8FC7\u5BF9\u4E8E data \u4E2D\u6570\u636E \u8FDB\u884C set \u7684\u52AB\u6301\u76D1\u542C, \u7136\u540E\u901A\u8FC7**<code>\u89C2\u5BDF\u8005\u6A21\u5F0F</code>**, \u901A\u77E5 \u5BF9\u5E94\u7684\u7ED1\u5B9A\u8282\u70B9 \u8FDB\u884C\u8282\u70B9\u6570\u636E\u66F4\u65B0, \u5B8C\u6210\u6570\u636E\u9A71\u52A8\u89C6\u56FE\u7684\u66F4\u65B0</p><p>\u7B80\u5355\u6982\u8FF0 : \u901A\u8FC7 Object.defineProperty \u5B8C\u6210\u5BF9\u4E8E\u6570\u636E\u7684\u52AB\u6301, \u901A\u8FC7\u89C2\u5BDF\u8005\u6A21\u5F0F, \u5B8C\u6210\u5BF9\u4E8E\u8282\u70B9\u7684\u6570\u636E\u66F4\u65B0</p>',57),p=[d];function l(n,c,a,s,u,h){return o(),i("div",null,p)}const _=e(t,[["render",l]]);export{v as __pageData,_ as default};
