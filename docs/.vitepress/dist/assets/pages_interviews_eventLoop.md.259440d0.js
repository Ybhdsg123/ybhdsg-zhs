import{_ as e,c as t,o,d as s}from"./app.4f5f536c.js";const u=JSON.parse('{"title":"\u4E8B\u4EF6\u5FAA\u73AF","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u9610\u8FF0\u4E00\u4E0B js \u7684\u4E8B\u4EF6\u5FAA\u73AF","slug":"_1-\u9610\u8FF0\u4E00\u4E0B-js-\u7684\u4E8B\u4EF6\u5FAA\u73AF","link":"#_1-\u9610\u8FF0\u4E00\u4E0B-js-\u7684\u4E8B\u4EF6\u5FAA\u73AF","children":[]},{"level":2,"title":"2. \u5982\u4F55\u7406\u89E3 js \u7684\u5F02\u6B65\uFF1A","slug":"_2-\u5982\u4F55\u7406\u89E3-js-\u7684\u5F02\u6B65","link":"#_2-\u5982\u4F55\u7406\u89E3-js-\u7684\u5F02\u6B65","children":[]},{"level":2,"title":"3. Js \u4E2D\u7684\u8BA1\u65F6\u5668\u80FD\u505A\u5230\u7CBE\u786E\u8BA1\u65F6\u5417\uFF1F\u4E3A\u4EC0\u4E48\uFF1F","slug":"_3-js-\u4E2D\u7684\u8BA1\u65F6\u5668\u80FD\u505A\u5230\u7CBE\u786E\u8BA1\u65F6\u5417-\u4E3A\u4EC0\u4E48","link":"#_3-js-\u4E2D\u7684\u8BA1\u65F6\u5668\u80FD\u505A\u5230\u7CBE\u786E\u8BA1\u65F6\u5417-\u4E3A\u4EC0\u4E48","children":[]},{"level":2,"title":"4. \u4EFB\u52A1\u6709\u4F18\u5148\u7EA7\u5417\uFF1F","slug":"_4-\u4EFB\u52A1\u6709\u4F18\u5148\u7EA7\u5417","link":"#_4-\u4EFB\u52A1\u6709\u4F18\u5148\u7EA7\u5417","children":[]}],"relativePath":"pages/interviews/eventLoop.md"}'),r={name:"pages/interviews/eventLoop.md"},p=s('<h1 id="\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1">\u4E8B\u4EF6\u5FAA\u73AF <a class="header-anchor" href="#\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a></h1><span style="width:200px;height:200px;color:#409eff;border:3px solid #ccc;"><p><strong>1. \u5355\u7EBF\u7A0B\u662F\u5F02\u6B65\u4EA7\u751F\u7684\u539F\u56E0</strong></p><p><strong>2. \u4E8B\u4EF6\u5FAA\u73AF\u662F\u5F02\u6B65\u7684\u5B9E\u73B0\u65B9\u5F0F</strong></p><p><strong>3. \u5FAE\u961F\u5217\u4F18\u5148\u7EA7\u6700\u9AD8</strong></p><p><strong>4. \u4E00\u4E2A\u8FDB\u7A0B\u81F3\u5C11\u6709\u4E00\u4E2A\u7EBF\u7A0B</strong></p><p><strong>5. \u6D4F\u89C8\u5668\u662F\u4E00\u4E2A\u591A\u8FDB\u7A0B\u591A\u7EBF\u7A0B\u7684\u5E94\u7528\u7A0B\u5E8F</strong></p></span><h2 id="_1-\u9610\u8FF0\u4E00\u4E0B-js-\u7684\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1">1. \u9610\u8FF0\u4E00\u4E0B js \u7684\u4E8B\u4EF6\u5FAA\u73AF <a class="header-anchor" href="#_1-\u9610\u8FF0\u4E00\u4E0B-js-\u7684\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a></h2><p><strong>\u4E8B\u4EF6\u5FAA\u73AF\u53C8\u53EB\u6D88\u606F\u5FAA\u73AF\uFF0C\u662F\u6D4F\u89C8\u5668\u6E32\u67D3\u4E3B\u7EBF\u7A0B\u7684\u5DE5\u4F5C\u65B9\u5F0F</strong></p><p>\u5728 chrome \u6E90\u7801\u4E2D\uFF0C\u4ED6\u5F00\u542F\u4E00\u4E2A\u4E0D\u4F1A\u7ED3\u675F\u7684 for \u5FAA\u73AF\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u4ECE\u6D88\u606F\u961F\u5217\u4E2D\u53D6\u51FA\u7B2C\u4E00\u4E2A\u4EFB\u52A1\u6267\u884C\uFF0C\u800C\u5176\u4ED6\u7EBF\u7A0B\u53EA\u9700\u8981\u5728\u5408\u9002\u7684\u65F6\u5019\u5C06\u4EFB\u52A1\u52A0\u5165\u5230\u961F\u5217\u672B\u5C3E\u5C31\u884C</p><p>\u8FC7\u53BB\u628A\u6D88\u606F\u961F\u5217\u7B80\u5355\u7406\u89E3\u4E3A\u5B8F\u961F\u5217\u548C\u5FAE\u961F\u5217\uFF0C\u8FD9\u79CD\u8BF4\u6CD5\u76EE\u524D\u65E0\u6CD5\u6EE1\u8DB3\u590D\u6742\u7684\u6D4F\u89C8\u5668\u73AF\u5883\uFF0C\u53D6\u800C\u4EE3\u4E4B\u7684\u662F\u4E00\u79CD\u66F4\u52A0\u7075\u6D3B\u591A\u53D8\u7684\u5904\u7406\u65B9\u5F0F</p><p>\u6839\u636E W3C \u5B98\u65B9\u7684\u89E3\u91CA\uFF0C<strong>\u6BCF\u4E2A\u4EFB\u52A1\u6709\u4E0D\u540C\u7684\u7C7B\u578B\uFF0C\u540C\u7C7B\u578B\u7684\u4EFB\u52A1\u5FC5\u987B\u5728\u540C\u4E00\u4E2A\u961F\u5217\uFF0C\u4E0D\u540C\u7684\u4EFB\u52A1\u53EF\u4EE5\u5C5E\u4E8E\u4E0D\u540C\u7684\u961F\u5217</strong>\uFF0C</p><p><strong>\u4E0D\u540C\u961F\u5217\u6709\u4E0D\u540C\u7684\u4F18\u5148\u7EA7</strong>\uFF0C\u5728\u4E00\u6B21\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\uFF0C\u7531\u6D4F\u89C8\u5668\u81EA\u884C\u51B3\u5B9A\u90A3\u4E2A\u961F\u5217\u7684\u4EFB\u52A1\uFF0C</p><p><strong>\u4F46\u6D4F\u89C8\u5668\u5FC5\u987B\u6709\u4E00\u4E2A\u5FAE\u961F\u5217\uFF0C\u5FAE\u961F\u5217\u7684\u4EFB\u52A1\u4E00\u5B9A\u5177\u6709\u6700\u9AD8\u7684\u4F18\u5148\u7EA7\uFF0C\u5FC5\u987B\u4F18\u5148\u8C03\u5EA6\u6267\u884C</strong></p><blockquote><p>\u56DE\u7B54\uFF1A \u6D88\u606F\uFF08\u4E8B\u4EF6\uFF09\u5FAA\u73AF\u662F\u6D4F\u89C8\u5668\u7684\u6E32\u67D3\u4E3B\u7EBF\u7A0B\u7684\u5DE5\u4F5C\u65B9\u5F0F\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u4ECE\u6D88\u606F\u961F\u5217\u4E2D\u53D6\u51FA\u7B2C\u4E00\u4E2A\u4EFB\u52A1\u6267\u884C\uFF0C\u6267\u884C\u5B8C\u540E\u4F1A\u67E5\u770B\u5FAE\u961F\u5217\u4E2D\u6709\u65E0\u4EFB\u52A1\uFF0C\u6709\u4EFB\u52A1\u4F1A\u5148\u5C06\u5FAE\u4EFB\u52A1\u961F\u5217\u8FDB\u884C\u4EFB\u52A1\u4F18\u5148\u8C03\u5EA6\u6267\u884C\u5B8C\u6210\uFF0C\u5728\u6B64\u671F\u95F4\u4EA7\u751F\u7684\u300C\u5FAE\u4EFB\u52A1\u300D\uFF0C\u653E\u5165\u300C\u5FAE\u4EFB\u52A1\u961F\u5217\u300D\u672B\u5C3E\uFF0C\u518D\u8FDB\u884C\u4E0B\u4E00\u6B21\u5FAA\u73AF</p></blockquote><h2 id="_2-\u5982\u4F55\u7406\u89E3-js-\u7684\u5F02\u6B65" tabindex="-1">2. \u5982\u4F55\u7406\u89E3 js \u7684\u5F02\u6B65\uFF1A <a class="header-anchor" href="#_2-\u5982\u4F55\u7406\u89E3-js-\u7684\u5F02\u6B65" aria-hidden="true">#</a></h2><p>Js \u662F\u4E00\u95E8\u5355\u7EBF\u7A0B\u7684\u8BED\u8A00\uFF0C\u8FD9\u662F\u56E0\u4E3A\u5B83\u8FD0\u884C\u5728\u6D4F\u89C8\u5668\u7684<strong>\u6E32\u67D3\u4E3B\u7EBF\u7A0B\u4E2D\uFF0C\u6E32\u67D3\u4E3B\u7EBF\u7A0B\u53EA\u6709\u4E00\u4E2A</strong></p><p>\u800C\u6E32\u67D3\u4E3B\u7EBF\u7A0B\u627F\u62C5\u7740\u8BF8\u591A\u7684\u5DE5\u4F5C\uFF0C<strong>\u6E32\u67D3\u9875\u9762\uFF0C\u6267\u884C js</strong>\u90FD\u5728\u5176\u4E2D\u8FD0\u884C\uFF0C</p><p>\u5982\u679C\u4F7F\u7528\u540C\u6B65\u7684\u65B9\u5F0F\u5C31\u6781\u6709\u53EF\u80FD\u5BFC\u81F4\u4E3B\u7EBF\u7A0B\u4EA7\u751F\u963B\u585E\uFF0C\u4ECE\u800C\u5BFC\u81F4\u6D88\u606F\u961F\u5217\u4E2D\u7684\u5F88\u591A\u5176\u4ED6\u4EFB\u52A1\u65E0\u6CD5\u5F97\u5230\u6267\u884C\uFF0C\u8FD9\u6837\u4E00\u6765\uFF0C\u4E00\u65B9\u9762\u4F1A\u5BFC\u81F4\u7E41\u5FD9\u7684\u4E3B\u7EBF\u7A0B\u767D\u767D\u6D88\u8017\u65F6\u95F4\uFF0C\u53E6\u4E00\u65B9\u9762\u5BFC\u81F4\u9875\u9762\u65E0\u6CD5\u53CA\u65F6\u66F4\u65B0\uFF0C\u7ED9\u7528\u6237\u9020\u6210\u5361\u6B7B\u73B0\u8C61</p><p>\u6240\u4EE5\u6D4F\u89C8\u5668\u91C7\u7528\u5F02\u6B65\u7684\u65B9\u5F0F\u6765\u907F\u514D\uFF0C\u5177\u4F53\u505A\u6CD5\u662F\u5F53\u67D0\u4E9B\u4EFB\u52A1\u53D1\u751F\u65F6\uFF0C\u6BD4\u5982<strong>\u8BA1\u65F6\u5668\uFF0C\u7F51\u7EDC\uFF0C\u4E8B\u4EF6\u76D1\u542C</strong>\uFF0C</p><p>\u4E3B\u7EBF\u7A0B\u5C06\u4EFB\u52A1\u4EA4\u7ED9\u5176\u4ED6\u7EBF\u7A0B\u5904\u7406\uFF0C\u81EA\u8EAB\u7ACB\u5373\u7ED3\u675F\u4EFB\u52A1\u7684\u6267\u884C\uFF0C\u8F6C\u800C\u6267\u884C\u540E\u7EED\u4EE3\u7801\uFF0C</p><p>\u5F53\u5176\u4ED6\u7EBF\u7A0B\u5B8C\u6210\u65F6\uFF0C\u5C06\u4E8B\u5148\u4F20\u9012\u7684\u56DE\u8C03\u51FD\u6570\u5305\u88C5\u6210<strong>\u4EFB\u52A1</strong>\uFF08\u7B80\u5355\u7406\u89E3\u5C31\u662F\u51FD\u6570\uFF09\uFF0C\u52A0\u5165\u5230\u6D88\u606F\u961F\u5217\u7684\u672B\u5C3E\u6392\u961F\uFF0C\u7B49\u5F85\u4E3B\u7EBF\u7A0B\u8C03\u5EA6\u6267\u884C\uFF0C</p><p>\u5728\u8FD9\u79CD\u5F02\u6B65\u6A21\u5F0F\u4E0B\uFF0C\u6D4F\u89C8\u5668\u6C38\u4E0D\u963B\u585E\uFF0C\u4ECE\u800C\u6700\u5927\u9650\u5EA6\u7684\u4FDD\u8BC1\u4E86\u4F46\u7EBF\u7A0B\u7684\u6D41\u7545\u8FD0\u884C</p><h2 id="_3-js-\u4E2D\u7684\u8BA1\u65F6\u5668\u80FD\u505A\u5230\u7CBE\u786E\u8BA1\u65F6\u5417-\u4E3A\u4EC0\u4E48" tabindex="-1">3. Js \u4E2D\u7684\u8BA1\u65F6\u5668\u80FD\u505A\u5230\u7CBE\u786E\u8BA1\u65F6\u5417\uFF1F\u4E3A\u4EC0\u4E48\uFF1F <a class="header-anchor" href="#_3-js-\u4E2D\u7684\u8BA1\u65F6\u5668\u80FD\u505A\u5230\u7CBE\u786E\u8BA1\u65F6\u5417-\u4E3A\u4EC0\u4E48" aria-hidden="true">#</a></h2><p>\u4E0D\u80FD\uFF0C\u56E0\u4E3A</p><blockquote><p>1.\u8BA1\u7B97\u673A\u6CA1\u6709\u539F\u5B50\u949F\uFF0C\u65E0\u6CD5\u505A\u5230\u7CBE\u786E\u8BA1\u65F6</p></blockquote><blockquote><p>2.\u64CD\u4F5C\u7CFB\u7EDF\u7684\u8BA1\u65F6\u51FD\u6570\u672C\u8EAB\u5C31\u6709\u5C11\u91CF\u8BEF\u5DEE\uFF0C\u7531\u4E8E js \u7684\u8BA1\u65F6\u5668\u6700\u7EC8\u8C03\u7528\u7684\u662F\u64CD\u4F5C\u7CFB\u7EDF\u7684\u51FD\u6570\uFF0C\u4E5F\u5C31\u643A\u5E26\u4E86\u4E00\u4E9B\u504F\u5DEE</p></blockquote><blockquote><p>3.\u6309\u7167 W3C \u7684\u6807\u51C6\uFF0C\u6D4F\u89C8\u5668\u5B9E\u73B0\u8BA1\u65F6\u5668\u65F6\uFF0C\u5982\u679C\u5D4C\u5957\u7684\u5C42\u7EA7\u8D85\u8FC7 5 \u5C42\uFF0C\u5219\u4F1A\u5E26\u6709 4 \u6BEB\u79D2\u7684\u6700\u5C11\u65F6\u95F4\uFF0C\u8FD9\u6837\u5728\u8BA1\u65F6\u65F6\u95F4\u5C11\u4E8E 4 \u6BEB\u79D2\u662F\u53C8\u5E26\u6765\u4E86\u504F\u5DEE</p></blockquote><blockquote><p>4\uFF0C\u53D7\u4E8B\u4EF6\u5FAA\u73AF\u7684\u5F71\u54CD\uFF0C\u8BA1\u65F6\u5668\u7684\u56DE\u8C03\u51FD\u6570\u5728\u80FD\u5728\u4E3B\u7EBF\u7A0B\u7A7A\u95F2\u65F6\u8FD0\u884C\uFF0C\u56E0\u6B64\u53C8\u6765\u4E86\u504F\u5DEE</p></blockquote><h2 id="_4-\u4EFB\u52A1\u6709\u4F18\u5148\u7EA7\u5417" tabindex="-1">4. \u4EFB\u52A1\u6709\u4F18\u5148\u7EA7\u5417\uFF1F <a class="header-anchor" href="#_4-\u4EFB\u52A1\u6709\u4F18\u5148\u7EA7\u5417" aria-hidden="true">#</a></h2><p>\u4EFB\u52A1\u6CA1\u6709\u4F18\u5148\u7EA7\uFF0C\u5728\u6D88\u606F\u961F\u5217\u4E2D\u5148\u8FDB\u5148\u51FA</p><p>\u4F46<strong>\u6D88\u606F\u961F\u5217\u662F\u6709\u4F18\u5148\u7EA7\u7684</strong></p><p>\u6839\u636E W3C \u7684\u6700\u65B0\u89E3\u91CA:</p><ul><li><strong>\u6BCF\u4E2A\u4EFB\u52A1\u90FD\u6709\u4E00\u4E2A\u4EFB\u52A1\u7C7B\u578B\uFF0C\u540C\u4E00\u4E2A\u7C7B\u578B\u7684\u4EFB\u52A1\u5FC5\u987B\u5728\u4E00\u4E2A\u961F\u5217\uFF0C\u4E0D\u540C\u7C7B\u578B\u7684\u4EFB\u52A1\u53EF\u4EE5\u5206\u5C5E\u4E8E\u4E0D\u540C\u7684\u961F\u5217\u3002</strong> \u5728\u4E00\u6B21\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\uFF0C\u6D4F\u89C8\u5668\u53EF\u4EE5\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4ECE\u4E0D\u540C\u7684\u961F\u5217\u4E2D\u53D6\u51FA\u4EFB\u52A1\u6267\u884C\u3002</li><li><strong>\u6D4F\u89C8\u5668\u5FC5\u987B\u51C6\u5907\u597D\u4E00\u4E2A\u5FAE\u961F\u5217\uFF0C\u5FAE\u961F\u5217\u4E2D\u7684\u4EFB\u52A1\u4F18\u5148\u6240\u6709\u5176\u4ED6\u4EFB\u52A1\u6267\u884C</strong><a href="https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint" target="_blank" rel="noreferrer">https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint</a></li></ul><blockquote><p>\u968F\u7740\u6D4F\u89C8\u5668\u7684\u590D\u6742\u5EA6\u6025\u5267\u63D0\u5347\uFF0CW3C \u4E0D\u518D\u4F7F\u7528\u5B8F\u961F\u5217\u7684\u8BF4\u6CD5</p></blockquote>',30),n=[p];function a(l,i,c,h,g,d){return o(),t("div",null,n)}const k=e(r,[["render",a]]);export{u as __pageData,k as default};
