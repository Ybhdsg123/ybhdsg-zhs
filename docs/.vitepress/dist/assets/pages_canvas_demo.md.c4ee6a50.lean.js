import{_ as D,h as S,o as x,c as w,p as k,d as $,b as s,e as f,t as T,F as B,i as q,u as V,g as C,j as I,a as F}from"./app.9e7ecbd3.js";const P=c=>(k("data-v-56ad4510"),c=c(),$(),c),R={style:{width:"600px"}},L=P(()=>s("canvas",{id:"canvas-dom",width:"600",height:"300"}," \u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301canvas\u5143\u7D20\uFF0C\u8BF7\u5347\u7EA7\u6216\u66F4\u6362\u6D4F\u89C8\u5668\uFF01 ",-1)),H=[L],N={__name:"smallBalls",setup(c){return S(()=>{const o=document.getElementById("canvas-dom");if(o.width=600,o.getContext){let d=function(){t.fillStyle="rgba(255, 255, 255, 0.3)",t.fillRect(0,0,o.width,o.height),e.draw(),e.vy*=.99,e.vy+=.15,e.x+=e.vx,e.y+=e.vy,(e.x+e.vx>o.width||e.x+e.vx<0)&&(e.vx=-e.vx),(e.y+e.vy>o.height||e.y+e.vy<0)&&(e.vy=-e.vy,e.y+e.vy>310&&(e.y=50)),window.requestAnimationFrame(d)};const t=o.getContext("2d");let e={x:50,y:50,vx:1,vy:3,radius:10,color:"blue",draw:function(){t.beginPath(),t.arc(this.x,this.y,this.radius,0,Math.PI*2,!1),t.closePath(),t.fillStyle=this.color,t.fill()}};window.requestAnimationFrame(d),e.draw()}}),(o,t)=>(x(),w("div",R,H))}},X=D(N,[["__scopeId","data-v-56ad4510"]]);const Y=c=>(k("data-v-a763a1e1"),c=c(),$(),c),M=Y(()=>s("canvas",{id:"themeCanvas",width:"600",height:"300"},null,-1)),W={__name:"themeChange",setup(c){const o="https://img2.baidu.com/it/u=4044887937,3129736188&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=392";let t=null,e=null,d=null;const i=f(""),m=f("");S(()=>{e=document.getElementById("themeCanvas"),t=e.getContext("2d",{willReadFrequently:!0}),d=new Image,d.crossOrigin="Anonymous",d.src=o,d.onload=()=>{t.drawImage(d,0,0,600,300),d.style.display="none"},e.addEventListener("mousemove",function(a){l("move",a)}),e.addEventListener("click",a=>{l("click",a)});function l(a,n){const g=n.offsetX,p=n.offsetY,_=t.getImageData(g,p,1,1).data,v=`rgba(${_[0]}, ${_[1]}, ${_[2]}, ${_[3]/255})`;if(a=="move")i.value=v;else{m.value=v;const A=t.getImageData(0,0,e.width,e.height),b=A.data;for(let y=0;y<=b.length;y+=4)b[y]=_[0],b[y+1]=_[1],b[y+2]=_[2];t.putImageData(A,0,0)}return v}});const u=()=>{t.drawImage(d,0,0,600,300)},r=()=>{u();const l=t.getImageData(0,0,e.width,e.height),a=l.data;for(let n=0;n<=a.length;n+=4){const g=(a[n]+a[n+1]+a[n+2])/3;a[n]=g,a[n+1]=g,a[n+2]=g}t.putImageData(l,0,0)},h=()=>{u();const l=t.getImageData(0,0,e.width,e.height),a=l.data;for(let n=0;n<=a.length;n+=4)a[n]=255-a[n],a[n+1]=255-a[n+1],a[n+2]=255-a[n+2];t.putImageData(l,0,0)};return(l,a)=>(x(),w(B,null,[M,s("div",null,"\u5212\u8FC7\u7684\u989C\u8272\u4E3A\uFF1A"+T(i.value),1),s("div",null,"\u9009\u4E2D\u7684\u989C\u8272\uFF1A "+T(m.value),1),s("button",{onClick:u},"\u8FD8\u539F"),s("button",{onClick:r},"\u9ED1\u767D"),s("button",{onClick:h},"\u66DD\u5149")],64))}},O=D(W,[["__scopeId","data-v-a763a1e1"]]);const j=c=>(k("data-v-cbe5a4a7"),c=c(),$(),c),z=j(()=>s("canvas",{id:"signatureCanvas",width:"600",height:"300"},null,-1)),J={__name:"Signature",setup(c){let o=null,t=null;S(()=>{t=document.getElementById("signatureCanvas"),o=t.getContext("2d"),t.addEventListener("mouseenter",()=>{t.addEventListener("mousedown",i=>{o.beginPath(),o.moveTo(i.offsetX,i.offsetY),t.addEventListener("mousemove",d)}),t.addEventListener("mouseup",()=>{t.removeEventListener("mousemove",d)})});const d=i=>{o.lineTo(i.offsetX,i.offsetY),o.stroke()}});const e=()=>{o.clearRect(0,0,t.width,t.height)};return(d,i)=>(x(),w(B,null,[z,s("button",{onClick:e},"\u6E05\u7A7A\u753B\u5E03")],64))}},U=D(J,[["__scopeId","data-v-cbe5a4a7"]]),G="/ybhdsg-zhs/assets/\u672C\u8349\u7EB2\u76EE.3e97399a.mp3";const K=c=>(k("data-v-e31c5567"),c=c(),$(),c),Q=K(()=>s("canvas",null,null,-1)),Z=["src"],ee={__name:"audioVisualisation",setup(c){const o=f(null);let t=f([]),e=f(!1),d;return S(()=>{const i=document.querySelector("audio"),m=document.querySelector("canvas"),u=m.getContext("2d");i.onplay=function(){if(e.value)return;const r=new AudioContext,h=r.createMediaElementSource(i);o.value=r.createAnalyser(),o.value.fftSize=512,t.value=new Uint8Array(o.value.frequencyBinCount),h.connect(o.value),o.value.connect(r.destination),e.value=!0},d=()=>{requestAnimationFrame(d);const{width:r,height:h}=m;if(u.clearRect(0,0,r,h),!e.value)return;o.value.getByteFrequencyData(t.value);const l=t.value.length/2,a=r/l/2;console.log(l),u.fillStyle="#e0f9b5";for(let n=0;n<l;n++){const p=t.value[n]/255*h,E=n*a+r/2,_=r/2-(n+1)*a,v=h-p;u.fillRect(E,v,a-2,p),u.fillRect(_,v,a-2,p)}},d()}),q(()=>{window.requestAnimationFrame(d)}),(i,m)=>(x(),w("div",null,[Q,s("audio",{src:V(G),controls:""},null,8,Z)]))}},te=D(ee,[["__scopeId","data-v-e31c5567"]]),ae=s("h1",{id:"canvas-\u7684\u5C0F-demo",tabindex:"-1"},[I("canvas \u7684\u5C0F demo "),s("a",{class:"header-anchor",href:"#canvas-\u7684\u5C0F-demo","aria-hidden":"true"},"#")],-1),ne=s("h2",{id:"_1-\u97F3\u9891\u53EF\u89C6\u5316",tabindex:"-1"},[I("1. \u97F3\u9891\u53EF\u89C6\u5316 "),s("a",{class:"header-anchor",href:"#_1-\u97F3\u9891\u53EF\u89C6\u5316","aria-hidden":"true"},"#")],-1),oe=s("h2",{id:"_2-\u5C0F\u7403\u7684\u81EA\u7531\u843D\u4F53\u8FD0\u52A8",tabindex:"-1"},[I("2. \u5C0F\u7403\u7684\u81EA\u7531\u843D\u4F53\u8FD0\u52A8 "),s("a",{class:"header-anchor",href:"#_2-\u5C0F\u7403\u7684\u81EA\u7531\u843D\u4F53\u8FD0\u52A8","aria-hidden":"true"},"#")],-1),se=s("h2",{id:"_3-\u70DF\u82B1",tabindex:"-1"},[I("3. \u70DF\u82B1 "),s("a",{class:"header-anchor",href:"#_3-\u70DF\u82B1","aria-hidden":"true"},"#")],-1),ce=s("h2",{id:"_4-\u4E3B\u9898\u8272\u6539\u53D8-\u56FE\u7247\u52A0\u4E0A\u6EE4\u955C-\u548C\u62FE\u8272\u5668",tabindex:"-1"},[I("4. \u4E3B\u9898\u8272\u6539\u53D8\uFF08\u56FE\u7247\u52A0\u4E0A\u6EE4\u955C\uFF09\u548C\u62FE\u8272\u5668 "),s("a",{class:"header-anchor",href:"#_4-\u4E3B\u9898\u8272\u6539\u53D8-\u56FE\u7247\u52A0\u4E0A\u6EE4\u955C-\u548C\u62FE\u8272\u5668","aria-hidden":"true"},"#")],-1),de=F("",3),re=JSON.parse('{"title":"canvas \u7684\u5C0F demo","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u97F3\u9891\u53EF\u89C6\u5316","slug":"_1-\u97F3\u9891\u53EF\u89C6\u5316","link":"#_1-\u97F3\u9891\u53EF\u89C6\u5316","children":[]},{"level":2,"title":"2. \u5C0F\u7403\u7684\u81EA\u7531\u843D\u4F53\u8FD0\u52A8","slug":"_2-\u5C0F\u7403\u7684\u81EA\u7531\u843D\u4F53\u8FD0\u52A8","link":"#_2-\u5C0F\u7403\u7684\u81EA\u7531\u843D\u4F53\u8FD0\u52A8","children":[]},{"level":2,"title":"3. \u70DF\u82B1","slug":"_3-\u70DF\u82B1","link":"#_3-\u70DF\u82B1","children":[]},{"level":2,"title":"4. \u4E3B\u9898\u8272\u6539\u53D8\uFF08\u56FE\u7247\u52A0\u4E0A\u6EE4\u955C\uFF09\u548C\u62FE\u8272\u5668","slug":"_4-\u4E3B\u9898\u8272\u6539\u53D8-\u56FE\u7247\u52A0\u4E0A\u6EE4\u955C-\u548C\u62FE\u8272\u5668","link":"#_4-\u4E3B\u9898\u8272\u6539\u53D8-\u56FE\u7247\u52A0\u4E0A\u6EE4\u955C-\u548C\u62FE\u8272\u5668","children":[]},{"level":2,"title":"5. \u7B7E\u540D","slug":"_5-\u7B7E\u540D","link":"#_5-\u7B7E\u540D","children":[]}],"relativePath":"pages/canvas/demo.md"}'),ie={name:"pages/canvas/demo.md"},_e=Object.assign(ie,{setup(c){return(o,t)=>(x(),w("div",null,[ae,ne,C(te),oe,C(X),se,ce,C(O),de,C(U)]))}});export{re as __pageData,_e as default};
