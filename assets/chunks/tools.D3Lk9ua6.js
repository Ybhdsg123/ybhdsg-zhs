function i(o){const e=document.createElement("textarea");e.value=o,e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="2em",e.style.height="2em",e.style.padding="0",e.style.border="none",e.style.outline="none",e.style.boxShadow="none",e.style.background="transparent",e.setAttribute("readonly",""),document.body.appendChild(e);try{if(e.select(),e.setSelectionRange(0,e.value.length),!document.execCommand("copy"))throw new Error("execCommand copy failed")}catch(a){console.warn("Fallback copy failed:",a),alert("复制失败，请手动选择并复制文本。")}finally{document.body.removeChild(e)}}async function d(o){if(typeof o!="string"){console.error("copyText: input must be a string");return}try{await navigator.clipboard.writeText(o)}catch{i(o)}}function m(o,e="success"){const a=document.querySelector(".message-toast");a&&a.remove();const n=document.createElement("div");n.className="message-toast",n.textContent=o;const t={success:{background:"#4CAF50",icon:"✓"},error:{background:"#f44336",icon:"✕"},warning:{background:"#ff9800",icon:"⚠"},info:{background:"#2196F3",icon:"ℹ"}},s=t[e]||t.success;n.style.cssText=`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${s.background};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        opacity: 0;
    `;const r=document.createElement("span");r.textContent=s.icon,r.style.fontSize="16px",n.prepend(r),document.body.appendChild(n),setTimeout(()=>{n.style.opacity="1"},10),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),100)},1e3)}function h(){return`https://picsum.photos/id/${Math.floor(Math.random()*1e3)+1}/40/40`}function u(){const o=["小","大","阿","老","","超","超级","萌","可爱","帅气","迷人","阳光","温柔","酷炫","乖巧","聪明","机灵","活泼","安静","文艺","幽默","善良","勇敢","坚强","乐观"],e=["同学","宝贝","丫头","小子","仙女","先生","小姐姐","小哥哥","达人","专家","玩家","爱好者","达人","小王子","小公主","英雄","女神","王者","勇士","天使","魔法师","诗人","画家","音乐家"],a=["强","伟","杰","明","勇","军","刚","波","涛","峰","宇","轩","浩","然","凯","乐","翔","博","辰","睿","泽","林","阳","辉","鹏"],n=["芳","娜","敏","静","丽","娟","艳","玲","霞","婷","雪","莹","燕","欣","怡","悦","梅","琳","琴","蓉","丹","玉","慧","倩","梦"],t=["星","月","风","云","阳","晨","梦","然","言","墨","白","青","蓝","橙","雨","晴","雪","竹","花","叶","秋","冬","夏","春","海","山"],s=Math.floor(Math.random()*4),c=Math.random()>.5?a:n;switch(s){case 0:return o[Math.floor(Math.random()*o.length)]+c[Math.floor(Math.random()*c.length)];case 1:return t[Math.floor(Math.random()*t.length)]+e[Math.floor(Math.random()*e.length)];case 2:return t[Math.floor(Math.random()*t.length)]+t[Math.floor(Math.random()*t.length)];case 3:const l=t[Math.floor(Math.random()*t.length)];return l+l;default:return"小"+t[Math.floor(Math.random()*t.length)]}}export{h as a,d as c,u as g,m as s};
