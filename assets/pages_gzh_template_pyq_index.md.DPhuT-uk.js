import{_ as V,p as h,h as j,c as k,o as M,j as t,ah as d,ai as p,a as N,G as U}from"./chunks/framework.By2cXeI6.js";async function B(l){try{await navigator.clipboard.writeText(l)}catch{fallbackCopyText(l)}}function b(l,i="success"){const s=document.querySelector(".message-toast");s&&s.remove();const n=document.createElement("div");n.className="message-toast",n.textContent=l;const o={success:{background:"#4CAF50",icon:"✓"},error:{background:"#f44336",icon:"✕"},warning:{background:"#ff9800",icon:"⚠"},info:{background:"#2196F3",icon:"ℹ"}},c=o[i]||o.success;n.style.cssText=`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${c.background};
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
    `;const m=document.createElement("span");m.textContent=c.icon,m.style.fontSize="16px",n.prepend(m),document.body.appendChild(n),setTimeout(()=>{n.style.opacity="1"},10),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),100)},1e3)}function y(){return`https://picsum.photos/id/${Math.floor(Math.random()*1e3)+1}/40/40`}function u(){const l=["小","大","阿","老","","超","超级","萌","可爱","帅气","迷人","阳光","温柔"],i=["同学","宝贝","丫头","小子","仙女","先生","小姐姐","小哥哥","达人","专家","玩家","爱好者"],s=["强","伟","杰","明","勇","军","刚","波","涛","峰","宇","轩","浩","然","凯","乐"],n=["芳","娜","敏","静","丽","娟","艳","玲","霞","婷","雪","莹","燕","欣","怡","悦"],o=["星","月","风","云","阳","晨","梦","然","言","墨","白","青","蓝","橙","雨","晴"],c=Math.floor(Math.random()*4),r=Math.random()>.5?s:n;switch(c){case 0:return l[Math.floor(Math.random()*l.length)]+r[Math.floor(Math.random()*r.length)];case 1:return o[Math.floor(Math.random()*o.length)]+i[Math.floor(Math.random()*i.length)];case 2:return o[Math.floor(Math.random()*o.length)]+o[Math.floor(Math.random()*o.length)];case 3:const e=o[Math.floor(Math.random()*o.length)];return e+e;default:return"小"+o[Math.floor(Math.random()*o.length)]}}const q={class:"wechat-moments-generator"},E={class:"input-section"},H={class:"input-group"},I=["src"],L={class:"input-group"},P={class:"input-group"},S={class:"input-group"},D={class:"input-group"},F={class:"input-group"},O={class:"input-group"},A={class:"preview-section"},G={class:"preview-container"},J=["innerHTML"],R={class:"code-section"},K={__name:"index",setup(l){const i=h([]),s=h({avatar:y(),nickname:u(),time:"刚刚",content:"",images:"",likes:`${u()},${u()}`,comments:""}),n=j(()=>{let r="";return i.value.forEach((e,a)=>{const{avatar:w,nickname:$,time:_,content:T,images:x,likes:g,comments:v}=e;r+=`
<div class="moment" style="padding: 15px; background: #fff; border-bottom: 1px solid #f0f0f0;">
  <div class="moment-header" style="display: flex; align-items: flex-start; margin-bottom: 10px;">
    <div class="avatar" style="min-width: 40px; min-height: 40px; width: 40px; height: 40px; border-radius: 4px; margin-right: 10px; overflow: hidden;">
      <img src="${w}" alt="头像" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="user-info" style="flex: 1;">
      <div class="username" style="font-weight: 500; font-size: 16px; margin-bottom: 2px; color: #61739B;">${$}</div>
      <div class="moment-content" style="margin-bottom: 10px; font-size: 16px; line-height: 1.5;">${T}</div>
      ${x?`
        <div class="moment-images" style="margin-bottom: 10px;">
          <div class="image-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;">
            ${x.split(",").map(f=>`
              <div class="image-item" style="aspect-ratio: 1; background-color: #f0f0f0; border-radius: 4px; overflow: hidden;">
                <img src="${f.trim()}" alt="图片" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  </div>

  <div class="moment-actions" style="display: flex; justify-content: space-between; color: #999; font-size: 14px; padding-top: 8px;">
    <div class="action-item" style="display: flex; align-items: center;">${_||"13分钟前"}</div>
    <div class="action-btn" style="display: flex; justify-content: center; align-items: center; width: 40px; height: 16px; border-radius: 2px; background-color: #f0f0f0;">
      <span class="circle" style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
      <span class="circle" style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
    </div>
  </div>

  ${g||v?`
  <div class="likes-comments" style="background-color: #f7f7f7; border-radius: 4px; padding: 8px; margin-top: 8px; font-size: 14px;">
    ${g?`
      <div class="likes" style="display: flex; align-items: center; color: #61739B; margin-bottom: 5px;">
        &#9825; ${g.split(",").join(", ")}
      </div>
    `:""}
    
    ${v?`
      <div class="comments" style="border-top: 1px solid #e0e0e0; padding-top: 10px; font-size: 13px;">
        ${v.split(";").map(f=>{const[z,C]=f.split(":");return`
          <div class="comment-item" style="margin-bottom: 4px;">
            <span class="comment-author" style="color: #576b95;">${z}：</span>
            <span class="comment-text" style="color: #666;">${C}</span>
          </div>
          `}).join("")}
      </div>
    `:""}
  </div>
  `:""}
</div>`}),r});function o(){if(!s.value.avatar||!s.value.nickname||!s.value.content){b("请填写必填字段：头像、昵称、内容","error");return}i.value.push({...s.value}),s.value={avatar:y(),nickname:u(),time:"刚刚",content:"",images:"",likes:`${u()},${u()}`,comments:""}}function c(){const r=n.value+=`<section style="text-align: center; padding:8px 16px;line-height:1.6">
  <span leaf="">感谢您的赞赞和关注❤️ </span>
  <br>
  <span leaf="">愿钱和爱都奔你而来🌹 </span>
  <br>
  <section leaf="">喜欢就关注 <span
      style="font-weight:700;font-size:18px;line-height:1.6;color:#f40;position:relative;">  翻个页先 </span> 👇👇👇</section>
  <br>
</section>`;B(r),b("代码已复制到剪贴板！")}function m(){document.querySelector(".code-output").select()}return(r,e)=>(M(),k("div",q,[e[18]||(e[18]=t("h1",{class:"title"},"公众号模版-朋友圈格式生成器",-1)),t("div",E,[t("div",H,[e[8]||(e[8]=t("label",null,"头像预览:",-1)),t("img",{src:s.value.avatar,alt:"头像预览",class:"preview-img"},null,8,I),e[9]||(e[9]=t("label",null,"头像链接:",-1)),d(t("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>s.value.avatar=a),placeholder:"输入头像链接（如：https://example.com/avatar.jpg）"},null,512),[[p,s.value.avatar]])]),t("div",L,[e[10]||(e[10]=t("label",null,"昵称:",-1)),d(t("input",{"onUpdate:modelValue":e[1]||(e[1]=a=>s.value.nickname=a),placeholder:"输入昵称"},null,512),[[p,s.value.nickname]])]),t("div",P,[e[11]||(e[11]=t("label",null,"发布时间（如：刚刚，10分钟前）:",-1)),d(t("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>s.value.time=a),placeholder:"输入时间（如：10分钟前）"},null,512),[[p,s.value.time]])]),t("div",S,[e[12]||(e[12]=t("label",null,"动态内容:",-1)),d(t("textarea",{"onUpdate:modelValue":e[3]||(e[3]=a=>s.value.content=a),placeholder:"输入动态内容，支持换行"},null,512),[[p,s.value.content]])]),t("div",D,[e[13]||(e[13]=t("label",null,"图片链接（多张用逗号分隔）:",-1)),d(t("input",{"onUpdate:modelValue":e[4]||(e[4]=a=>s.value.images=a),placeholder:"输入图片链接，多个用逗号分隔"},null,512),[[p,s.value.images]])]),t("div",F,[e[14]||(e[14]=t("label",null,"点赞人（用逗号分隔）:",-1)),d(t("input",{"onUpdate:modelValue":e[5]||(e[5]=a=>s.value.likes=a),placeholder:"输入点赞人，多个用逗号分隔"},null,512),[[p,s.value.likes]])]),t("div",O,[e[15]||(e[15]=t("label",null,"评论（格式：昵称:内容，多个用分号分隔）:",-1)),d(t("textarea",{"onUpdate:modelValue":e[6]||(e[6]=a=>s.value.comments=a),placeholder:"输入评论，格式：张三:好棒;李四:不错"},null,512),[[p,s.value.comments]])]),t("button",{onClick:o,class:"add-btn"},"添加动态")]),t("div",A,[e[16]||(e[16]=t("h2",{class:"section-title"},"预览效果",-1)),t("div",G,[t("div",{class:"wechat-moments",innerHTML:n.value},null,8,J)])]),t("div",R,[e[17]||(e[17]=t("h2",{class:"section-title"},"生成的HTML代码",-1)),d(t("textarea",{"onUpdate:modelValue":e[7]||(e[7]=a=>n.value=a),readonly:"",class:"code-output",onClick:m},null,512),[[p,n.value]]),t("button",{onClick:c,class:"copy-btn"},"复制代码")])]))}},Q=V(K,[["__scopeId","data-v-2e227f3d"]]),Y=JSON.parse('{"title":"公众号模版：模版1 - 朋友圈","description":"","frontmatter":{},"headers":[],"relativePath":"pages/gzh/template_pyq/index.md","filePath":"pages/gzh/template_pyq/index.md"}'),W={name:"pages/gzh/template_pyq/index.md"},Z=Object.assign(W,{setup(l){return(i,s)=>(M(),k("div",null,[s[0]||(s[0]=t("h1",{id:"公众号模版-模版1-朋友圈",tabindex:"-1"},[N("公众号模版：模版1 - 朋友圈 "),t("a",{class:"header-anchor",href:"#公众号模版-模版1-朋友圈","aria-label":'Permalink to "公众号模版：模版1 - 朋友圈"'},"​")],-1)),t("div",null,[U(Q)])]))}});export{Y as __pageData,Z as default};
