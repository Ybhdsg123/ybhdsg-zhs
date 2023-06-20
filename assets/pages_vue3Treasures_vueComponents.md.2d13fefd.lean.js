import{_ as m,l as q,e as D,h as S,o as h,c as F,b as n,t as B,n as z,u as E,x as L,y as M,i as I,z as N,p as R,d as j,g as u,w as O,a as C,j as A}from"./app.786c4712.js";const P=["data-text"],W={__name:"autoEllipsis",props:{text:{type:String,default:""},showLine:{type:[Number,String],default:1},isShowSuffix:{type:Boolean,default:!1},textStyle:{type:Object,default:()=>{}}},setup(o){const s=o;q(a=>({"4a201898":s.showLine}));const t={fontSize:"12px",...s.textStyle},l=D(null),e=D(s.text),i=parseInt(t.fontSize),p=D(!1);S(()=>{const{text:a,isShowEllipsis:r}=c(l.value,s.text);e.value=a,p.value=r});const c=(a,r)=>{let g;const _=a&&a.clientWidth;if(g=d(r.trim(),i)>=_*s.showLine,g&&s.isShowSuffix){const v=r.split(".").reverse()[0],b=Math.round((v.length+1)*.5),y=(Math.ceil(_/i)*s.showLine).toFixed(0)-b-2;r=r.slice(0,y)+"..."+v}return{text:r,isShowEllipsis:g}},d=(a,r=10)=>{const _=document.createElement("canvas").getContext("2d"),f=window.devicePixelRatio||1,v=f*r,b=t.fontStyle||"sans-serif";_.font=`${v}px ${b}`;const y=_.measureText(a),w=y.width,T=y.actualBoundingBoxRight+y.actualBoundingBoxLeft;return Math.max(w*f,T*f)};return(a,r)=>(h(),F("div",{class:"auto-ellipsis hover-tip","data-text":s.text,ref_key:"autoEllipsisRef",ref:l},[n("span",{class:z([p.value?"overflow-hide-moreline":""]),style:t},B(e.value),3)],8,P))}},x=m(W,[["__scopeId","data-v-25f41da0"]]);const $={class:"my-loading"},V={__name:"loading",props:{size:{type:[Number,String],default:"mini"}},setup(o){const s=o;q(p=>({"73f791dc":E(i),"6cd8e7b8":E(e)}));const l={mini:60,small:80,medium:100,large:200}[s.size];let e;S(()=>{e=window.devicePixelRatio});const i=l?l+"px":s.size+"px";return(p,c)=>(h(),F("div",$))}},k=m(V,[["__scopeId","data-v-bba6dd69"]]);function U(o){return L(()=>{const s=document.createElement("canvas"),t=s.getContext("2d"),l=window.devicePixelRatio||1,i=o.fontSize*l+"px serif";t.font=i;const{width:p,actualBoundingBoxRight:c,actualBoundingBoxLeft:d}=t.measureText(o.text),a=Math.max(100,p,c+d)+o.gap*l;return s.width=a,s.height=a,t.translate(s.width/2,s.height/2),t.rotate(Math.PI/180*-45),t.fillStyle="#f40",t.textAlign="left",t.textBaseline="middle",t.fillText(o.text,0,0),{base64:s.toDataURL(),size:a,styleSize:a/l}})}const H={__name:"imgWatermark",props:{text:{type:String,required:!0,default:"waterMark"},fontSize:{type:Number,default:16},gap:{type:Number,default:10}},setup(o){const s=o,t=D(null),l=U(s);let e;const i=D(0);M(()=>{if(i.value,!t.value)return;e&&e.remove();const{base64:c,size:d,styleSize:a}=l.value;e=document.createElement("div"),e.style.backgroundImage=`url(${c})`,e.style.backgroundSize=`${a}px ${a}px`,e.style.backgroundRepeat="repeat",e.style.pointerEvents="none",e.style.position="absolute",e.style.zInde=9999,e.style.inset=0,t.value.appendChild(e)});let p;return S(()=>{p=new MutationObserver(c=>{for(const d of c){for(const a of d.removedNodes)if(a===e){i.value++;return}if(d.target===e){i.value++;return}}}),p.observe(t.value,{childList:!0,attributes:!0,subtree:!0})}),I(()=>{p&&p.disconnect(),e=null}),(c,d)=>(h(),F("div",{class:"water-mark",ref_key:"parentRef",ref:t},[N(c.$slots,"default",{},void 0,!0)],512))}},J=m(H,[["__scopeId","data-v-d83102da"]]);const G={},K=o=>(R("data-v-ea570d53"),o=o(),j(),o),Q={class:"content"},X=K(()=>n("div",{class:"crash-ball-loading"},[n("div",{class:"ball left-ball"}),n("div",{class:"ball right-ball"})],-1)),Y=[X];function Z(o,s){return h(),F("div",Q,Y)}const ss=m(G,[["render",Z],["__scopeId","data-v-ea570d53"]]),es=C("",3),ts={style:{width:"180px"}},as=C("",4),ns=C("",3),os=n("blockquote",null,[n("p",null,"\u4EE3\u7801\u5730\u5740\uFF1Apages/vue3Treasures/components/crashBallLoading.vue")],-1),ls=n("h2",{id:"_3-\u56FE\u7247\u6C34\u5370",tabindex:"-1"},[A("3. \u56FE\u7247\u6C34\u5370 "),n("a",{class:"header-anchor",href:"#_3-\u56FE\u7247\u6C34\u5370","aria-hidden":"true"},"#")],-1),ps=n("div",null,[A(" MutationObserver \u63A5\u53E3\u63D0\u4F9B\u4E86\u76D1\u89C6\u5BF9 DOM \u6811\u6240\u505A\u66F4\u6539\u7684\u80FD\u529B\u3002\u5B83\u88AB\u8BBE\u8BA1\u4E3A\u65E7\u7684 Mutation Events \u529F\u80FD\u7684\u66FF\u4EE3\u54C1\uFF0C\u8BE5\u529F\u80FD\u662F DOM3 Events \u89C4\u8303\u7684\u4E00\u90E8\u5206\u3002 "),n("p",null,"disconnect(): \u5173\u95ED\u76D1\u542C\uFF0C \u963B\u6B62 MutationObserver \u5B9E\u4F8B\u7EE7\u7EED\u63A5\u6536\u7684\u901A\u77E5\uFF0C\u76F4\u5230\u518D\u6B21\u8C03\u7528\u5176 observe() \u65B9\u6CD5\uFF0C\u8BE5\u89C2\u5BDF\u8005\u5BF9\u8C61\u5305\u542B\u7684\u56DE\u8C03\u51FD\u6570\u90FD\u4E0D\u4F1A\u518D\u88AB\u8C03\u7528\u3002"),n("p",null,"observe(): \u5F00\u542F\u76D1\u542C\uFF0C\u914D\u7F6E MutationObserver \u5728 DOM \u66F4\u6539\u5339\u914D\u7ED9\u5B9A\u9009\u9879\u65F6\uFF0C\u901A\u8FC7\u5176\u56DE\u8C03\u51FD\u6570\u5F00\u59CB\u63A5\u6536\u901A\u77E5\u3002"),n("p",null,"takeRecords():\u4ECE MutationObserver \u7684\u901A\u77E5\u961F\u5217\u4E2D\u5220\u9664\u6240\u6709\u5F85\u5904\u7406\u7684\u901A\u77E5\uFF0C\u5E76\u5C06\u5B83\u4EEC\u8FD4\u56DE\u5230 MutationRecord \u5BF9\u8C61\u7684\u65B0 Array \u4E2D\u3002")],-1),is=n("blockquote",null,[n("p",null,"\u4EE3\u7801\u5730\u5740\uFF1Apages/vue3Treasures/components/imgWatermark.vue")],-1),cs=n("blockquote",null,[n("p",null,[n("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver",target:"_blank",rel:"noreferrer"},"MutationObserver----MDN")])],-1),us=JSON.parse('{"title":"\u622A\u53D6\u5B57\u7B26\u7EC4\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u81EA\u52A8\u7701\u7565\u6587\u672C","slug":"_1-\u81EA\u52A8\u7701\u7565\u6587\u672C","link":"#_1-\u81EA\u52A8\u7701\u7565\u6587\u672C","children":[]},{"level":2,"title":"2. loading \u6548\u679C","slug":"_2-loading-\u6548\u679C","link":"#_2-loading-\u6548\u679C","children":[{"level":3,"title":"2.1 \u8F6C\u5708 loading","slug":"_2-1-\u8F6C\u5708-loading","link":"#_2-1-\u8F6C\u5708-loading","children":[]},{"level":3,"title":"2.2 \u5C0F\u7403\u78B0\u649E loading","slug":"_2-2-\u5C0F\u7403\u78B0\u649E-loading","link":"#_2-2-\u5C0F\u7403\u78B0\u649E-loading","children":[]}]},{"level":2,"title":"3. \u56FE\u7247\u6C34\u5370","slug":"_3-\u56FE\u7247\u6C34\u5370","link":"#_3-\u56FE\u7247\u6C34\u5370","children":[]}],"relativePath":"pages/vue3Treasures/vueComponents.md"}'),rs={name:"pages/vue3Treasures/vueComponents.md"},_s=Object.assign(rs,{setup(o){return(s,t)=>(h(),F("div",null,[es,n("div",ts,[u(x,{text:"1. \u5355\u884C\u5C55\u793A\u9ED8\u8BA4\u7701\u7565 \u5355\u884C\u5C55\u793A\u9ED8\u8BA4\u7701\u7565"})]),u(x,{style:{width:"200px"},isShowSuffix:"",text:"2. \u5355\u884C\u5E26\u540E\u7F00\u7701\u7565\u5355\u884C\u5E26\u540E\u7F00\u7701\u7565\u5355\u884C\u5E26\u540E\u7F00\u7701\u7565.jpeg"}),u(x,{style:{width:"80px"},showLine:2,text:"3. \u591A\u884C\u5C55\u793A\u9ED8\u8BA4\u7701\u7565\u5C55\u793A\u9ED8\u8BA4\u7701\u7565.jpeg"}),u(x,{style:{width:"220px"},isShowSuffix:"",showLine:2,text:"4. \u591A\u884C\u5C55\u793A\u5E26\u540E\u7F00\u7701\u7565\u591A\u884C\u5C55\u793A\u5E26\u540E\u7F00\u7701\u7565.jpg\u591A\u884C\u5C55\u793A\u5E26\u540E\u7F00\u7701\u7565\u591A\u884C\u5C55\u793A\u5E26\u540E\u7F00\u7701\u7565.jpg"}),as,u(k),u(k,{size:30}),ns,u(ss),os,ls,u(J,{text:"\u4FB5\u6743\u5FC5\u7A76"},{default:O(()=>[ps]),_:1}),is,cs]))}});export{us as __pageData,_s as default};
