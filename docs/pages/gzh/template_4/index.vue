<template>
  <div
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="text-align: center; margin-bottom: 24px;">深夜emo文案生成器</h2>

    <!-- 控制区 -->
    <div style="text-align: center; margin-bottom: 24px; display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  left: 400px;
  top: 230px;
  text-align: center;
  margin-bottom: 24px;">
      <button @click="addCard"
        style="padding: 10px 20px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
        ➕ 添加一条
      </button>
      <button @click="clearAll" :disabled="cards.length === 0"
        style="padding: 10px 20px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer; ">
        🗑️ 清空所有
      </button>
    </div>

    <!-- 编辑区 -->
    <div v-for="(card, index) in cards" :key="index"
      style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px; position: relative;">
      <button @click="removeCard(index)"
        style="position: absolute; top: 10px; right: 10px; background: #ffccc7; border: none; width: 24px; height: 24px; border-radius: 50%; font-size: 14px; cursor: pointer;"
        title="删除">
        ×
      </button>

      <label style="display: block; margin-bottom: 8px; font-weight: bold;">文案 {{ index + 1 }}</label>
      <textarea v-model="card.text" placeholder="例如：见过裹脚的，没见过裹小脑的。" rows="2"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"></textarea>

      <label style="display: block; margin-top: 12px; margin-bottom: 8px; font-weight: bold;">底部配图链接（PNG）</label>
      <input v-model="card.imgUrl" type="url" placeholder="https://example.com/image.png"
        style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;" />
    </div>

    <!-- 预览区 -->
    <section style="margin: 30px 0;">
      <h3 style="margin-bottom: 16px;">公众号预览（点击可测试交互）：</h3>
      <div style="border: 1px dashed #ddd; padding: 16px; background: #fafafa; min-height: 300px;">
        <div v-for="(card, idx) in cards" :key="idx">
          <div style="max-width: 657px; margin: 0 auto;">
            <!-- 卡片头部：序号 + 星星 -->
            <section
              style="position: relative; display: flex; justify-content: center; align-items: center; height: 66px;">
              <!-- 序号标签（旋转效果） -->
              <section
                style="position: absolute; left: 46%; top: 50%; border: 1px solid rgb(167, 167, 167); display: inline-block; margin-top: 8px; margin-bottom: 8px; transform: rotate(45deg) translate(-50%, -50%); box-sizing: border-box;">
                <section style="transform: rotate(-45deg); padding: 4px; box-sizing: border-box;">
                  <section
                    style="text-align: center; width: 1.6em; height: 1.6em; line-height: 1.6em; font-size: 19px; border-radius: 50%; color: rgb(255, 255, 255); background-color: rgb(255, 129, 36); box-sizing: border-box;">
                    {{ String(idx + 1).padStart(2, '0') }}
                  </section>
                </section>
              </section>
              <!-- 星星GIF -->
              <img
                src="https://mmbiz.qpic.cn/mmbiz_gif/vbAy22U8gump7WtvJF7FPLAB0XgFjtdj7ttGu0myemgE27DZT7W726GWqMMQOCyj2k73k30wd4BY4icCrlYe67A/0?wx_fmt=gif&from=appmsg"
                style="vertical-align: middle; width: 130px !important; height: auto !important;" alt="★" />
            </section>

            <!-- 文案容器 -->
            <section
              style="margin-top: 10px; margin-bottom: 10px; border-radius: 0.6em; border-color: rgb(255, 129, 36); padding: 10px; border-width: 1px; border-style: solid; background-color: rgb(255, 255, 255); box-shadow: rgb(255, 129, 36) 0px 0px 5px -1px;">
              <section style="color: rgb(51, 51, 51); text-align: center; width: 100%;">
                <p style="margin: 0px; padding: 0px;">
                  <strong>{{ card.text || '点击下方空白处查看答案' }}</strong>
                </p>
              </section>
            </section>

            <!-- 底部配图 -->
            <img v-if="card.imgUrl" :src="card.imgUrl"
              style="vertical-align: middle; max-width: 100%; width: 100% !important; height: auto !important; display: block;"
              alt="配图" />
          </div>
          <hr style="margin: 30px 0; border: 0; border-top: 1px dashed #eee;" v-if="idx < cards.length - 1" />
        </div>
      </div>
    </section>

    <!-- 输出区 -->
    <section style="position: fixed;
  right: 100px;
  top: 230px;">
      <h3 style="margin-bottom: 12px;">公众号 HTML 源码（复制到源代码模式）：</h3>
      <textarea :value="outputHtml" readonly rows="12"
        style="width: 100%; padding: 12px; font-family: monospace; font-size: 14px; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; white-space: pre-wrap;"></textarea>
      <button @click="copyToClipboard" :disabled="cards.length === 0"
        style="margin-top: 10px; padding: 10px 20px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; ">
        📋 一键复制全部 HTML
      </button>
      <p v-if="copied" style="color: green; margin-top: 8px;">✅ 已复制到剪贴板！</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 初始数据
