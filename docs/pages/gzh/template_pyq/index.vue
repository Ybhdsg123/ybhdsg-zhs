<template>
  <div class="wechat-moments-generator">
    <h1 class="title">公众号模版-朋友圈格式生成器</h1>
    <div class="flex-base">
      <div v-for="item in avatarLinks" :key="item.name">
        {{ item.name }} <button class="btn" @click=" copyText(item.url)">复制</button>
      </div>
    </div>
    <!-- 动态输入区域 -->
    <div class="input-section">
      <div class="input-group">
        <label>头像预览:</label>
        <div class="flex-base">
          <img :src="newMoment.avatar" alt="头像预览" class="preview-img" />
          <button class="btn" @click="newMoment.avatar = generateRandomImages() ">更新头像</button>
        </div>
        <label>头像链接:</label>
        <input v-model="newMoment.avatar" placeholder="输入头像链接（如：https://example.com/avatar.jpg）" />
      </div>

      <div class="input-group">
        <div class="flex-base">
          <label>昵称:</label>
          <button class="btn" @click="newMoment.nickname = generateChineseNickname()">更新昵称</button>
        </div>

        <input v-model="newMoment.nickname" placeholder="输入昵称" />
      </div>

      <div class="input-group">
        <label>发布时间（如：刚刚，10分钟前）:</label>
        <input v-model="newMoment.time" placeholder="输入时间（如：10分钟前）" />
      </div>

      <div class="input-group">
        <label>动态内容:</label>
        <textarea v-model="newMoment.content" placeholder="输入动态内容，支持换行"></textarea>
      </div>

      <div class="input-group">
        <label>图片链接（多张用逗号分隔）:</label>
        <input v-model="newMoment.images" placeholder="输入图片链接，多个用逗号分隔" />
      </div>

      <div class="input-group">
        <label>点赞人（用逗号分隔）:</label>
        <input v-model="newMoment.likes" placeholder="输入点赞人，多个用逗号分隔" />
      </div>

      <div class="input-group">
        <label>评论（格式：昵称:内容，多个用分号分隔）:</label>
        <textarea v-model="newMoment.comments" placeholder="输入评论，格式：张三:好棒;李四:不错"></textarea>
      </div>

      <button @click="addMoment" class="add-btn">添加动态</button>
    </div>

    <!-- 预览区域 -->
    <div class="preview-section">
      <h2 class="section-title">预览效果</h2>
      <div class="preview-container">
        <div class="wechat-moments" v-html="generatedHTML"></div>
      </div>
    </div>

    <!-- 代码输出区域 -->
    <div class="code-section">
      <h2 class="section-title">生成的HTML代码</h2>
      <textarea v-model="generatedHTML" readonly class="code-output" @click="selectCode"></textarea>
      <button @click="copyToClipboard" class="copy-btn">复制代码</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showMessage, copyText, generateRandomImages, generateChineseNickname } from '../tools'

