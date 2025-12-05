<template>
  <div
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="text-align: center; margin-bottom: 24px;">公众号「点击显答案」生成器</h2>

    <!-- 控制按钮 -->
    <div class="btns">
      <button @click="addQuestion" class="btn">
        ➕ 添加一条语录
      </button>
      <button @click="clearAll" :disabled="questions.length === 0" class="btn del-btn">
        🗑️ 清空所有
      </button>
    </div>

    <!-- 编辑列表 -->
    <div v-for="(q, index) in questions" :key="index"
      style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px; position: relative;">
      <button @click="removeQuestion(index)"
        style="position: absolute; top: 10px; right: 10px; background: #ffccc7; border: none; width: 24px; height: 24px; border-radius: 50%; font-size: 14px; cursor: pointer;"
        title="删除">
        ×
      </button>

      <label style="display: block; margin-bottom: 8px; font-weight: bold;">题目 {{ index + 1 }}</label>
      <textarea v-model="q.question" placeholder="例如：对“人生一波三折”有什么看法？" rows="3"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"></textarea>

      <label style="display: block; margin-top: 12px; margin-bottom: 8px; font-weight: bold;">答案（支持换行）</label>
      <textarea v-model="q.answer" placeholder="例如：“好便宜，便宜到我都想哭了。”" rows="3"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
    </div>

    <!-- 预览区 -->
    <section style="margin: 30px 0;">
      <h3 style="margin-bottom: 16px;">整体预览（点击可测试效果）：</h3>
      <div style="border: 1px dashed #ddd; padding: 16px; background: #fafafa; min-height: 200px;">
        <section v-for="(q, idx) in questions" :key="idx"
          style="position:relative; padding:25px; margin:25px auto; max-width:600px; width:90%; background:#fff; text-align:center; border:1px solid #f8caca; border-radius:10px;">
          <section
            style="position:absolute; top:-12px; left:20px; background:#8EC965; color:#fff; font-weight:bold; padding:4px 10px; border-radius:4px; font-size:16px;">
            {{ String(idx + 1).padStart(2, '0') }}</section>
          <img
            src="https://mmbiz.qpic.cn/mmbiz_png/vbAy22U8gukJgXHpI3S2X5CJsn9NcHfQXu7d5EjD8ln6BoDGhJm5Ms1PB0mib85ic0WoNrXgecZVuJ0WK3YY1uPw/0?wx_fmt=png"
            alt="★" style="position:absolute; top:-8px; right:10px; width:22px; height:22px;">

          <section style="font-size:20px; line-height:1.6; margin:40px 0 25px;">{{ q.question.replace(/\n/g, '<br>') }}
          </section>
          <section
            style=" border:2px solid #eee; border-radius:12px;padding:15px; margin:0 auto ; width:85%;cursor:pointer;color:#999; font-size:18px;color:#999;">
            👇 点击下方空白处获得答案 👁️</section>

          <section
            style="position:relative; min-height:60px; display:flex; align-items:center; justify-content:center;">
            <section style="font-size:18px;font-weight:bold; color:#333; z-index:1; padding:10px; line-height:1.5;">{{
              q.answer.replace(/\n/g, '<br>') }}</section>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
              style="position:absolute; top:0; left:0; z-index:2;">
              <rect width="100%" height="100%" fill="#ffffff" opacity="1"></rect>
              <animate attributeName="opacity" begin="click" from="1" to="0" dur="0.1s" fill="freeze"></animate>
            </svg>
          </section>
        </section>
      </div>
    </section>

    <!-- 输出区 -->
    <section class="output-html">
      <h3 style="margin-bottom: 12px;">公众号 HTML 源码（复制到源代码模式）：</h3>
      <textarea :value="outputHtml" readonly rows="12"
        style="width: 100%; padding: 12px; font-family: monospace; font-size: 14px; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; white-space: pre-wrap;"></textarea>
      <button @click="copyToClipboard" :disabled="questions.length === 0"
        style="margin-top: 10px; padding: 10px 20px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        📋 一键复制全部 HTML
      </button>
      <p v-if="copied" style="color: green; margin-top: 8px;">✅ 已复制到剪贴板！</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showMessage, copyText } from '../tools'

const questions = ref([
  {
    question: '对“人生一波三折”\n有什么看法？',
    answer: '“好便宜，便宜到我都想哭了。”'
  }
])

const addQuestion = () => {
  questions.value.push({ question: '', answer: '' })
}

const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

const clearAll = () => {
  questions.value = []
}

