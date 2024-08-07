import{_ as O,l as N,e as V,o as z,c as P,F as L,r as B,b as T,n as H,m as R,g as U,j as $,a as J}from"./app.c9397b7c.js";(function(g,w){typeof exports=="object"&&typeof module<"u"?module.exports=w():typeof define=="function"&&define.amd?define(w):(g||self).ColorThief=w()})(globalThis,function(){if(!g)var g={map:function(e,p){var C={};return p?e.map(function(y,D){return C.index=D,p.call(C,y)}):e.slice()},naturalOrder:function(e,p){return e<p?-1:e>p?1:0},sum:function(e,p){var C={};return e.reduce(p?function(y,D,h){return C.index=h,y+p.call(C,D)}:function(y,D){return y+D},0)},max:function(e,p){return Math.max.apply(null,p?g.map(e,p):e)}};var w=function(){var e=5,p=8-e,C=1e3;function y(n,s,l){return(n<<2*e)+(s<<e)+l}function D(n){var s=[],l=!1;function c(){s.sort(n),l=!0}return{push:function(o){s.push(o),l=!1},peek:function(o){return l||c(),o===void 0&&(o=s.length-1),s[o]},pop:function(){return l||c(),s.pop()},size:function(){return s.length},map:function(o){return s.map(o)},debug:function(){return l||c(),s}}}function h(n,s,l,c,o,a,F){var t=this;t.r1=n,t.r2=s,t.g1=l,t.g2=c,t.b1=o,t.b2=a,t.histo=F}function A(){this.vboxes=new D(function(n,s){return g.naturalOrder(n.vbox.count()*n.vbox.volume(),s.vbox.count()*s.vbox.volume())})}function _(n,s){if(s.count()){var l=s.r2-s.r1+1,c=s.g2-s.g1+1,o=g.max([l,c,s.b2-s.b1+1]);if(s.count()==1)return[s.copy()];var a,F,t,r,u=0,d=[],f=[];if(o==l)for(a=s.r1;a<=s.r2;a++){for(r=0,F=s.g1;F<=s.g2;F++)for(t=s.b1;t<=s.b2;t++)r+=n[y(a,F,t)]||0;d[a]=u+=r}else if(o==c)for(a=s.g1;a<=s.g2;a++){for(r=0,F=s.r1;F<=s.r2;F++)for(t=s.b1;t<=s.b2;t++)r+=n[y(F,a,t)]||0;d[a]=u+=r}else for(a=s.b1;a<=s.b2;a++){for(r=0,F=s.r1;F<=s.r2;F++)for(t=s.g1;t<=s.g2;t++)r+=n[y(F,t,a)]||0;d[a]=u+=r}return d.forEach(function(v,m){f[m]=u-v}),function(v){var m,x,b,I,E,j=v+"1",q=v+"2",S=0;for(a=s[j];a<=s[q];a++)if(d[a]>u/2){for(b=s.copy(),I=s.copy(),E=(m=a-s[j])<=(x=s[q]-a)?Math.min(s[q]-1,~~(a+x/2)):Math.max(s[j],~~(a-1-m/2));!d[E];)E++;for(S=f[E];!S&&d[E-1];)S=f[--E];return b[q]=E,I[j]=b[q]+1,[b,I]}}(o==l?"r":o==c?"g":"b")}}return h.prototype={volume:function(n){var s=this;return s._volume&&!n||(s._volume=(s.r2-s.r1+1)*(s.g2-s.g1+1)*(s.b2-s.b1+1)),s._volume},count:function(n){var s=this,l=s.histo;if(!s._count_set||n){var c,o,a,F=0;for(c=s.r1;c<=s.r2;c++)for(o=s.g1;o<=s.g2;o++)for(a=s.b1;a<=s.b2;a++)F+=l[y(c,o,a)]||0;s._count=F,s._count_set=!0}return s._count},copy:function(){var n=this;return new h(n.r1,n.r2,n.g1,n.g2,n.b1,n.b2,n.histo)},avg:function(n){var s=this,l=s.histo;if(!s._avg||n){var c,o,a,F,t=0,r=1<<8-e,u=0,d=0,f=0;for(o=s.r1;o<=s.r2;o++)for(a=s.g1;a<=s.g2;a++)for(F=s.b1;F<=s.b2;F++)t+=c=l[y(o,a,F)]||0,u+=c*(o+.5)*r,d+=c*(a+.5)*r,f+=c*(F+.5)*r;s._avg=t?[~~(u/t),~~(d/t),~~(f/t)]:[~~(r*(s.r1+s.r2+1)/2),~~(r*(s.g1+s.g2+1)/2),~~(r*(s.b1+s.b2+1)/2)]}return s._avg},contains:function(n){var s=this,l=n[0]>>p;return gval=n[1]>>p,bval=n[2]>>p,l>=s.r1&&l<=s.r2&&gval>=s.g1&&gval<=s.g2&&bval>=s.b1&&bval<=s.b2}},A.prototype={push:function(n){this.vboxes.push({vbox:n,color:n.avg()})},palette:function(){return this.vboxes.map(function(n){return n.color})},size:function(){return this.vboxes.size()},map:function(n){for(var s=this.vboxes,l=0;l<s.size();l++)if(s.peek(l).vbox.contains(n))return s.peek(l).color;return this.nearest(n)},nearest:function(n){for(var s,l,c,o=this.vboxes,a=0;a<o.size();a++)((l=Math.sqrt(Math.pow(n[0]-o.peek(a).color[0],2)+Math.pow(n[1]-o.peek(a).color[1],2)+Math.pow(n[2]-o.peek(a).color[2],2)))<s||s===void 0)&&(s=l,c=o.peek(a).color);return c},forcebw:function(){var n=this.vboxes;n.sort(function(o,a){return g.naturalOrder(g.sum(o.color),g.sum(a.color))});var s=n[0].color;s[0]<5&&s[1]<5&&s[2]<5&&(n[0].color=[0,0,0]);var l=n.length-1,c=n[l].color;c[0]>251&&c[1]>251&&c[2]>251&&(n[l].color=[255,255,255])}},{quantize:function(n,s){if(!n.length||s<2||s>256)return!1;var l=function(r){var u,d=new Array(1<<3*e);return r.forEach(function(f){u=y(f[0]>>p,f[1]>>p,f[2]>>p),d[u]=(d[u]||0)+1}),d}(n);l.forEach(function(){});var c=function(r,u){var d,f,v,m=1e6,x=0,b=1e6,I=0,E=1e6,j=0;return r.forEach(function(q){(d=q[0]>>p)<m?m=d:d>x&&(x=d),(f=q[1]>>p)<b?b=f:f>I&&(I=f),(v=q[2]>>p)<E?E=v:v>j&&(j=v)}),new h(m,x,b,I,E,j,u)}(n,l),o=new D(function(r,u){return g.naturalOrder(r.count(),u.count())});function a(r,u){for(var d,f=r.size(),v=0;v<C;){if(f>=u||v++>C)return;if((d=r.pop()).count()){var m=_(l,d),x=m[0],b=m[1];if(!x)return;r.push(x),b&&(r.push(b),f++)}else r.push(d),v++}}o.push(c),a(o,.75*s);for(var F=new D(function(r,u){return g.naturalOrder(r.count()*r.volume(),u.count()*u.volume())});o.size();)F.push(o.pop());a(F,s);for(var t=new A;F.size();)t.push(F.pop());return t}}}().quantize,M=function(e){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=e.naturalWidth,this.height=this.canvas.height=e.naturalHeight,this.context.drawImage(e,0,0,this.width,this.height)};M.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var k=function(){};return k.prototype.getColor=function(e,p){return p===void 0&&(p=10),this.getPalette(e,5,p)[0]},k.prototype.getPalette=function(e,p,C){var y=function(_){var n=_.colorCount,s=_.quality;if(n!==void 0&&Number.isInteger(n)){if(n===1)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");n=Math.max(n,2),n=Math.min(n,20)}else n=10;return(s===void 0||!Number.isInteger(s)||s<1)&&(s=10),{colorCount:n,quality:s}}({colorCount:p,quality:C}),D=new M(e),h=function(_,n,s){for(var l,c,o,a,F,t=_,r=[],u=0;u<n;u+=s)c=t[0+(l=4*u)],o=t[l+1],a=t[l+2],((F=t[l+3])===void 0||F>=125)&&(c>250&&o>250&&a>250||r.push([c,o,a]));return r}(D.getImageData().data,D.width*D.height,y.quality),A=w(h,y.colorCount);return A?A.palette():null},k.prototype.getColorFromUrl=function(e,p,C){var y=this,D=document.createElement("img");D.addEventListener("load",function(){var h=y.getPalette(D,5,C);p(h[0],e)}),D.src=e},k.prototype.getImageData=function(e,p){var C=new XMLHttpRequest;C.open("GET",e,!0),C.responseType="arraybuffer",C.onload=function(){if(this.status==200){var y=new Uint8Array(this.response);i=y.length;for(var D=new Array(i),h=0;h<y.length;h++)D[h]=String.fromCharCode(y[h]);var A=D.join(""),_=window.btoa(A);p("data:image/png;base64,"+_)}},C.send()},k.prototype.getColorAsync=function(e,p,C){var y=this;this.getImageData(e,function(D){var h=document.createElement("img");h.addEventListener("load",function(){var A=y.getPalette(h,5,C);p(A[0],this)}),h.src=D})},k});const W={class:"grid"},G={class:"item"},X=["src","onMouseenter"],K={__name:"bgFollowImg",setup(g){N(y=>({"765f308a":k.value}));const w=[];for(let y=0;y<4;y++)w.push(`https://picsum.photos/200?r=${y}`);const M=new ColorThief,k=V("#fff"),e=V(-1),p=async(y,D)=>{e.value=D;const h=await M.getPalette(y.target,3),[A,_,n]=h.map(s=>`rgb(${s[0]},${s[1]},${s[2]})`);k.value=`${A},${_},${n}`},C=()=>{e.value=-1,k.value="#fff"};return(y,D)=>(z(),P("div",W,[(z(),P(L,null,B(w,(h,A)=>T("div",G,[T("img",{crossorigin:"anonymous",src:h,onMouseenter:_=>p(_,A),onMouseleave:C,class:H([e.value===A?"hoverImg":""]),style:R({opacity:e.value===-1||A===e.value?1:.2,transition:".3s"})},null,46,X)])),64))]))}},Q=O(K,[["__scopeId","data-v-baada94d"]]),Y=T("h1",{id:"\u7CFB\u5217\u4E00-\u2014\u2014-\u6742\u4E03\u6742\u516B",tabindex:"-1"},[$("\u7CFB\u5217\u4E00 \u2014\u2014 \u6742\u4E03\u6742\u516B "),T("a",{class:"header-anchor",href:"#\u7CFB\u5217\u4E00-\u2014\u2014-\u6742\u4E03\u6742\u516B","aria-hidden":"true"},"#")],-1),Z=T("h2",{id:"_1-\u8DDF\u968F\u56FE\u7247\u53D8\u5316\u7684\u80CC\u666F\u8272",tabindex:"-1"},[$("1. \u8DDF\u968F\u56FE\u7247\u53D8\u5316\u7684\u80CC\u666F\u8272 "),T("a",{class:"header-anchor",href:"#_1-\u8DDF\u968F\u56FE\u7247\u53D8\u5316\u7684\u80CC\u666F\u8272","aria-hidden":"true"},"#")],-1),ss=T("p",null,"\u901A\u8FC7 cdn \u5F15\u5165\u7B2C\u4E09\u65B9\u5305\u7684\u65B9\u5F0F\uFF0C\u5728\u6253\u5305\u65F6\u56E0\u4E3A ESM \u4E0D\u652F\u6301\uFF0C\u6240\u4EE5\u9700\u8981\u5C06\u6587\u4EF6\u4E0B\u8F7D\u4E0B\u6765\u5F15\u5165",-1),ns=J("",33),ls=JSON.parse(`{"title":"\u7CFB\u5217\u4E00 \u2014\u2014 \u6742\u4E03\u6742\u516B","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u8DDF\u968F\u56FE\u7247\u53D8\u5316\u7684\u80CC\u666F\u8272","slug":"_1-\u8DDF\u968F\u56FE\u7247\u53D8\u5316\u7684\u80CC\u666F\u8272","link":"#_1-\u8DDF\u968F\u56FE\u7247\u53D8\u5316\u7684\u80CC\u666F\u8272","children":[]},{"level":2,"title":"2. \u7EAF CSS \u56FE\u6807 (Anthony Fu \u7CFB\u5217\u6587\u7AE0)","slug":"_2-\u7EAF-css-\u56FE\u6807-anthony-fu-\u7CFB\u5217\u6587\u7AE0","link":"#_2-\u7EAF-css-\u56FE\u6807-anthony-fu-\u7CFB\u5217\u6587\u7AE0","children":[{"level":3,"title":"2.1 \u56FE\u6807\u5E93","slug":"_2-1-\u56FE\u6807\u5E93","link":"#_2-1-\u56FE\u6807\u5E93","children":[]},{"level":3,"title":"2.2 Iconify \u4F7F\u7528","slug":"_2-2-iconify-\u4F7F\u7528","link":"#_2-2-iconify-\u4F7F\u7528","children":[]},{"level":3,"title":"2.3 VS Code \u63D2\u4EF6","slug":"_2-3-vs-code-\u63D2\u4EF6","link":"#_2-3-vs-code-\u63D2\u4EF6","children":[]},{"level":3,"title":"2.4 -icons \u63D2\u4EF6\u76F8\u5173","slug":"_2-4-icons-\u63D2\u4EF6\u76F8\u5173","link":"#_2-4-icons-\u63D2\u4EF6\u76F8\u5173","children":[]}]},{"level":2,"title":"3. vue\u4E2Dimg\u6807\u7B7E\u5F15\u5165\u56FE\u7247\u65F6\uFF0C\u9700\u8981\u4F7F\u7528require('\u56FE\u7247\u5730\u5740')","slug":"_3-vue\u4E2Dimg\u6807\u7B7E\u5F15\u5165\u56FE\u7247\u65F6-\u9700\u8981\u4F7F\u7528require-\u56FE\u7247\u5730\u5740","link":"#_3-vue\u4E2Dimg\u6807\u7B7E\u5F15\u5165\u56FE\u7247\u65F6-\u9700\u8981\u4F7F\u7528require-\u56FE\u7247\u5730\u5740","children":[]},{"level":2,"title":"4. Array.includes() \u5728\u8FDB\u884C\u6BD4\u8F83\u65F6\u4F7F\u7528\u7684\u662F\u5F3A\u7B49\u4E8E\uFF08===\uFF09\u6BD4\u8F83","slug":"_4-array-includes-\u5728\u8FDB\u884C\u6BD4\u8F83\u65F6\u4F7F\u7528\u7684\u662F\u5F3A\u7B49\u4E8E-\u6BD4\u8F83","link":"#_4-array-includes-\u5728\u8FDB\u884C\u6BD4\u8F83\u65F6\u4F7F\u7528\u7684\u662F\u5F3A\u7B49\u4E8E-\u6BD4\u8F83","children":[]},{"level":2,"title":"5. MD5 \u52A0\u5BC6\u6587\u4EF6\u548C\u4F7F\u7528","slug":"_5-md5-\u52A0\u5BC6\u6587\u4EF6\u548C\u4F7F\u7528","link":"#_5-md5-\u52A0\u5BC6\u6587\u4EF6\u548C\u4F7F\u7528","children":[{"level":3,"title":"5.1 \u6587\u4EF6\u5730\u5740\uFF1A./utils/md5.js","slug":"_5-1-\u6587\u4EF6\u5730\u5740-utils-md5-js","link":"#_5-1-\u6587\u4EF6\u5730\u5740-utils-md5-js","children":[]},{"level":3,"title":"5.2 \u4F7F\u7528\u65B9\u6CD5","slug":"_5-2-\u4F7F\u7528\u65B9\u6CD5","link":"#_5-2-\u4F7F\u7528\u65B9\u6CD5","children":[]}]},{"level":2,"title":"6. \u5982\u4F55\u4E2D\u65ADforEach","slug":"_6-\u5982\u4F55\u4E2D\u65ADforeach","link":"#_6-\u5982\u4F55\u4E2D\u65ADforeach","children":[{"level":3,"title":"6.1 \u7406\u89E3forEach","slug":"_6-1-\u7406\u89E3foreach","link":"#_6-1-\u7406\u89E3foreach","children":[]},{"level":3,"title":"6.2 \u4F7F\u7528 break \u4E2D\u65ADforEach","slug":"_6-2-\u4F7F\u7528-break-\u4E2D\u65ADforeach","link":"#_6-2-\u4F7F\u7528-break-\u4E2D\u65ADforeach","children":[]},{"level":3,"title":"6.3 \u4F7F\u7528 return \u4E2D\u65ADforEach","slug":"_6-3-\u4F7F\u7528-return-\u4E2D\u65ADforeach","link":"#_6-3-\u4F7F\u7528-return-\u4E2D\u65ADforeach","children":[]},{"level":3,"title":"6.4 \u4F7F\u7528\u5F02\u5E38\u4E2D\u65AD forEach \u5FAA\u73AF","slug":"_6-4-\u4F7F\u7528\u5F02\u5E38\u4E2D\u65AD-foreach-\u5FAA\u73AF","link":"#_6-4-\u4F7F\u7528\u5F02\u5E38\u4E2D\u65AD-foreach-\u5FAA\u73AF","children":[]}]},{"level":2,"title":"7. \u6253\u5F00\u65B0\u9875\u7B7E(\u9632\u6B62\u6076\u610F\u7F51\u7AD9\u91CD\u5B9A\u5411\u4F60\u7684\u7F51\u7AD9\u5730\u5740)","slug":"_7-\u6253\u5F00\u65B0\u9875\u7B7E-\u9632\u6B62\u6076\u610F\u7F51\u7AD9\u91CD\u5B9A\u5411\u4F60\u7684\u7F51\u7AD9\u5730\u5740","link":"#_7-\u6253\u5F00\u65B0\u9875\u7B7E-\u9632\u6B62\u6076\u610F\u7F51\u7AD9\u91CD\u5B9A\u5411\u4F60\u7684\u7F51\u7AD9\u5730\u5740","children":[]}],"relativePath":"pages/lotsOfDifferent/demo1/index.md"}`),as={name:"pages/lotsOfDifferent/demo1/index.md"},es=Object.assign(as,{setup(g){return(w,M)=>(z(),P("div",null,[Y,Z,ss,U(Q),ns]))}});export{ls as __pageData,es as default};