// 头像链接数据
const avatarLinks = [
  { name: '头像1', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc7hylVJkrkrzKsr1SajvHlkoshO8hmb2mZ4uiarEaxOfr0tRO6rMw09w/0?wx_fmt=jpeg' },
  { name: '头像2', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXcg6cGO5coH6iaCz2dC5tRKPLhm9LxpNxqeoB1iboqfEUSjBReC4c7xt4A/0?wx_fmt=jpeg' },
  { name: '头像3', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc6lIlaib6HAhyhpjjsFCFIJWN9oQOyia3ibsgd7yLibL1dbPIq80mc9dnhQ/0?wx_fmt=jpeg' },
  { name: '头像4', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXcmSW00dUY53tgf8icWTvHyQHr2Q1micbLux095fLrBgftdmDgSibzQJV3A/0?wx_fmt=jpeg' },
  { name: '头像5', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveyiazPxicpkAywbdb4pdfQt2cUyH31iaicSVlqoOvKD9qDzQI64Oq6YAc1A/0?wx_fmt=jpeg' },
  { name: '头像6', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveCA6ZgGTrZKCzt2tac5bGSbD4Ltr5yclX7FXEBvPeQvYpZl2AicgKE7Q/0?wx_fmt=jpeg' },
  { name: '头像7', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveGIQTtSlUmEx1pfr1H5z2pgUNicPdtqNOoIouyRTax4r82ha9VgBviczw/0?wx_fmt=jpeg' },
  { name: '头像8', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveKsZAOibbRJVumXd3uMm6jKTVvqZk1cZOAA2CHPyjerT2f40EzfiaqhOg/0?wx_fmt=jpeg' },
  { name: '头像9', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveKsZAOibbRJVumXd3uMm6jKTVvqZk1cZOAA2CHPyjerT2f40EzfiaqhOg/0?wx_fmt=jpeg' },
  { name: '头像10', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveUWdESvEGtgImmb0Q1SmWxM8AtgMAXkq59QsFAQ1ELRRbAMicaByudsw/0?wx_fmt=jpeg' },
]

// 动态数据
const moments = ref([
  // {
  //   avatar: generateRandomImages(),
  //   nickname: "翻个页先",
  //   time: "3分钟前",
  //   content: "大抵是冬天到了，横竖暖和不起来，穿一件冷，穿两件也冷，穿三件还是冷。这冬天怕是铁了心要冻人，衣服是不管用的。",
  //   images: "https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc7hylVJkrkrzKsr1SajvHlkoshO8hmb2mZ4uiarEaxOfr0tRO6rMw09w/0?wx_fmt=jpeg",
  //   likes: "张三,李四,王五",
  //   comments: "赵六:好棒;钱七:不错"
  // }
])

// 新动态输入
const newMoment = ref({
  avatar: generateRandomImages(),
  nickname: generateChineseNickname(),
  time: "刚刚",
  content: "",
  images: "",
  likes: `${generateChineseNickname() },${generateChineseNickname()}`,
  comments: ""
})
// 生成HTML
const generatedHTML = computed(() => {
  let html = '';

  moments.value.forEach((moment, index) => {
    const { avatar, nickname, time, content, images, likes, comments } = moment;

    html += `
<div  style="padding: 15px; background: #fff;">
  <div  style="display: flex; align-items: flex-start; margin-bottom: 10px;">
    <div style="min-width: 40px; min-height: 40px; width: 40px; height: 40px; border-radius: 4px; margin-right: 10px; overflow: hidden;">
      <img src="${avatar}" alt="头像" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="flex: 1;">
      <div  style="font-weight: 500; font-size: 16px; margin-bottom: 2px; color: #61739B;">${nickname}</div>
      <div style="margin-bottom: 10px; font-size: 16px; line-height: 1.5;">${content}</div>
      ${images ? `
        <div style="margin-bottom: 10px;">
          <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 5px;">
            ${images.split(',').map(img => `
              <div style="aspect-ratio: 1; background-color: #f0f0f0; border-radius: 4px; overflow: hidden;">
                <img src="${img.trim()}" alt="图片" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; color: #999; font-size: 14px; padding-top: 8px;">
    <div style="display: flex; align-items: center;">${time||'13分钟前'}</div>
    <div style="display: flex; justify-content: center; align-items: center; width: 40px; height: 16px; border-radius: 2px; background-color: #f0f0f0;">
      <span style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
      <span  style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
    </div>
  </div>

  ${likes || comments ? `
  <div style="background-color: #f7f7f7; border-radius: 4px; padding: 8px; margin-top: 8px; font-size: 14px;">
    ${likes ? `
      <div style="display: flex; align-items: center; color: #61739B; margin-bottom: 5px;">
        &#9825; ${likes.split(',').join(', ')}
      </div>
    ` : ''}
    
    ${comments ? `
      <div style="padding-top: 10px; font-size: 13px;">
        ${comments.split(';').map(comment => {
          // 1. 用正则匹配中英文冒号（：|:）
          // 2. 对分割后的内容去前后空格（trim）
          // 3. 处理text为空的情况（避免undefined）
          const [name, text] = comment.split(/：|:/).map(item => item?.trim() || '');
      return `
          <div style="margin-bottom: 4px;">
            <span style="color: #576b95;">${name}：</span>
            <span style="color: #666;">${text}</span>
          </div>
          `;
    }).join('')}
      </div>
    ` : ''}
  </div>
  ` : ''}
</div>`;
  });

  return html;
})

// 添加动态
function addMoment() {
  if (!newMoment.value.avatar || !newMoment.value.nickname || !newMoment.value.content) {
    showMessage('请填写必填字段：头像、昵称、内容', 'error');
    return;
  }

  moments.value.push({ ...newMoment.value });
  // 清空输入框
  newMoment.value = {
    avatar: generateRandomImages(),
    nickname: generateChineseNickname(),
    time: "刚刚",
    content: "",
    images: "",
    likes: `${generateChineseNickname()},${generateChineseNickname()}`,
    comments: ""
  };
}

// 复制代码到剪贴板
function copyToClipboard() {
  const result = generatedHTML.value += `<section style="font-size:14px;text-align: center; padding:8px 16px;line-height:1.3">
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
`;
  copyText(result)
  showMessage('代码已复制到剪贴板！');
}

// 选中代码
function selectCode() {
  const textarea = document.querySelector('.code-output');
  textarea.select();
}

</script>

<style scoped>
.flex-base {
  display: flex;
  align-items: center;
  gap: 10px;

}
  .btn{
    padding: 2px 4px;
    background-color: #06a050;
    color: #fff;
    border-radius: 4px;
    margin: 3px;
    font-size: 12px;
  }
.wechat-moments-generator {
  margin-top: 20px;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  color: #07c160;
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 600;
}

.avatar-list{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.copy-avatar-img-btn{
  background: #07c160;
  color: white;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
}

.input-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f8f8f8;
  transition: border-color 0.2s;
}

.input-group textarea {
  height: 100px;
  resize: vertical;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #07c160;
  box-shadow: 0 0 0 2px rgba(7, 193, 96, 0.2);
}

.add-btn {
  background: #07c160;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #06a050;
}

.section-title {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
}

.preview-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.preview-container {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  min-height: 400px;
  overflow: auto;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.03);
}

.code-section {
  position: fixed;
  right: 100px;
  top: 230px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  z-index: 10000;
}

.code-output {
  width: 100%;
  height: 250px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f8f8f8;
  resize: vertical;
  margin-bottom: 15px;
}

.copy-btn {
  background: #07c160;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #06a050;
}
</style>