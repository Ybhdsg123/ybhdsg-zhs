import{_ as s,c as n,o as a,d as l}from"./app.d3b2d559.js";const u=JSON.parse('{"title":"uniapp \u5E38\u7528\u5C01\u88C5\u7EC4\u4EF6\uFF08vue2\uFF09","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u4E0A\u4F20\u56FE\u7247\u7EC4\u4EF6","slug":"_1-\u4E0A\u4F20\u56FE\u7247\u7EC4\u4EF6","link":"#_1-\u4E0A\u4F20\u56FE\u7247\u7EC4\u4EF6","children":[]}],"relativePath":"pages/uniapp/uniapp-components.md"}'),p={name:"pages/uniapp/uniapp-components.md"},t=l(`<h1 id="uniapp-\u5E38\u7528\u5C01\u88C5\u7EC4\u4EF6-vue2" tabindex="-1">uniapp \u5E38\u7528\u5C01\u88C5\u7EC4\u4EF6\uFF08vue2\uFF09 <a class="header-anchor" href="#uniapp-\u5E38\u7528\u5C01\u88C5\u7EC4\u4EF6-vue2" aria-hidden="true">#</a></h1><h2 id="_1-\u4E0A\u4F20\u56FE\u7247\u7EC4\u4EF6" tabindex="-1">1. \u4E0A\u4F20\u56FE\u7247\u7EC4\u4EF6 <a class="header-anchor" href="#_1-\u4E0A\u4F20\u56FE\u7247\u7EC4\u4EF6" aria-hidden="true">#</a></h2><p><strong><em>\u7EC4\u4EF6\u5185\u5BB9</em></strong></p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">template</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">class</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;upload-img&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#839496;"> @</span><span style="color:#93A1A1;">click</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">uploadImg</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">class</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;img-item&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">v-if</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">imgList</span><span style="color:#839496;">.length</span><span style="color:#859900;">&gt;</span><span style="color:#D33682;">0</span><span style="color:#839496;">&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#586E75;">&lt;!-- \u5FC5\u987B\u4F7F\u7528 image \u6807\u7B7E\uFF0C\u4F7F\u7528\u539F\u751Fimg\u6807\u7B7E\u5728\u771F\u673A\u6A21\u62DF\u4E0B\u4E0D\u5C55\u793A\u56FE\u7247 --&gt;</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">image</span><span style="color:#839496;"> @</span><span style="color:#93A1A1;">longpress</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">longpressBtn</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> :</span><span style="color:#93A1A1;">style</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#839496;">{width: </span><span style="color:#268BD2;">width</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#839496;">,height: </span><span style="color:#268BD2;">height</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#839496;">}</span><span style="color:#839496;">&quot;</span></span>
<span class="line"><span style="color:#839496;">					</span><span style="color:#93A1A1;">v-for</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#839496;">(</span><span style="color:#268BD2;">item</span><span style="color:#839496;">,</span><span style="color:#268BD2;">index</span><span style="color:#839496;">) </span><span style="color:#859900;">in</span><span style="color:#839496;"> </span><span style="color:#268BD2;">imgList</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> :</span><span style="color:#93A1A1;">key</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">item</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> :</span><span style="color:#93A1A1;">mode</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">modeType</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> :</span><span style="color:#93A1A1;">src</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">item</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">alt</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;\u7167\u7247&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">class</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;imgAdd&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">slot</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">v-if</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#268BD2;">imgList</span><span style="color:#839496;">.length</span><span style="color:#859900;">&lt;</span><span style="color:#268BD2;">count</span><span style="color:#839496;">&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">					</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#839496;"> :</span><span style="color:#93A1A1;">style</span><span style="color:#839496;">=</span><span style="color:#839496;">&quot;</span><span style="color:#839496;">{width: </span><span style="color:#268BD2;">width</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#839496;">,height: </span><span style="color:#268BD2;">height</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#839496;">}</span><span style="color:#839496;">&quot;</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">class</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;imgIcon&quot;</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">text</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">class</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;iconfont icon-jia add&quot;</span><span style="color:#839496;"> /</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">text</span><span style="color:#586E75;">&gt;</span><span style="color:#839496;">{{</span><span style="color:#268BD2;">label</span><span style="color:#839496;">}}</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">text</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">					</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">slot</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">template</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">script</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#859900;">import</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#268BD2;">UploadImgApi</span></span>
<span class="line"><span style="color:#839496;">	} </span><span style="color:#859900;">from</span><span style="color:#839496;"> </span><span style="color:#2AA198;">&#39;@/api/global.js&#39;</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#859900;">export</span><span style="color:#839496;"> </span><span style="color:#859900;">default</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">		props: {</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u624B\u673A\u4E0A\u76F8\u518C\u4E00\u6B21\u80FD\u9009\u62E9\u51E0\u5F20</span></span>
<span class="line"><span style="color:#839496;">			count: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#D33682;">1</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			sizeType: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Array</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#268BD2;">default</span><span style="color:#839496;">: () </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> [</span><span style="color:#2AA198;">&#39;original&#39;</span><span style="color:#839496;">, </span><span style="color:#2AA198;">&#39;compressed&#39;</span><span style="color:#839496;">]</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			sourceType: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Array</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#268BD2;">default</span><span style="color:#839496;">: () </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> [</span><span style="color:#2AA198;">&#39;album&#39;</span><span style="color:#839496;">, </span><span style="color:#2AA198;">&#39;camera&#39;</span><span style="color:#839496;">]</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u4E0A\u4F20\u5927\u5C0F</span></span>
<span class="line"><span style="color:#839496;">			maxSize: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#586E75;">// 2 * 1024 * 1024 2M 5242880 5M</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#D33682;">5242880</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u56FE\u7247\u5217\u8868</span></span>
<span class="line"><span style="color:#839496;">			imgList: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Array</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#268BD2;">default</span><span style="color:#839496;">: () </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> []</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u56FE\u7247\u548C\u4E0A\u4F20\u6309\u94AE\u7684\u5927\u5C0F</span></span>
<span class="line"><span style="color:#839496;">			width: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#D33682;">179</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u56FE\u7247\u548C\u4E0A\u4F20\u6309\u94AE\u7684\u5927\u5C0F</span></span>
<span class="line"><span style="color:#839496;">			height: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#D33682;">179</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u662F\u5426\u957F\u6309\u5220\u9664,\u76EE\u524D\u53EA\u6709\u5355\u5F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#839496;">			isLongpress: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Boolean</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#B58900;">false</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u88C1\u5207\u56FE\u7247</span></span>
<span class="line"><span style="color:#839496;">			crop: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">Object</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#268BD2;">default</span><span style="color:#839496;">: () </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> {}</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u56FE\u7247\u5C55\u793A\u5F62\u5F0F</span></span>
<span class="line"><span style="color:#839496;">			modeType: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">String</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#2AA198;">&#39;scaleToFill&#39;</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u6DFB\u52A0\u6309\u94AE\u4E0B\u65B9\u6587\u5B57</span></span>
<span class="line"><span style="color:#839496;">			label: {</span></span>
<span class="line"><span style="color:#839496;">				type: </span><span style="color:#268BD2;">String</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">				default: </span><span style="color:#2AA198;">&#39;&#39;</span></span>
<span class="line"><span style="color:#839496;">			}</span></span>
<span class="line"><span style="color:#839496;">		},</span></span>
<span class="line"><span style="color:#839496;">		methods: {</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u4E0A\u4F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#268BD2;">uploadImg</span><span style="color:#839496;">() {</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#93A1A1;font-style:italic;">let</span><span style="color:#839496;"> </span><span style="color:#268BD2;">that</span><span style="color:#839496;"> </span><span style="color:#859900;">=</span><span style="color:#839496;"> </span><span style="color:#268BD2;">this</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#268BD2;">uni</span><span style="color:#839496;">.</span><span style="color:#268BD2;">chooseImage</span><span style="color:#839496;">({</span></span>
<span class="line"><span style="color:#839496;">					count: </span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">count</span><span style="color:#839496;">, </span><span style="color:#586E75;">//\u9ED8\u8BA49</span></span>
<span class="line"><span style="color:#839496;">					sizeType: </span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">sizeType</span><span style="color:#839496;">, </span><span style="color:#586E75;">//\u53EF\u4EE5\u6307\u5B9A\u662F\u539F\u56FE\u8FD8\u662F\u538B\u7F29\u56FE\uFF0C\u9ED8\u8BA4\u4E8C\u8005\u90FD\u6709</span></span>
<span class="line"><span style="color:#839496;">					sourceType: </span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">sourceType</span><span style="color:#839496;">, </span><span style="color:#586E75;">// album \u4ECE\u76F8\u518C\u9009\u56FE\uFF0Ccamera \u4F7F\u7528\u76F8\u673A\uFF0C\u9ED8\u8BA4\u4E8C\u8005\u90FD\u6709</span></span>
<span class="line"><span style="color:#839496;">					crop: </span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">crop</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">					</span><span style="color:#586E75;">// \u6210\u529F\u5219\u8FD4\u56DE\u56FE\u7247\u7684\u672C\u5730\u6587\u4EF6\u8DEF\u5F84\u5217\u8868</span></span>
<span class="line"><span style="color:#839496;">					</span><span style="color:#268BD2;">success</span><span style="color:#839496;">: </span><span style="color:#93A1A1;font-style:italic;">async</span><span style="color:#839496;"> </span><span style="color:#93A1A1;font-style:italic;">function</span><span style="color:#839496;">(res) {</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// console.log(JSON.stringify(res.tempFilePaths), &#39;----&#39;);</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// console.log(res.tempFiles)</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// \u9650\u5236\u4E0A\u4F20\u5927\u5C0F</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#268BD2;">res</span><span style="color:#839496;">.</span><span style="color:#268BD2;">tempFiles</span><span style="color:#839496;">.</span><span style="color:#268BD2;">forEach</span><span style="color:#839496;">(item </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">							</span><span style="color:#859900;">if</span><span style="color:#839496;"> (</span><span style="color:#268BD2;">item</span><span style="color:#839496;">.</span><span style="color:#268BD2;">size</span><span style="color:#839496;"> </span><span style="color:#859900;">&gt;=</span><span style="color:#839496;"> </span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">maxSize</span><span style="color:#839496;">) {</span></span>
<span class="line"><span style="color:#839496;">								</span><span style="color:#859900;">return</span><span style="color:#839496;"> </span><span style="color:#268BD2;">uni</span><span style="color:#839496;">.</span><span style="color:#268BD2;">showToast</span><span style="color:#839496;">({</span></span>
<span class="line"><span style="color:#839496;">									title: </span><span style="color:#2AA198;">\`\u6700\u5927\u4E0A\u4F20\u5927\u5C0F\u4E3A\${</span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">maxSize</span><span style="color:#2AA198;">}M\`</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">									icon: </span><span style="color:#2AA198;">&quot;none&quot;</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">									duration: </span><span style="color:#D33682;">2000</span></span>
<span class="line"><span style="color:#839496;">								});</span></span>
<span class="line"><span style="color:#839496;">							}</span></span>
<span class="line"><span style="color:#839496;">						})</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// \u4E0A\u4F20\u56FE\u7247\u5230oss</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#93A1A1;font-style:italic;">let</span><span style="color:#839496;"> </span><span style="color:#268BD2;">imgList</span><span style="color:#839496;"> </span><span style="color:#859900;">=</span><span style="color:#839496;"> []</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#859900;">for</span><span style="color:#839496;"> (</span><span style="color:#93A1A1;font-style:italic;">let</span><span style="color:#839496;"> </span><span style="color:#268BD2;">item</span><span style="color:#839496;"> </span><span style="color:#859900;">of</span><span style="color:#839496;"> </span><span style="color:#268BD2;">res</span><span style="color:#839496;">.</span><span style="color:#268BD2;">tempFilePaths</span><span style="color:#839496;">) {</span></span>
<span class="line"><span style="color:#839496;">							</span><span style="color:#93A1A1;font-style:italic;">const</span><span style="color:#839496;"> </span><span style="color:#268BD2;">imgUrl</span><span style="color:#839496;"> </span><span style="color:#859900;">=</span><span style="color:#839496;"> </span><span style="color:#859900;">await</span><span style="color:#839496;"> </span><span style="color:#268BD2;">UploadImgApi</span><span style="color:#839496;">(</span><span style="color:#268BD2;">item</span><span style="color:#839496;">)</span></span>
<span class="line"><span style="color:#839496;">							</span><span style="color:#268BD2;">imgList</span><span style="color:#839496;">.</span><span style="color:#268BD2;">push</span><span style="color:#839496;">(</span><span style="color:#268BD2;">imgUrl</span><span style="color:#839496;">.</span><span style="color:#268BD2;">data</span><span style="color:#839496;">)</span></span>
<span class="line"><span style="color:#839496;">						}</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// console.log(imgList)</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#268BD2;">that</span><span style="color:#839496;">.</span><span style="color:#268BD2;">$emit</span><span style="color:#839496;">(</span><span style="color:#2AA198;">&#39;getImgPath&#39;</span><span style="color:#839496;">, </span><span style="color:#268BD2;">res</span><span style="color:#839496;">.</span><span style="color:#268BD2;">tempFilePaths</span><span style="color:#839496;">, </span><span style="color:#268BD2;">imgList</span><span style="color:#839496;">)</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// \u9884\u89C8\u56FE\u7247</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// uni.previewImage({</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 	urls: res.tempFilePaths,</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 	longPressActions: {</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 		itemList: [&#39;\u53D1\u9001\u7ED9\u670B\u53CB&#39;, &#39;\u4FDD\u5B58\u56FE\u7247&#39;, &#39;\u6536\u85CF&#39;],</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 		success: function(data) {</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 			console.log(&#39;\u9009\u4E2D\u4E86\u7B2C&#39; + (data.tapIndex + 1) + &#39;\u4E2A\u6309\u94AE,\u7B2C&#39; + (data</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 				.index + 1) + &#39;\u5F20\u56FE\u7247&#39;);</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 		},</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 		fail: function(err) {</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 			console.log(err.errMsg);</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 		}</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// 	}</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#586E75;">// });</span></span>
<span class="line"><span style="color:#839496;">					},</span></span>
<span class="line"><span style="color:#839496;">					</span><span style="color:#268BD2;">fail</span><span style="color:#839496;">: (err) </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">						</span><span style="color:#268BD2;">console</span><span style="color:#839496;">.</span><span style="color:#268BD2;">log</span><span style="color:#839496;">(</span><span style="color:#268BD2;">err</span><span style="color:#839496;">, </span><span style="color:#2AA198;">&#39;err&#39;</span><span style="color:#839496;">)</span></span>
<span class="line"><span style="color:#839496;">					}</span></span>
<span class="line"><span style="color:#839496;">				});</span></span>
<span class="line"><span style="color:#839496;">			},</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// \u957F\u6309\u5220\u9664</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#268BD2;">longpressBtn</span><span style="color:#839496;">() {</span></span>
<span class="line"><span style="color:#839496;">				</span><span style="color:#268BD2;">this</span><span style="color:#839496;">.</span><span style="color:#268BD2;">isLongpress</span><span style="color:#839496;"> </span><span style="color:#859900;">&amp;&amp;</span><span style="color:#839496;"> </span><span style="color:#268BD2;">this</span><span style="color:#839496;">.</span><span style="color:#268BD2;">$emit</span><span style="color:#839496;">(</span><span style="color:#2AA198;">&#39;getImgPath&#39;</span><span style="color:#839496;">, [], [])</span></span>
<span class="line"><span style="color:#839496;">			}</span></span>
<span class="line"><span style="color:#839496;">		},</span></span>
<span class="line"><span style="color:#839496;">	};</span></span>
<span class="line"><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">script</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#586E75;">&lt;</span><span style="color:#268BD2;">style</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">lang</span><span style="color:#839496;">=</span><span style="color:#2AA198;">&quot;scss&quot;</span><span style="color:#839496;"> </span><span style="color:#93A1A1;">scoped</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#93A1A1;">.upload-img</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">display</span><span style="color:#839496;">: flex;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#586E75;">// width: 100%;</span></span>
<span class="line"><span style="color:#839496;">	}</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#93A1A1;">.img-item</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">display</span><span style="color:#839496;">: flex;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">flex-wrap</span><span style="color:#839496;">: wrap;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">align-items</span><span style="color:#839496;">: center;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#586E75;">// justify-content: center;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">width</span><span style="color:#839496;">: </span><span style="color:#D33682;">100</span><span style="color:#859900;">%</span><span style="color:#839496;">;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">height</span><span style="color:#839496;">: </span><span style="color:#D33682;">100</span><span style="color:#859900;">%</span><span style="color:#839496;">;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">border-radius</span><span style="color:#839496;">: </span><span style="color:#D33682;">10</span><span style="color:#839496;">rpx;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#268BD2;">img</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#859900;">margin</span><span style="color:#839496;">: </span><span style="color:#D33682;">13</span><span style="color:#839496;">rpx;</span></span>
<span class="line"><span style="color:#839496;">		}</span></span>
<span class="line"><span style="color:#839496;">	}</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#93A1A1;">.imgAdd</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">margin</span><span style="color:#839496;">: </span><span style="color:#D33682;">13</span><span style="color:#839496;">rpx;</span></span>
<span class="line"><span style="color:#839496;">	}</span></span>
<span class="line"><span style="color:#839496;">	</span><span style="color:#93A1A1;">.imgIcon</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">display</span><span style="color:#839496;">: flex;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">flex-direction</span><span style="color:#839496;">: column;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">justify-content</span><span style="color:#839496;">: center;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">align-items</span><span style="color:#839496;">: center;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">background</span><span style="color:#839496;">: </span><span style="color:#CB4B16;">#F6F6F6</span><span style="color:#839496;">;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">border-radius</span><span style="color:#839496;">: </span><span style="color:#D33682;">10</span><span style="color:#839496;">rpx;</span></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#859900;">color</span><span style="color:#839496;">: </span><span style="color:#CB4B16;">#818181</span><span style="color:#839496;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#839496;">		</span><span style="color:#93A1A1;">.add</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// line-height: 78rpx;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#586E75;">// height: 100%;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#859900;">font-size</span><span style="color:#839496;">: </span><span style="color:#D33682;">78</span><span style="color:#839496;">rpx;</span></span>
<span class="line"><span style="color:#839496;">			</span><span style="color:#859900;">color</span><span style="color:#839496;">: </span><span style="color:#CB4B16;">#818181</span><span style="color:#839496;">;</span></span>
<span class="line"><span style="color:#839496;">		}</span></span>
<span class="line"><span style="color:#839496;">	}</span></span>
<span class="line"><span style="color:#586E75;">&lt;/</span><span style="color:#268BD2;">style</span><span style="color:#586E75;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">template</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">class</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;upload-img&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#657B83;"> @</span><span style="color:#93A1A1;">click</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">uploadImg</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">class</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;img-item&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">v-if</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">imgList</span><span style="color:#657B83;">.length</span><span style="color:#859900;">&gt;</span><span style="color:#D33682;">0</span><span style="color:#657B83;">&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#93A1A1;">&lt;!-- \u5FC5\u987B\u4F7F\u7528 image \u6807\u7B7E\uFF0C\u4F7F\u7528\u539F\u751Fimg\u6807\u7B7E\u5728\u771F\u673A\u6A21\u62DF\u4E0B\u4E0D\u5C55\u793A\u56FE\u7247 --&gt;</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">image</span><span style="color:#657B83;"> @</span><span style="color:#93A1A1;">longpress</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">longpressBtn</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> :</span><span style="color:#93A1A1;">style</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;">{width: </span><span style="color:#268BD2;">width</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#657B83;">,height: </span><span style="color:#268BD2;">height</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#657B83;">}</span><span style="color:#657B83;">&quot;</span></span>
<span class="line"><span style="color:#657B83;">					</span><span style="color:#93A1A1;">v-for</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;">(</span><span style="color:#268BD2;">item</span><span style="color:#657B83;">,</span><span style="color:#268BD2;">index</span><span style="color:#657B83;">) </span><span style="color:#859900;">in</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">imgList</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> :</span><span style="color:#93A1A1;">key</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">item</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> :</span><span style="color:#93A1A1;">mode</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">modeType</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> :</span><span style="color:#93A1A1;">src</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">item</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">alt</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;\u7167\u7247&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">class</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;imgAdd&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">slot</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">v-if</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#268BD2;">imgList</span><span style="color:#657B83;">.length</span><span style="color:#859900;">&lt;</span><span style="color:#268BD2;">count</span><span style="color:#657B83;">&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">					</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">view</span><span style="color:#657B83;"> :</span><span style="color:#93A1A1;">style</span><span style="color:#657B83;">=</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;">{width: </span><span style="color:#268BD2;">width</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#657B83;">,height: </span><span style="color:#268BD2;">height</span><span style="color:#859900;">+</span><span style="color:#2AA198;">&#39;rpx&#39;</span><span style="color:#657B83;">}</span><span style="color:#657B83;">&quot;</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">class</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;imgIcon&quot;</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">text</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">class</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;iconfont icon-jia add&quot;</span><span style="color:#657B83;"> /</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">text</span><span style="color:#93A1A1;">&gt;</span><span style="color:#657B83;">{{</span><span style="color:#268BD2;">label</span><span style="color:#657B83;">}}</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">text</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">					</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">slot</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">view</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">template</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">script</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#859900;">import</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#268BD2;">UploadImgApi</span></span>
<span class="line"><span style="color:#657B83;">	} </span><span style="color:#859900;">from</span><span style="color:#657B83;"> </span><span style="color:#2AA198;">&#39;@/api/global.js&#39;</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#859900;">export</span><span style="color:#657B83;"> </span><span style="color:#859900;">default</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">		props: {</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u624B\u673A\u4E0A\u76F8\u518C\u4E00\u6B21\u80FD\u9009\u62E9\u51E0\u5F20</span></span>
<span class="line"><span style="color:#657B83;">			count: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#D33682;">1</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			sizeType: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Array</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#268BD2;">default</span><span style="color:#657B83;">: () </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> [</span><span style="color:#2AA198;">&#39;original&#39;</span><span style="color:#657B83;">, </span><span style="color:#2AA198;">&#39;compressed&#39;</span><span style="color:#657B83;">]</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			sourceType: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Array</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#268BD2;">default</span><span style="color:#657B83;">: () </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> [</span><span style="color:#2AA198;">&#39;album&#39;</span><span style="color:#657B83;">, </span><span style="color:#2AA198;">&#39;camera&#39;</span><span style="color:#657B83;">]</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u4E0A\u4F20\u5927\u5C0F</span></span>
<span class="line"><span style="color:#657B83;">			maxSize: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#93A1A1;">// 2 * 1024 * 1024 2M 5242880 5M</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#D33682;">5242880</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u56FE\u7247\u5217\u8868</span></span>
<span class="line"><span style="color:#657B83;">			imgList: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Array</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#268BD2;">default</span><span style="color:#657B83;">: () </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> []</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u56FE\u7247\u548C\u4E0A\u4F20\u6309\u94AE\u7684\u5927\u5C0F</span></span>
<span class="line"><span style="color:#657B83;">			width: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#D33682;">179</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u56FE\u7247\u548C\u4E0A\u4F20\u6309\u94AE\u7684\u5927\u5C0F</span></span>
<span class="line"><span style="color:#657B83;">			height: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Number</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#D33682;">179</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u662F\u5426\u957F\u6309\u5220\u9664,\u76EE\u524D\u53EA\u6709\u5355\u5F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#657B83;">			isLongpress: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Boolean</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#B58900;">false</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u88C1\u5207\u56FE\u7247</span></span>
<span class="line"><span style="color:#657B83;">			crop: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">Object</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#268BD2;">default</span><span style="color:#657B83;">: () </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> {}</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u56FE\u7247\u5C55\u793A\u5F62\u5F0F</span></span>
<span class="line"><span style="color:#657B83;">			modeType: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">String</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#2AA198;">&#39;scaleToFill&#39;</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u6DFB\u52A0\u6309\u94AE\u4E0B\u65B9\u6587\u5B57</span></span>
<span class="line"><span style="color:#657B83;">			label: {</span></span>
<span class="line"><span style="color:#657B83;">				type: </span><span style="color:#268BD2;">String</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">				default: </span><span style="color:#2AA198;">&#39;&#39;</span></span>
<span class="line"><span style="color:#657B83;">			}</span></span>
<span class="line"><span style="color:#657B83;">		},</span></span>
<span class="line"><span style="color:#657B83;">		methods: {</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u4E0A\u4F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#268BD2;">uploadImg</span><span style="color:#657B83;">() {</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#586E75;font-style:italic;">let</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">that</span><span style="color:#657B83;"> </span><span style="color:#859900;">=</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">this</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#268BD2;">uni</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">chooseImage</span><span style="color:#657B83;">({</span></span>
<span class="line"><span style="color:#657B83;">					count: </span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">count</span><span style="color:#657B83;">, </span><span style="color:#93A1A1;">//\u9ED8\u8BA49</span></span>
<span class="line"><span style="color:#657B83;">					sizeType: </span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">sizeType</span><span style="color:#657B83;">, </span><span style="color:#93A1A1;">//\u53EF\u4EE5\u6307\u5B9A\u662F\u539F\u56FE\u8FD8\u662F\u538B\u7F29\u56FE\uFF0C\u9ED8\u8BA4\u4E8C\u8005\u90FD\u6709</span></span>
<span class="line"><span style="color:#657B83;">					sourceType: </span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">sourceType</span><span style="color:#657B83;">, </span><span style="color:#93A1A1;">// album \u4ECE\u76F8\u518C\u9009\u56FE\uFF0Ccamera \u4F7F\u7528\u76F8\u673A\uFF0C\u9ED8\u8BA4\u4E8C\u8005\u90FD\u6709</span></span>
<span class="line"><span style="color:#657B83;">					crop: </span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">crop</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">					</span><span style="color:#93A1A1;">// \u6210\u529F\u5219\u8FD4\u56DE\u56FE\u7247\u7684\u672C\u5730\u6587\u4EF6\u8DEF\u5F84\u5217\u8868</span></span>
<span class="line"><span style="color:#657B83;">					</span><span style="color:#268BD2;">success</span><span style="color:#657B83;">: </span><span style="color:#586E75;font-style:italic;">async</span><span style="color:#657B83;"> </span><span style="color:#586E75;font-style:italic;">function</span><span style="color:#657B83;">(res) {</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// console.log(JSON.stringify(res.tempFilePaths), &#39;----&#39;);</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// console.log(res.tempFiles)</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// \u9650\u5236\u4E0A\u4F20\u5927\u5C0F</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#268BD2;">res</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">tempFiles</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">forEach</span><span style="color:#657B83;">(item </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">							</span><span style="color:#859900;">if</span><span style="color:#657B83;"> (</span><span style="color:#268BD2;">item</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">size</span><span style="color:#657B83;"> </span><span style="color:#859900;">&gt;=</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">maxSize</span><span style="color:#657B83;">) {</span></span>
<span class="line"><span style="color:#657B83;">								</span><span style="color:#859900;">return</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">uni</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">showToast</span><span style="color:#657B83;">({</span></span>
<span class="line"><span style="color:#657B83;">									title: </span><span style="color:#2AA198;">\`\u6700\u5927\u4E0A\u4F20\u5927\u5C0F\u4E3A\${</span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">maxSize</span><span style="color:#2AA198;">}M\`</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">									icon: </span><span style="color:#2AA198;">&quot;none&quot;</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">									duration: </span><span style="color:#D33682;">2000</span></span>
<span class="line"><span style="color:#657B83;">								});</span></span>
<span class="line"><span style="color:#657B83;">							}</span></span>
<span class="line"><span style="color:#657B83;">						})</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// \u4E0A\u4F20\u56FE\u7247\u5230oss</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#586E75;font-style:italic;">let</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">imgList</span><span style="color:#657B83;"> </span><span style="color:#859900;">=</span><span style="color:#657B83;"> []</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#859900;">for</span><span style="color:#657B83;"> (</span><span style="color:#586E75;font-style:italic;">let</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">item</span><span style="color:#657B83;"> </span><span style="color:#859900;">of</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">res</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">tempFilePaths</span><span style="color:#657B83;">) {</span></span>
<span class="line"><span style="color:#657B83;">							</span><span style="color:#586E75;font-style:italic;">const</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">imgUrl</span><span style="color:#657B83;"> </span><span style="color:#859900;">=</span><span style="color:#657B83;"> </span><span style="color:#859900;">await</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">UploadImgApi</span><span style="color:#657B83;">(</span><span style="color:#268BD2;">item</span><span style="color:#657B83;">)</span></span>
<span class="line"><span style="color:#657B83;">							</span><span style="color:#268BD2;">imgList</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">push</span><span style="color:#657B83;">(</span><span style="color:#268BD2;">imgUrl</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">data</span><span style="color:#657B83;">)</span></span>
<span class="line"><span style="color:#657B83;">						}</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// console.log(imgList)</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#268BD2;">that</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">$emit</span><span style="color:#657B83;">(</span><span style="color:#2AA198;">&#39;getImgPath&#39;</span><span style="color:#657B83;">, </span><span style="color:#268BD2;">res</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">tempFilePaths</span><span style="color:#657B83;">, </span><span style="color:#268BD2;">imgList</span><span style="color:#657B83;">)</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// \u9884\u89C8\u56FE\u7247</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// uni.previewImage({</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 	urls: res.tempFilePaths,</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 	longPressActions: {</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 		itemList: [&#39;\u53D1\u9001\u7ED9\u670B\u53CB&#39;, &#39;\u4FDD\u5B58\u56FE\u7247&#39;, &#39;\u6536\u85CF&#39;],</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 		success: function(data) {</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 			console.log(&#39;\u9009\u4E2D\u4E86\u7B2C&#39; + (data.tapIndex + 1) + &#39;\u4E2A\u6309\u94AE,\u7B2C&#39; + (data</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 				.index + 1) + &#39;\u5F20\u56FE\u7247&#39;);</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 		},</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 		fail: function(err) {</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 			console.log(err.errMsg);</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 		}</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// 	}</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#93A1A1;">// });</span></span>
<span class="line"><span style="color:#657B83;">					},</span></span>
<span class="line"><span style="color:#657B83;">					</span><span style="color:#268BD2;">fail</span><span style="color:#657B83;">: (err) </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">						</span><span style="color:#268BD2;">console</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">log</span><span style="color:#657B83;">(</span><span style="color:#268BD2;">err</span><span style="color:#657B83;">, </span><span style="color:#2AA198;">&#39;err&#39;</span><span style="color:#657B83;">)</span></span>
<span class="line"><span style="color:#657B83;">					}</span></span>
<span class="line"><span style="color:#657B83;">				});</span></span>
<span class="line"><span style="color:#657B83;">			},</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// \u957F\u6309\u5220\u9664</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#268BD2;">longpressBtn</span><span style="color:#657B83;">() {</span></span>
<span class="line"><span style="color:#657B83;">				</span><span style="color:#268BD2;">this</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">isLongpress</span><span style="color:#657B83;"> </span><span style="color:#859900;">&amp;&amp;</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">this</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">$emit</span><span style="color:#657B83;">(</span><span style="color:#2AA198;">&#39;getImgPath&#39;</span><span style="color:#657B83;">, [], [])</span></span>
<span class="line"><span style="color:#657B83;">			}</span></span>
<span class="line"><span style="color:#657B83;">		},</span></span>
<span class="line"><span style="color:#657B83;">	};</span></span>
<span class="line"><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">script</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#93A1A1;">&lt;</span><span style="color:#268BD2;">style</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">lang</span><span style="color:#657B83;">=</span><span style="color:#2AA198;">&quot;scss&quot;</span><span style="color:#657B83;"> </span><span style="color:#93A1A1;">scoped&gt;</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#93A1A1;">.upload-img</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">display</span><span style="color:#657B83;">: flex;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#93A1A1;">// width: 100%;</span></span>
<span class="line"><span style="color:#657B83;">	}</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#93A1A1;">.img-item</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">display</span><span style="color:#657B83;">: flex;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">flex-wrap</span><span style="color:#657B83;">: wrap;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">align-items</span><span style="color:#657B83;">: center;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#93A1A1;">// justify-content: center;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">width</span><span style="color:#657B83;">: </span><span style="color:#D33682;">100</span><span style="color:#859900;">%</span><span style="color:#657B83;">;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">height</span><span style="color:#657B83;">: </span><span style="color:#D33682;">100</span><span style="color:#859900;">%</span><span style="color:#657B83;">;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">border-radius</span><span style="color:#657B83;">: </span><span style="color:#D33682;">10</span><span style="color:#657B83;">rpx;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#268BD2;">img</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#859900;">margin</span><span style="color:#657B83;">: </span><span style="color:#D33682;">13</span><span style="color:#657B83;">rpx;</span></span>
<span class="line"><span style="color:#657B83;">		}</span></span>
<span class="line"><span style="color:#657B83;">	}</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#93A1A1;">.imgAdd</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">margin</span><span style="color:#657B83;">: </span><span style="color:#D33682;">13</span><span style="color:#657B83;">rpx;</span></span>
<span class="line"><span style="color:#657B83;">	}</span></span>
<span class="line"><span style="color:#657B83;">	</span><span style="color:#93A1A1;">.imgIcon</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">display</span><span style="color:#657B83;">: flex;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">flex-direction</span><span style="color:#657B83;">: column;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">justify-content</span><span style="color:#657B83;">: center;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">align-items</span><span style="color:#657B83;">: center;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">background</span><span style="color:#657B83;">: </span><span style="color:#CB4B16;">#F6F6F6</span><span style="color:#657B83;">;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">border-radius</span><span style="color:#657B83;">: </span><span style="color:#D33682;">10</span><span style="color:#657B83;">rpx;</span></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#859900;">color</span><span style="color:#657B83;">: </span><span style="color:#CB4B16;">#818181</span><span style="color:#657B83;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#657B83;">		</span><span style="color:#93A1A1;">.add</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// line-height: 78rpx;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#93A1A1;">// height: 100%;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#859900;">font-size</span><span style="color:#657B83;">: </span><span style="color:#D33682;">78</span><span style="color:#657B83;">rpx;</span></span>
<span class="line"><span style="color:#657B83;">			</span><span style="color:#859900;">color</span><span style="color:#657B83;">: </span><span style="color:#CB4B16;">#818181</span><span style="color:#657B83;">;</span></span>
<span class="line"><span style="color:#657B83;">		}</span></span>
<span class="line"><span style="color:#657B83;">	}</span></span>
<span class="line"><span style="color:#93A1A1;">&lt;/</span><span style="color:#268BD2;">style</span><span style="color:#93A1A1;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong><em>\u8BF7\u6C42</em></strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#586E75;">// \u4E0A\u4F20\u56FE\u7247\u5230\u963F\u91CC\u4E91</span></span>
<span class="line"><span style="color:#859900;">export</span><span style="color:#839496;"> </span><span style="color:#93A1A1;font-style:italic;">const</span><span style="color:#839496;"> </span><span style="color:#268BD2;">UploadImgApi</span><span style="color:#839496;"> </span><span style="color:#859900;">=</span><span style="color:#839496;"> (file) </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">  </span><span style="color:#586E75;">// \u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684promise\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#839496;">  </span><span style="color:#859900;">return</span><span style="color:#839496;"> </span><span style="color:#859900;">new</span><span style="color:#839496;"> </span><span style="color:#859900;">Promise</span><span style="color:#839496;">((resolve, reject) </span><span style="color:#93A1A1;font-style:italic;">=&gt;</span><span style="color:#839496;"> {</span></span>
<span class="line"><span style="color:#839496;">    </span><span style="color:#586E75;">//\u4E0A\u4F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#839496;">    </span><span style="color:#268BD2;">uni</span><span style="color:#839496;">.</span><span style="color:#268BD2;">uploadFile</span><span style="color:#839496;">({</span></span>
<span class="line"><span style="color:#839496;">      url: </span><span style="color:#2AA198;">\`\${</span><span style="color:#268BD2;">baseApi</span><span style="color:#2AA198;">}/common/upload\`</span><span style="color:#839496;">, </span><span style="color:#586E75;">//\u8BF7\u6C42\u63A5\u53E3, baseApi \u81EA\u5DF1\u5F15\u5165</span></span>
<span class="line"><span style="color:#839496;">      filePath: </span><span style="color:#268BD2;">file</span><span style="color:#839496;">,</span></span>
<span class="line"><span style="color:#839496;">      name: </span><span style="color:#2AA198;">&quot;image&quot;</span><span style="color:#839496;">, </span><span style="color:#586E75;">// \u6587\u4EF6\u5BF9\u5E94\u7684 key , \u5F00\u53D1\u8005\u5728\u670D\u52A1\u5668\u7AEF\u901A\u8FC7\u8FD9\u4E2A key \u53EF\u4EE5\u83B7\u53D6\u5230\u6587\u4EF6\u4E8C\u8FDB\u5236\u5185\u5BB9</span></span>
<span class="line"><span style="color:#839496;">      formData: {</span></span>
<span class="line"><span style="color:#839496;">        category: </span><span style="color:#2AA198;">&quot;shop_image&quot;</span><span style="color:#839496;">, </span><span style="color:#586E75;">// \u8FD9\u4E2A\u662F\u516C\u53F8\u8981\u4E0A\u4F20\u7684\u963F\u91CC\u4E91\u5FC5\u4F20 \u53C2\u6570</span></span>
<span class="line"><span style="color:#839496;">      },</span></span>
<span class="line"><span style="color:#839496;">      </span><span style="color:#268BD2;">success</span><span style="color:#839496;">(uploadFileRes) {</span></span>
<span class="line"><span style="color:#839496;">        </span><span style="color:#586E75;">// console.log(uploadFileRes.data, &#39;------\u2019&#39;);</span></span>
<span class="line"><span style="color:#839496;">        </span><span style="color:#93A1A1;font-style:italic;">let</span><span style="color:#839496;"> </span><span style="color:#268BD2;">url</span><span style="color:#839496;"> </span><span style="color:#859900;">=</span><span style="color:#839496;"> </span><span style="color:#268BD2;">JSON</span><span style="color:#839496;">.</span><span style="color:#268BD2;">parse</span><span style="color:#839496;">(</span><span style="color:#268BD2;">uploadFileRes</span><span style="color:#839496;">.</span><span style="color:#268BD2;">data</span><span style="color:#839496;">);</span></span>
<span class="line"><span style="color:#839496;">        </span><span style="color:#586E75;">// \u6210\u529F resolve</span></span>
<span class="line"><span style="color:#839496;">        </span><span style="color:#268BD2;">resolve</span><span style="color:#839496;">(</span><span style="color:#268BD2;">url</span><span style="color:#839496;">);</span></span>
<span class="line"><span style="color:#839496;">      },</span></span>
<span class="line"><span style="color:#839496;">    });</span></span>
<span class="line"><span style="color:#839496;">  });</span></span>
<span class="line"><span style="color:#839496;">};</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#93A1A1;">// \u4E0A\u4F20\u56FE\u7247\u5230\u963F\u91CC\u4E91</span></span>
<span class="line"><span style="color:#859900;">export</span><span style="color:#657B83;"> </span><span style="color:#586E75;font-style:italic;">const</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">UploadImgApi</span><span style="color:#657B83;"> </span><span style="color:#859900;">=</span><span style="color:#657B83;"> (file) </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">  </span><span style="color:#93A1A1;">// \u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684promise\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#657B83;">  </span><span style="color:#859900;">return</span><span style="color:#657B83;"> </span><span style="color:#859900;">new</span><span style="color:#657B83;"> </span><span style="color:#859900;">Promise</span><span style="color:#657B83;">((resolve, reject) </span><span style="color:#586E75;font-style:italic;">=&gt;</span><span style="color:#657B83;"> {</span></span>
<span class="line"><span style="color:#657B83;">    </span><span style="color:#93A1A1;">//\u4E0A\u4F20\u56FE\u7247</span></span>
<span class="line"><span style="color:#657B83;">    </span><span style="color:#268BD2;">uni</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">uploadFile</span><span style="color:#657B83;">({</span></span>
<span class="line"><span style="color:#657B83;">      url: </span><span style="color:#2AA198;">\`\${</span><span style="color:#268BD2;">baseApi</span><span style="color:#2AA198;">}/common/upload\`</span><span style="color:#657B83;">, </span><span style="color:#93A1A1;">//\u8BF7\u6C42\u63A5\u53E3, baseApi \u81EA\u5DF1\u5F15\u5165</span></span>
<span class="line"><span style="color:#657B83;">      filePath: </span><span style="color:#268BD2;">file</span><span style="color:#657B83;">,</span></span>
<span class="line"><span style="color:#657B83;">      name: </span><span style="color:#2AA198;">&quot;image&quot;</span><span style="color:#657B83;">, </span><span style="color:#93A1A1;">// \u6587\u4EF6\u5BF9\u5E94\u7684 key , \u5F00\u53D1\u8005\u5728\u670D\u52A1\u5668\u7AEF\u901A\u8FC7\u8FD9\u4E2A key \u53EF\u4EE5\u83B7\u53D6\u5230\u6587\u4EF6\u4E8C\u8FDB\u5236\u5185\u5BB9</span></span>
<span class="line"><span style="color:#657B83;">      formData: {</span></span>
<span class="line"><span style="color:#657B83;">        category: </span><span style="color:#2AA198;">&quot;shop_image&quot;</span><span style="color:#657B83;">, </span><span style="color:#93A1A1;">// \u8FD9\u4E2A\u662F\u516C\u53F8\u8981\u4E0A\u4F20\u7684\u963F\u91CC\u4E91\u5FC5\u4F20 \u53C2\u6570</span></span>
<span class="line"><span style="color:#657B83;">      },</span></span>
<span class="line"><span style="color:#657B83;">      </span><span style="color:#268BD2;">success</span><span style="color:#657B83;">(uploadFileRes) {</span></span>
<span class="line"><span style="color:#657B83;">        </span><span style="color:#93A1A1;">// console.log(uploadFileRes.data, &#39;------\u2019&#39;);</span></span>
<span class="line"><span style="color:#657B83;">        </span><span style="color:#586E75;font-style:italic;">let</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">url</span><span style="color:#657B83;"> </span><span style="color:#859900;">=</span><span style="color:#657B83;"> </span><span style="color:#268BD2;">JSON</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">parse</span><span style="color:#657B83;">(</span><span style="color:#268BD2;">uploadFileRes</span><span style="color:#657B83;">.</span><span style="color:#268BD2;">data</span><span style="color:#657B83;">);</span></span>
<span class="line"><span style="color:#657B83;">        </span><span style="color:#93A1A1;">// \u6210\u529F resolve</span></span>
<span class="line"><span style="color:#657B83;">        </span><span style="color:#268BD2;">resolve</span><span style="color:#657B83;">(</span><span style="color:#268BD2;">url</span><span style="color:#657B83;">);</span></span>
<span class="line"><span style="color:#657B83;">      },</span></span>
<span class="line"><span style="color:#657B83;">    });</span></span>
<span class="line"><span style="color:#657B83;">  });</span></span>
<span class="line"><span style="color:#657B83;">};</span></span>
<span class="line"></span></code></pre></div>`,6),o=[t];function e(c,r,y,i,B,A){return a(),n("div",null,o)}const g=s(p,[["render",e]]);export{u as __pageData,g as default};
