import{e as A,o as p,c as o,v as C,j as c,t as i,F as d,g as u,a as t}from"./app.a4e98938.js";const g="/ybhdsg-zhs/assets/binding.2ff5852e.png",v={style:{padding:"3px",border:"1px solid #409eff"}},m={__name:"debounceDir",setup(r){const a=A({time:1e3,event:"click"});function e(){a.value.time++,console.log("Only triggered once when clicked many times quickly")}const D=(l,n=1e3)=>{let s=null;return function(...y){clearInterval(s),s=setTimeout(()=>{l.apply(this,y)},n)}},F={mounted(l,n){const s=n.arg;if(!s)throw Error('\u8BF7\u4F20\u5165\u7C7B\u4F3C\u4E8E{time:1000,event:"click"}\u683C\u5F0F\u7684\u6307\u4EE4\u53C2\u6570');l.addEventListener(s.event,D(n.value,s.time))}};return(l,n)=>(p(),o(d,null,[C((p(),o("button",v,[c(" \u591A\u6B21\u70B9\u51FB ")])),[[F,e,a.value,{foo:!0}]]),c(" "+i(a.value.time),1)],64))}},b=t("",30),E=t("",5),k=JSON.parse('{"title":"vue \u5E38\u89C1\u6307\u4EE4","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E00\u3001\u6CE8\u518C\u81EA\u5B9A\u4E49\u6307\u4EE4","slug":"\u4E00\u3001\u6CE8\u518C\u81EA\u5B9A\u4E49\u6307\u4EE4","link":"#\u4E00\u3001\u6CE8\u518C\u81EA\u5B9A\u4E49\u6307\u4EE4","children":[]},{"level":2,"title":"\u4E8C\u3001\u6307\u4EE4\u94A9\u5B50\uFF08vue2 \u548C vue3 \u4E0D\u4E00\u6837\uFF0C\u8FD9\u662F vue3 \u7684\uFF09","slug":"\u4E8C\u3001\u6307\u4EE4\u94A9\u5B50-vue2-\u548C-vue3-\u4E0D\u4E00\u6837-\u8FD9\u662F-vue3-\u7684","link":"#\u4E8C\u3001\u6307\u4EE4\u94A9\u5B50-vue2-\u548C-vue3-\u4E0D\u4E00\u6837-\u8FD9\u662F-vue3-\u7684","children":[]},{"level":2,"title":"\u4E09\u3001\u6307\u4EE4\u6279\u91CF\u6CE8\u518C","slug":"\u4E09\u3001\u6307\u4EE4\u6279\u91CF\u6CE8\u518C","link":"#\u4E09\u3001\u6307\u4EE4\u6279\u91CF\u6CE8\u518C","children":[]},{"level":2,"title":"\u56DB\u3001\u5E38\u7528\u6307\u4EE4","slug":"\u56DB\u3001\u5E38\u7528\u6307\u4EE4","link":"#\u56DB\u3001\u5E38\u7528\u6307\u4EE4","children":[]}],"relativePath":"pages/vue3Treasures/vueDirectives.md"}'),h={name:"pages/vue3Treasures/vueDirectives.md"},q=Object.assign(h,{setup(r){return(a,e)=>(p(),o("div",null,[b,u(m),E]))}});export{k as __pageData,q as default};