// 生成公众号兼容 HTML
const outputHtml = computed(() => {
  return questions.value
    .map((q, idx) => {
      const num = String(idx + 1).padStart(2, '0')
      // 安全转义
      const safeQ = q.question
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
      const safeA = q.answer
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')

      return `<section style="position:relative; padding:25px; margin:25px auto; max-width:600px; width:90%; background:#fff; text-align:center; font-family:-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif; border:1px solid #f8caca; border-radius:10px;">
  <section style="position:absolute; top:-12px; left:20px; background:#8EC965; color:#fff; font-weight:bold; padding:4px 10px; border-radius:4px; font-size:16px;">${num}</section>
  <img src="https://mmbiz.qpic.cn/mmbiz_png/vbAy22U8gukJgXHpI3S2X5CJsn9NcHfQXu7d5EjD8ln6BoDGhJm5Ms1PB0mib85ic0WoNrXgecZVuJ0WK3YY1uPw/0?wx_fmt=png" alt="★" style="position:absolute; top:-8px; right:10px; width:22px; height:22px;">
  <section style="font-size:20px; line-height:1.6; margin:40px 0 25px;">${safeQ}</section>
  <section style=" border:2px solid #eee; border-radius:12px;padding:15px; margin:0 auto ; width:85%;cursor:pointer;color:#999; font-size:18px;color:#999;">👇 点击下方空白处获得答案 👁️</section>
  <section style="position:relative; min-height:60px; display:flex; align-items:center; justify-content:center;">
    <section style="font-size:18px;font-weight:bold; color:#333; z-index:1; padding:10px; line-height:1.5;">${safeA}</section>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position:absolute; top:0; left:0; z-index:2;">
      <rect width="100%" height="100%" fill="#ffffff" opacity="1"></rect>
      <animate attributeName="opacity" begin="click" from="1" to="0" dur="0.1s" fill="freeze"></animate>
    </svg>
  </section>
</section>`
    })
    .join('\n\n')
})

