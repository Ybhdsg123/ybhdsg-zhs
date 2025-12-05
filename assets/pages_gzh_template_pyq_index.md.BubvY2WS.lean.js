import{_ as $,p as _,h as L,c as x,o as b,j as e,F as V,B as H,a as w,t as O,k as v,ah as n,ai as l,G as F}from"./chunks/framework.By2cXeI6.js";import{g as s,a as g,c as k,s as z}from"./chunks/tools.D3Lk9ua6.js";const Y={class:"wechat-moments-generator"},Q={class:"flex-base"},Z=["onClick"],B={class:"input-section"},S={class:"input-group"},E={class:"flex-base"},P=["src"],I={class:"input-group"},K={class:"flex-base"},N={class:"input-group"},W={class:"input-group"},X={class:"input-group"},D={class:"input-group"},J={class:"input-group"},tt={class:"preview-section"},et={class:"preview-container"},it=["innerHTML"],at={class:"code-section"},nt={__name:"index",setup(j){const f=[{name:"头像1",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc7hylVJkrkrzKsr1SajvHlkoshO8hmb2mZ4uiarEaxOfr0tRO6rMw09w/0?wx_fmt=jpeg"},{name:"头像2",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXcg6cGO5coH6iaCz2dC5tRKPLhm9LxpNxqeoB1iboqfEUSjBReC4c7xt4A/0?wx_fmt=jpeg"},{name:"头像3",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc6lIlaib6HAhyhpjjsFCFIJWN9oQOyia3ibsgd7yLibL1dbPIq80mc9dnhQ/0?wx_fmt=jpeg"},{name:"头像4",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXcmSW00dUY53tgf8icWTvHyQHr2Q1micbLux095fLrBgftdmDgSibzQJV3A/0?wx_fmt=jpeg"},{name:"头像5",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveyiazPxicpkAywbdb4pdfQt2cUyH31iaicSVlqoOvKD9qDzQI64Oq6YAc1A/0?wx_fmt=jpeg"},{name:"头像6",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveCA6ZgGTrZKCzt2tac5bGSbD4Ltr5yclX7FXEBvPeQvYpZl2AicgKE7Q/0?wx_fmt=jpeg"},{name:"头像7",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveGIQTtSlUmEx1pfr1H5z2pgUNicPdtqNOoIouyRTax4r82ha9VgBviczw/0?wx_fmt=jpeg"},{name:"头像8",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveKsZAOibbRJVumXd3uMm6jKTVvqZk1cZOAA2CHPyjerT2f40EzfiaqhOg/0?wx_fmt=jpeg"},{name:"头像9",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveKsZAOibbRJVumXd3uMm6jKTVvqZk1cZOAA2CHPyjerT2f40EzfiaqhOg/0?wx_fmt=jpeg"},{name:"头像10",url:"https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveUWdESvEGtgImmb0Q1SmWxM8AtgMAXkq59QsFAQ1ELRRbAMicaByudsw/0?wx_fmt=jpeg"}],p=_([]),i=_({avatar:g(),nickname:s(),time:"刚刚",content:"",images:"",likes:`${s()},${s()}`,comments:""}),d=L(()=>{let o="";return p.value.forEach((t,a)=>{const{avatar:y,nickname:G,time:U,content:C,images:h,likes:r,comments:m}=t;o+=`
<div  style="padding: 15px; background: #fff;">
  <div  style="display: flex; align-items: flex-start; margin-bottom: 10px;">
    <div style="min-width: 40px; min-height: 40px; width: 40px; height: 40px; border-radius: 4px; margin-right: 10px; overflow: hidden;">
      <img src="${y}" alt="头像" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="flex: 1;">
      <div  style="font-weight: 500; font-size: 16px; margin-bottom: 2px; color: #61739B;">${G}</div>
      <div style="margin-bottom: 10px; font-size: 16px; line-height: 1.5;">${C}</div>
      ${h?`
        <div style="margin-bottom: 10px;">
          <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 5px;">
            ${h.split(",").map(u=>`
              <div style="aspect-ratio: 1; background-color: #f0f0f0; border-radius: 4px; overflow: hidden;">
                <img src="${u.trim()}" alt="图片" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            `).join("")}
          </div>
        </div>
      `:""}
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; color: #999; font-size: 14px; padding-top: 8px;">
    <div style="display: flex; align-items: center;">${U||"13分钟前"}</div>
    <div style="display: flex; justify-content: center; align-items: center; width: 40px; height: 16px; border-radius: 2px; background-color: #f0f0f0;">
      <span style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
      <span  style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
    </div>
  </div>

  ${r||m?`
  <div style="background-color: #f7f7f7; border-radius: 4px; padding: 8px; margin-top: 8px; font-size: 14px;">
    ${r?`
      <div style="display: flex; align-items: center; color: #61739B; margin-bottom: 5px;">
        &#9825; ${r.split(",").join(", ")}
      </div>
    `:""}
    
    ${m?`
      <div style="padding-top: 10px; font-size: 13px;">
        ${m.split(";").map(u=>{const[M,T]=u.split(/：|:/).map(c=>(c==null?void 0:c.trim())||"");return`
          <div style="margin-bottom: 4px;">
            <span style="color: #576b95;">${M}：</span>
            <span style="color: #666;">${T}</span>
          </div>
          `}).join("")}
      </div>
    `:""}
  </div>
  `:""}
</div>`}),o});function A(){if(!i.value.avatar||!i.value.nickname||!i.value.content){z("请填写必填字段：头像、昵称、内容","error");return}p.value.push({...i.value}),i.value={avatar:g(),nickname:s(),time:"刚刚",content:"",images:"",likes:`${s()},${s()}`,comments:""}}function q(){const o=d.value+=`<section style="font-size:14px;text-align: center; padding:8px 16px;line-height:1.3">
  <span>感谢您的赞赞和关注❤️ </span>
  <br>
  <span style="color:#ff6827;line-height:1.6">愿钱和爱都奔你而来🌹 </span>
  <br>
  <section>喜欢就关注 <span
      style="font-weight:700;font-size:16px;line-height:1.3;color:#07c160">  翻个页先 </span> 👇👇👇</section>
  <br>
</section>
<section class="mp_profile_iframe_wrp" nodeleaf="">
  <mp-common-profile class="js_uneditable custom_select_card mp_profile_iframe" data-pluginname="mpprofile" data-nickname="翻个页先" data-from="0" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/vbAy22U8gunPtwvgZTxaydq6S2rL8icRG2eAwATlRt7rWAHadyqH8MhVIN5OW2hhW64PyfibhicTuJicCGqKRzWcYw/0?wx_fmt=png" data-signature="▸ 在这里，每一页都是新风景 ▸ 专治「书荒」「读不完」「不知道读啥」三大顽疾 ▸ 每周不定期更新：快闪书单｜脑洞书评｜冷门好书彩蛋 ▸ 支持许愿：后台扔书名，给你不一样的惊喜" data-id="MzkzOTQxOTMwMQ==" data-is_biz_ban="0" data-service_type="1" data-verify_status="0">
  </mp-common-profile>
</section>
<section style="font-size:14px;text-align: center;padding:8px 16px;line-height:1.3;">
  <span leaf=""><br></span>
</section>
<p style="display: none;">
  <mp-style-type data-value="3">
  </mp-style-type>
</p>
`;k(o),z("代码已复制到剪贴板！")}function R(){document.querySelector(".code-output").select()}return(o,t)=>(b(),x("div",Y,[t[20]||(t[20]=e("h1",{class:"title"},"公众号模版-朋友圈格式生成器",-1)),e("div",Q,[(b(),x(V,null,H(f,a=>e("div",{key:a.name},[w(O(a.name)+" ",1),e("button",{class:"btn",onClick:y=>v(k)(a.url)},"复制",8,Z)])),64))]),e("div",B,[e("div",S,[t[10]||(t[10]=e("label",null,"头像预览:",-1)),e("div",E,[e("img",{src:i.value.avatar,alt:"头像预览",class:"preview-img"},null,8,P),e("button",{class:"btn",onClick:t[0]||(t[0]=a=>i.value.avatar=v(g)())},"更新头像")]),t[11]||(t[11]=e("label",null,"头像链接:",-1)),n(e("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>i.value.avatar=a),placeholder:"输入头像链接（如：https://example.com/avatar.jpg）"},null,512),[[l,i.value.avatar]])]),e("div",I,[e("div",K,[t[12]||(t[12]=e("label",null,"昵称:",-1)),e("button",{class:"btn",onClick:t[2]||(t[2]=a=>i.value.nickname=v(s)())},"更新昵称")]),n(e("input",{"onUpdate:modelValue":t[3]||(t[3]=a=>i.value.nickname=a),placeholder:"输入昵称"},null,512),[[l,i.value.nickname]])]),e("div",N,[t[13]||(t[13]=e("label",null,"发布时间（如：刚刚，10分钟前）:",-1)),n(e("input",{"onUpdate:modelValue":t[4]||(t[4]=a=>i.value.time=a),placeholder:"输入时间（如：10分钟前）"},null,512),[[l,i.value.time]])]),e("div",W,[t[14]||(t[14]=e("label",null,"动态内容:",-1)),n(e("textarea",{"onUpdate:modelValue":t[5]||(t[5]=a=>i.value.content=a),placeholder:"输入动态内容，支持换行"},null,512),[[l,i.value.content]])]),e("div",X,[t[15]||(t[15]=e("label",null,"图片链接（多张用逗号分隔）:",-1)),n(e("input",{"onUpdate:modelValue":t[6]||(t[6]=a=>i.value.images=a),placeholder:"输入图片链接，多个用逗号分隔"},null,512),[[l,i.value.images]])]),e("div",D,[t[16]||(t[16]=e("label",null,"点赞人（用逗号分隔）:",-1)),n(e("input",{"onUpdate:modelValue":t[7]||(t[7]=a=>i.value.likes=a),placeholder:"输入点赞人，多个用逗号分隔"},null,512),[[l,i.value.likes]])]),e("div",J,[t[17]||(t[17]=e("label",null,"评论（格式：昵称:内容，多个用分号分隔）:",-1)),n(e("textarea",{"onUpdate:modelValue":t[8]||(t[8]=a=>i.value.comments=a),placeholder:"输入评论，格式：张三:好棒;李四:不错"},null,512),[[l,i.value.comments]])]),e("button",{onClick:A,class:"add-btn"},"添加动态")]),e("div",tt,[t[18]||(t[18]=e("h2",{class:"section-title"},"预览效果",-1)),e("div",et,[e("div",{class:"wechat-moments",innerHTML:d.value},null,8,it)])]),e("div",at,[t[19]||(t[19]=e("h2",{class:"section-title"},"生成的HTML代码",-1)),n(e("textarea",{"onUpdate:modelValue":t[9]||(t[9]=a=>d.value=a),readonly:"",class:"code-output",onClick:R},null,512),[[l,d.value]]),e("button",{onClick:q,class:"copy-btn"},"复制代码")])]))}},lt=$(nt,[["__scopeId","data-v-1b9fdddd"]]),dt=JSON.parse('{"title":"公众号模版：模版1 - 朋友圈","description":"","frontmatter":{},"headers":[],"relativePath":"pages/gzh/template_pyq/index.md","filePath":"pages/gzh/template_pyq/index.md"}'),st={name:"pages/gzh/template_pyq/index.md"},rt=Object.assign(st,{setup(j){return(f,p)=>(b(),x("div",null,[p[0]||(p[0]=e("h1",{id:"公众号模版-模版1-朋友圈",tabindex:"-1"},[w("公众号模版：模版1 - 朋友圈 "),e("a",{class:"header-anchor",href:"#公众号模版-模版1-朋友圈","aria-label":'Permalink to "公众号模版：模版1 - 朋友圈"'},"​")],-1)),e("div",null,[F(lt)])]))}});export{dt as __pageData,rt as default};
