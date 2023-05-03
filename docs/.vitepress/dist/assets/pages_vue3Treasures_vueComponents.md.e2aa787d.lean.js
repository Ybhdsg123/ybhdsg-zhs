import{_ as v,l as E,e as y,h as w,o as f,c as x,b as o,t as k,n as z,u as T,m as A,q as B,i as M,s as L,g as d,w as N,j as b,a as C}from"./app.9e7ecbd3.js";const R=["data-text"],I={__name:"autoEllipsis",props:{text:{type:String,default:""},showLine:{type:[Number,String],default:1},isShowSuffix:{type:Boolean,default:!1},textStyle:{type:Object,default:()=>{}}},setup(a){const s=a;E(n=>({"5275ed82":s.showLine}));const t={fontSize:"12px",...s.textStyle},l=y(null),e=y(s.text),i=parseInt(t.fontSize),p=y(!1);w(()=>{const{text:n,isShowEllipsis:c}=u(l.value,s.text);e.value=n,p.value=c});const u=(n,c)=>{let D;const _=n&&n.clientWidth;if(D=r(c.trim(),i)>=_*s.showLine,D&&s.isShowSuffix){const F=c.split(".").reverse()[0],m=Math.round((F.length+1)*.5),q=(Math.ceil(_/i)*s.showLine).toFixed(0)-m-2;c=c.slice(0,q)+"..."+F}return{text:c,isShowEllipsis:D}},r=(n,c=10)=>{const _=document.createElement("canvas").getContext("2d");_.font=`${c}px sans-serif`;const h=_.measureText(n),F=h.width,m=h.actualBoundingBoxRight+h.actualBoundingBoxLeft;return Math.max(F,m)};return(n,c)=>(f(),x("div",{class:"auto-ellipsis hover-tip","data-text":s.text,ref_key:"autoEllipsisRef",ref:l},[o("span",{class:z([p.value?"overflow-hide-moreline":""]),style:t},k(e.value),3)],8,R))}},g=v(I,[["__scopeId","data-v-620bad8d"]]);const O={class:"my-loading"},j={__name:"loading",props:{size:{type:[Number,String],default:"mini"}},setup(a){const s=a;E(i=>({"560527bc":T(e)}));const l={mini:60,small:80,medium:100,large:200}[s.size],e=l?l+"px":s.size+"px";return(i,p)=>(f(),x("div",O))}},S=v(j,[["__scopeId","data-v-65c082ce"]]);function W(a){return A(()=>{const s=document.createElement("canvas"),t=s.getContext("2d"),l=window.devicePixelRatio||1,i=a.fontSize*l+"px serif";t.font=i;const{width:p,actualBoundingBoxRight:u,actualBoundingBoxLeft:r}=t.measureText(a.text),n=Math.max(100,p,u+r)+a.gap*l;return s.width=n,s.height=n,t.translate(s.width/2,s.height/2),t.rotate(Math.PI/180*-45),t.fillStyle="#f40",t.textAlign="left",t.textBaseline="middle",t.fillText(a.text,0,0),{base64:s.toDataURL(),size:n,styleSize:n/l}})}const $={__name:"imgWatermark",props:{text:{type:String,required:!0,default:"waterMark"},fontSize:{type:Number,default:16},gap:{type:Number,default:10}},setup(a){const s=a,t=y(null),l=W(s);let e;const i=y(0);B(()=>{if(i.value,!t.value)return;e&&e.remove();const{base64:u,styleSize:r}=l.value;e=document.createElement("div"),e.style.backgroundImage=`url(${u})`,e.style.backgroundSize=`${r}px ${r}px`,e.style.backgroundRepeat="repeat",e.style.pointerEvents="none",e.style.position="absolute",e.style.zInde=9999,e.style.inset=0,t.value.appendChild(e)});let p;return w(()=>{p=new MutationObserver(u=>{for(const r of u){for(const n of r.removedNodes)if(n===e){i.value++;return}if(r.target===e){i.value++;return}}}),p.observe(t.value,{childList:!0,attributes:!0,subtree:!0})}),M(()=>{p&&p.disconnect(),e=null}),(u,r)=>(f(),x("div",{class:"water-mark",ref_key:"parentRef",ref:t},[L(u.$slots,"default",{},void 0,!0)],512))}},P=v($,[["__scopeId","data-v-88668346"]]),V=o("h1",{id:"\u622A\u53D6\u5B57\u7B26\u7EC4\u4EF6",tabindex:"-1"},[b("\u622A\u53D6\u5B57\u7B26\u7EC4\u4EF6 "),o("a",{class:"header-anchor",href:"#\u622A\u53D6\u5B57\u7B26\u7EC4\u4EF6","aria-hidden":"true"},"#")],-1),U=o("h2",{id:"_1-\u81EA\u52A8\u7701\u7565\u6587\u672C",tabindex:"-1"},[b("1. \u81EA\u52A8\u7701\u7565\u6587\u672C "),o("a",{class:"header-anchor",href:"#_1-\u81EA\u52A8\u7701\u7565\u6587\u672C","aria-hidden":"true"},"#")],-1),H={style:{width:"80px"}},J=C("",3),G=C("",3),K=o("div",null,[b(" MutationObserver \u63A5\u53E3\u63D0\u4F9B\u4E86\u76D1\u89C6\u5BF9 DOM \u6811\u6240\u505A\u66F4\u6539\u7684\u80FD\u529B\u3002\u5B83\u88AB\u8BBE\u8BA1\u4E3A\u65E7\u7684 Mutation Events \u529F\u80FD\u7684\u66FF\u4EE3\u54C1\uFF0C\u8BE5\u529F\u80FD\u662F DOM3 Events \u89C4\u8303\u7684\u4E00\u90E8\u5206\u3002 "),o("p",null,"disconnect():\u963B\u6B62 MutationObserver \u5B9E\u4F8B\u7EE7\u7EED\u63A5\u6536\u7684\u901A\u77E5\uFF0C\u76F4\u5230\u518D\u6B21\u8C03\u7528\u5176 observe() \u65B9\u6CD5\uFF0C\u8BE5\u89C2\u5BDF\u8005\u5BF9\u8C61\u5305\u542B\u7684\u56DE\u8C03\u51FD\u6570\u90FD\u4E0D\u4F1A\u518D\u88AB\u8C03\u7528\u3002"),o("p",null,"observe():\u914D\u7F6E MutationObserver \u5728 DOM \u66F4\u6539\u5339\u914D\u7ED9\u5B9A\u9009\u9879\u65F6\uFF0C\u901A\u8FC7\u5176\u56DE\u8C03\u51FD\u6570\u5F00\u59CB\u63A5\u6536\u901A\u77E5\u3002"),o("p",null,"takeRecords():\u4ECE MutationObserver \u7684\u901A\u77E5\u961F\u5217\u4E2D\u5220\u9664\u6240\u6709\u5F85\u5904\u7406\u7684\u901A\u77E5\uFF0C\u5E76\u5C06\u5B83\u4EEC\u8FD4\u56DE\u5230 MutationRecord \u5BF9\u8C61\u7684\u65B0 Array \u4E2D\u3002")],-1),Q=o("blockquote",null,[o("p",null,"\u4EE3\u7801\u5730\u5740\uFF1Apages/vue3Treasures/components/imgWatermark.vue")],-1),X=o("blockquote",null,[o("p",null,[o("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver",target:"_blank",rel:"noreferrer"},"MutationObserver----MDN")])],-1),es=JSON.parse('{"title":"\u622A\u53D6\u5B57\u7B26\u7EC4\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u81EA\u52A8\u7701\u7565\u6587\u672C","slug":"_1-\u81EA\u52A8\u7701\u7565\u6587\u672C","link":"#_1-\u81EA\u52A8\u7701\u7565\u6587\u672C","children":[]},{"level":2,"title":"2. loading \u6548\u679C","slug":"_2-loading-\u6548\u679C","link":"#_2-loading-\u6548\u679C","children":[]},{"level":2,"title":"3. \u56FE\u7247\u6C34\u5370","slug":"_3-\u56FE\u7247\u6C34\u5370","link":"#_3-\u56FE\u7247\u6C34\u5370","children":[]}],"relativePath":"pages/vue3Treasures/vueComponents.md"}'),Y={name:"pages/vue3Treasures/vueComponents.md"},ts=Object.assign(Y,{setup(a){return(s,t)=>(f(),x("div",null,[V,U,o("div",H,[d(g,{text:"1. \u5355\u884C\u5C55\u793A\u9ED8\u8BA4\u7701\u7565"})]),d(g,{style:{width:"100px"},isShowSuffix:"",text:"2. \u5355\u884C\u5E26\u540E\u7F00\u7701\u7565.jpeg"}),d(g,{style:{width:"80px"},showLine:2,text:"3. \u591A\u884C\u5C55\u793A\u9ED8\u8BA4\u7701\u7565\u5C55\u793A\u9ED8\u8BA4\u7701\u7565.jpeg"}),d(g,{style:{width:"90px"},isShowSuffix:"",showLine:2,text:"4. \u591A\u884C\u5C55\u793A\u5E26\u540E\u7F00\u7701\u7565\u591A\u884C\u5C55\u793A\u5E26\u540E\u7F00\u7701\u7565.jpg"}),J,d(S),d(S,{size:30}),G,d(P,{text:"\u4FB5\u6743\u5FC5\u7A76"},{default:N(()=>[K]),_:1}),Q,X]))}});export{es as __pageData,ts as default};