const copied = ref(false)
const copyToClipboard = async () => {
  const result = outputHtml.value += `<section
  style="text-align: left;justify-content: flex-start;display: flex;flex-flow: row;margin: 10px 0px;box-sizing: border-box;">
  <section
    style="display: inline-block;vertical-align: middle;width: auto;align-self: center;flex: 0 0 0%;height: auto;box-sizing: border-box;">
    <section style="text-align: center;margin: 0px;line-height: 0;box-sizing: border-box;">
      <section
        style="max-width: 100%;vertical-align: middle;display: inline-block;line-height: 0;width: 35px;height: auto;box-sizing: border-box;"
        nodeleaf=""><img class="rich_pages wxw-img __bg_gif" data-ratio="1.484076433121019" data-s="300,640"
          data-type="gif" data-w="314"
          style="vertical-align: middle; max-width: 100%; width: 35px !important; box-sizing: border-box; height: auto !important; visibility: visible !important;"
          data-imgfileid="100005090"
          data-src="https://mmbiz.qpic.cn/mmbiz_gif/vbAy22U8gukJgXHpI3S2X5CJsn9NcHfQhZl9rzGg5O7BfXqoiaK5PBibECmYtkn7o2cvYZeAfaM0fz67SDyYC0Vg/0?wx_fmt=gif&from=appmsg"
          data-original-style="vertical-align: middle;max-width: 100%;width: 100%;box-sizing: border-box;height: auto !important;"
          data-index="19"
          src="https://mmbiz.qpic.cn/mmbiz_gif/vbAy22U8gukJgXHpI3S2X5CJsn9NcHfQhZl9rzGg5O7BfXqoiaK5PBibECmYtkn7o2cvYZeAfaM0fz67SDyYC0Vg/0?wx_fmt=gif&from=appmsg"
          _width="100%" data-order="9" alt="图片" data-report-img-idx="19" data-fail="0"></section>
    </section>
  </section>
  <section
    style="display: inline-block;vertical-align: middle;width: auto;align-self: center;flex: 0 0 auto;min-width: 10%;max-width: 100%;height: auto;padding: 0px 0px 0px 10px;box-sizing: border-box;">
    <section style="margin: 20px 0px 0px;box-sizing: border-box;">
      <section style="text-align: justify;font-size: 14px;color: rgb(160, 160, 160);box-sizing: border-box;">
        <p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><span leaf="">关注<span
              textstyle="" style="color: rgb(255, 172, 170);font-weight: bold;">翻个页先</span>，希望我的文字，能给你带来一丝慰藉和力量。💬</span></p>
      </section>
    </section>
  </section>
</section>
<section
  style="text-align: center;justify-content: center;display: flex;flex-flow: row;margin: 10px 0px;box-sizing: border-box;">
  <section
    style="display: inline-block;vertical-align: bottom;width: auto;align-self: flex-end;flex: 0 0 auto;min-width: 5%;max-width: 100%;height: auto;box-sizing: border-box;">
    <section
      style="transform: perspective(0px);-webkit-transform: perspective(0px);-moz-transform: perspective(0px);-o-transform: perspective(0px);transform-style: flat;box-sizing: border-box;">
      <section
        style="margin: 0px 0px 15px;line-height: 0;transform: rotateY(180deg);-webkit-transform: rotateY(180deg);-moz-transform: rotateY(180deg);-o-transform: rotateY(180deg);box-sizing: border-box;">
        <section
          style="max-width: 100%;vertical-align: middle;display: inline-block;line-height: 0;width: 50px;height: auto;box-sizing: border-box;"
          nodeleaf=""><img class="rich_pages wxw-img __bg_gif" data-ratio="0.536036036036036" data-s="300,640"
            data-type="gif" data-w="222"
            style="vertical-align: middle; max-width: 100%; width: 50px !important; box-sizing: border-box; height: auto !important; visibility: visible !important;"
            data-imgfileid="100005089"
            data-src="https://mmbiz.qpic.cn/sz_mmbiz_gif/EibLIK4kkbbpUWYR4o6lQjqkHiccPMxySrn4dBCjvgtGg4q4icKlN66T0ITmuut8s6NL53AkPNzpqehumZOnnZaBQ/640?wx_fmt=gif&amp;from=appmsg#imgIndex=18"
            data-original-style="vertical-align: middle;max-width: 100%;width: 100%;box-sizing: border-box;height: auto !important;"
            data-index="20"
            src="https://mmbiz.qpic.cn/sz_mmbiz_gif/EibLIK4kkbbpUWYR4o6lQjqkHiccPMxySrn4dBCjvgtGg4q4icKlN66T0ITmuut8s6NL53AkPNzpqehumZOnnZaBQ/640?wx_fmt=gif&amp;from=appmsg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1#imgIndex=18"
            _width="100%" data-order="10" alt="图片" data-report-img-idx="17" data-fail="0"></section>
      </section>
    </section>
  </section>

  <section
    style="display: inline-block;vertical-align: bottom;width: auto;align-self: flex-end;flex: 0 0 auto;min-width: 5%;max-width: 100%;height: auto;padding: 0px;background-color: rgb(255, 242, 240);box-sizing: border-box;">
    <section style="margin: -15px 0px 0px;box-sizing: border-box;">
      <section
        style="text-align: justify;color: rgb(236, 143, 172);font-size: 14px;letter-spacing: 2px;box-sizing: border-box;">
        <p style="white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong
            style="box-sizing: border-box;">
            <font style="box-sizing: border-box;"><span leaf="">你点的每个赞，我都认真地当成了喜欢。</span></font>
          </strong></p>
      </section>
    </section>
  </section>


  <section
    style="display: inline-block;vertical-align: bottom;width: auto;align-self: flex-end;flex: 0 0 auto;min-width: 5%;max-width: 100%;height: auto;box-sizing: border-box;">
    <section style="margin: 0px 0px 15px;line-height: 0;box-sizing: border-box;">
      <section
        style="max-width: 100%;vertical-align: middle;display: inline-block;line-height: 0;width: 50px;height: auto;box-sizing: border-box;"
        nodeleaf=""><img class="rich_pages wxw-img __bg_gif" data-ratio="0.536036036036036" data-s="300,640"
          data-type="gif" data-w="222"
          style="vertical-align: middle; max-width: 100%; width: 50px !important; box-sizing: border-box; height: auto !important; visibility: visible !important;"
          data-imgfileid="100005088"
          data-src="https://mmbiz.qpic.cn/sz_mmbiz_gif/EibLIK4kkbbpUWYR4o6lQjqkHiccPMxySrn4dBCjvgtGg4q4icKlN66T0ITmuut8s6NL53AkPNzpqehumZOnnZaBQ/640?wx_fmt=gif&amp;from=appmsg#imgIndex=19"
          data-original-style="vertical-align: middle;max-width: 100%;width: 100%;box-sizing: border-box;height: auto !important;"
          data-index="21"
          src="https://mmbiz.qpic.cn/sz_mmbiz_gif/EibLIK4kkbbpUWYR4o6lQjqkHiccPMxySrn4dBCjvgtGg4q4icKlN66T0ITmuut8s6NL53AkPNzpqehumZOnnZaBQ/640?wx_fmt=gif&amp;from=appmsg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1#imgIndex=19"
          _width="100%" data-order="11" alt="图片" data-report-img-idx="18" data-fail="0"></section>
    </section>
  </section>
</section>
</section>
<p style="display: none;">
  <mp-style-type data-value="3">
  </mp-style-type>
</p>
`
  copyText(result)
  showMessage('代码已复制到剪贴板！');
}
</script>

<style>
.btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  left: 400px;
  top: 230px;
  text-align: center;
  margin-bottom: 24px;
  z-index: 1000;
}

.btn {
  padding: 6px;
  font-size: 12px;
  background: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.del-btn {
  background: #ff4d4f;
}

.output-html {
  position: fixed;
  right: 100px;
  top: 230px;
}
</style>