const cards = ref([
  {
    text: '见过裹脚的，没见过裹小脑的。',
    imgUrl: 'https://mmbiz.qpic.cn/sz_mmbiz_png/EibLIK4kkbbpUWYR4o6lQjqkHiccPMxySrnByJJsVFqcQoRrMATEwy1HYpG1Bwd2ka3alsgDbic2BX1DmiaBbiceoAA/640?wx_fmt=png'
  }
])

const addCard = () => {
  cards.value.push({ text: '', imgUrl: '' })
}

const removeCard = (index) => {
  cards.value.splice(index, 1)
}

const clearAll = () => {
  cards.value = []
}

// 生成公众号兼容 HTML
const outputHtml = computed(() => {
  return cards.value
    .map((card, idx) => {
      const num = String(idx + 1).padStart(2, '0')
      const safeText = (card.text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const imgUrl = card.imgUrl || ''

      return `<div>
  <section style="position: relative;display: flex;justify-content: center;align-items: center;height: 66px;">
    <section style="position: absolute;left: 46%;top: 50%; border: 1px solid rgb(167, 167, 167); display: inline-block; margin-top: 8px; margin-bottom: 8px; transform: rotate(45deg) translate(-50%,-50%); box-sizing: border-box;">
      <section style="transform: rotate(-45deg); padding: 4px; box-sizing: border-box;">
        <section style="text-align: center; width: 1.6em; height: 1.6em; line-height: 1.6em; font-size: 19px; border-radius: 50%; color: rgb(255, 255, 255); background-color: rgb(255, 129, 36); box-sizing: border-box;">
        ${num}
        </section>
      </section>
    </section>
    <img src="https://mmbiz.qpic.cn/mmbiz_gif/vbAy22U8gump7WtvJF7FPLAB0XgFjtdj7ttGu0myemgE27DZT7W726GWqMMQOCyj2k73k30wd4BY4icCrlYe67A/0?wx_fmt=gif&from=appmsg" style="vertical-align: middle; width: 130px !important; height: auto !important;" alt="★">
  </section>
  <section style="margin-top: 10px; margin-bottom: 10px; border-radius: 0.6em; border-color: rgb(255, 129, 36); padding: 10px; border-width: 1px; border-style: solid; background-color: rgb(255, 255, 255); box-shadow: rgb(255, 129, 36) 0px 0px 5px -1px;">
    <section style="color: rgb(51, 51, 51); text-align: center; width: 100%;">
      <p style="margin: 0px; padding: 0px;"><strong>${safeText}</strong></p>
    </section>
  </section>
  ${imgUrl ? `<img src="${imgUrl}" style="vertical-align: middle; max-width: 100%; width: 100% !important; height: auto !important;" alt="配图">` : ''}
</div>`
    })
    .join('\n\n')
})

const copied = ref(false)
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputHtml.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    alert('复制失败，请手动复制上方文本框内容。')
  }
}
</script>