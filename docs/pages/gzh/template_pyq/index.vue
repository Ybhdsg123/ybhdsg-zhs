<template>
  <div class="wechat-moments-generator">
    <h1 class="title">公众号模版-朋友圈格式生成器</h1>
    <!-- 动态输入区域 -->
    <div class="input-section">
      <div class="input-group">
        <label>头像预览:</label>
        <img :src="newMoment.avatar" alt="头像预览" class="preview-img" />
        <label>头像链接:</label>
        <input v-model="newMoment.avatar" placeholder="输入头像链接（如：https://example.com/avatar.jpg）" />
      </div>

      <div class="input-group">
        <label>昵称:</label>
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
<div class="moment" style="padding: 15px; background: #fff; border-bottom: 1px solid #f0f0f0;">
  <div class="moment-header" style="display: flex; align-items: flex-start; margin-bottom: 10px;">
    <div class="avatar" style="min-width: 40px; min-height: 40px; width: 40px; height: 40px; border-radius: 4px; margin-right: 10px; overflow: hidden;">
      <img src="${avatar}" alt="头像" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="user-info" style="flex: 1;">
      <div class="username" style="font-weight: 500; font-size: 16px; margin-bottom: 2px; color: #61739B;">${nickname}</div>
      <div class="moment-content" style="margin-bottom: 10px; font-size: 16px; line-height: 1.5;">${content}</div>
      ${images ? `
        <div class="moment-images" style="margin-bottom: 10px;">
          <div class="image-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;">
            ${images.split(',').map(img => `
              <div class="image-item" style="aspect-ratio: 1; background-color: #f0f0f0; border-radius: 4px; overflow: hidden;">
                <img src="${img.trim()}" alt="图片" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  </div>

  <div class="moment-actions" style="display: flex; justify-content: space-between; color: #999; font-size: 14px; padding-top: 8px;">
    <div class="action-item" style="display: flex; align-items: center;">${time||'13分钟前'}</div>
    <div class="action-btn" style="display: flex; justify-content: center; align-items: center; width: 40px; height: 16px; border-radius: 2px; background-color: #f0f0f0;">
      <span class="circle" style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
      <span class="circle" style="width: 4px; height: 4px; background-color: #61739B; border-radius: 50%; margin: 0 4px;"></span>
    </div>
  </div>

  ${likes || comments ? `
  <div class="likes-comments" style="background-color: #f7f7f7; border-radius: 4px; padding: 8px; margin-top: 8px; font-size: 14px;">
    ${likes ? `
      <div class="likes" style="display: flex; align-items: center; color: #61739B; margin-bottom: 5px;">
        &#9825; ${likes.split(',').join(', ')}
      </div>
    ` : ''}
    
    ${comments ? `
      <div class="comments" style="border-top: 1px solid #e0e0e0; padding-top: 10px; font-size: 13px;">
        ${comments.split(';').map(comment => {
      const [name, text] = comment.split(':');
      return `
          <div class="comment-item" style="margin-bottom: 4px;">
            <span class="comment-author" style="color: #576b95;">${name}：</span>
            <span class="comment-text" style="color: #666;">${text}</span>
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
  const result = generatedHTML.value += `<section style="text-align: center; padding:8px 16px;line-height:1.6">
  <span leaf="">感谢您的赞赞和关注❤️ </span>
  <br>
  <span leaf="">愿钱和爱都奔你而来🌹 </span>
  <br>
  <section leaf="">喜欢就关注 <span
      style="font-weight:700;font-size:18px;line-height:1.6;color:#f40;position:relative;">  翻个页先 </span> 👇👇👇</section>
  <br>
</section>`;
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
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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