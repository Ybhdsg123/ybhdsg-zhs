<template>
  <div
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="text-align: center; margin-bottom: 24px;">公众号「多条哲理语录」生成器</h2>

    <!-- 控制按钮 -->
    <div class="btns">
      <button @click="addQuote" class="btn">
        ➕ 添加一条语录
      </button>
      <button @click="removeAll" :disabled="quotes.length === 0" class="btn del-btn">
        🗑️ 清空所有
      </button>
    </div>

    <!-- 编辑列表 -->
    <div v-for="(item, index) in quotes" :key="index"
      style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px; position: relative;">
      <button @click="removeQuote(index)"
        style="position: absolute; top: 10px; right: 10px; background: #ffccc7; border: none; width: 24px; height: 24px; border-radius: 50%; font-size: 14px; cursor: pointer;"
        title="删除">
        ×
      </button>

      <label style="display: block; margin-bottom: 8px; font-weight: bold;">语录 {{ index + 1 }} 内容（支持换行）</label>
      <textarea v-model="item.content" placeholder="例如：真正的自由，是拥有说“不”的底气。" rows="3"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"></textarea>

      <label style="display: block; margin-top: 12px; margin-bottom: 8px; font-weight: bold;">署名（可选）</label>
      <input v-model="item.author" placeholder="例如：—— 今日思考"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;" />
    </div>

    <!-- 预览区 -->
    <section style="margin: 30px 0;">
      <h3 style="margin-bottom: 16px;">整体预览：</h3>
      <div style="border: 1px dashed #ddd; padding: 16px; background: #fafafa; min-height: 100px;">
        <section v-for="(item, index) in quotes" :key="index"
          style="padding:30px 20px; margin:20px auto; max-width:600px; width:90%; text-align:center; border-bottom:1px solid #eee;">
          <section style="font-size:18px; line-height:1.3; color:#000; margin-bottom:25px;">{{
            item.content.replace(/\n/g, '<br>') }}</section>
          <section v-if="item.author" style="color:#888; font-size:15px;">{{ item.author }}</section>
        </section>
      </div>
    </section>

    <div>
      <label style="display: block; margin-bottom: 8px; font-weight: bold;">关注提示语</label>
      1. 谢谢你，在这个星球的亿万人中，选择停留在这里❤️
      2. 这里是一个关于【情感/成长/生活】的温暖角落。
      3. 希望我的文字，能给你带来一丝慰藉和力量。
      4. 累了的时候，记得回来看看。
      <input type="text" v-model="followPrompt" placeholder="关注提示语"
        style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 20px;" />
    </div>
    <!-- 输出区 -->
    <section class="output-html">
      <h3 style="margin-bottom: 12px;">公众号 HTML 源码（复制到源代码模式）：</h3>
      <textarea :value="outputHtml" readonly rows="10"
        style="width: 100%; padding: 12px; font-family: monospace; font-size: 14px; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; white-space: pre-wrap;"></textarea>
      <button @click="copyToClipboard" :disabled="quotes.length === 0"
        style="margin-top: 10px; padding: 10px 20px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        📋 一键复制全部 HTML
      </button>
      <p v-if="copied" style="color: green; margin-top: 8px;">✅ 已复制到剪贴板！</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showMessage, copyText} from '../tools'

// 初始数据：可预置一条示例
const quotes = ref([
  {
    content: '真正的自由，\n是拥有说“不”的底气。',
    author: '—— 今日思考'
  }
])

// 关注什么后面提示语
const followPrompt = ref('谢谢你，在这个星球的亿万人中，选择停留在这里❤️')

// 方法
const addQuote = () => {
  quotes.value.push({
    content: '',
    author: '—— 今日思考'
  })
}

const removeQuote = (index) => {
  quotes.value.splice(index, 1)
}

const removeAll = () => {
  quotes.value = []
}

// 生成公众号兼容的 HTML 字符串
const outputHtml = computed(() => {
  if (quotes.value.length === 0) return ''

  return quotes.value
    .map(item => {
      // 安全转义 HTML 特殊字符
      const safeContent = item.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
      const safeAuthor = item.author
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      return `<section style="padding:30px 20px; margin:20px auto; max-width:600px; width:90%; text-align:center; font-family:-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif; border-bottom:1px solid #eee;">
  <section style="font-size:18px; line-height:1.3; color:#000; margin-bottom:25px;">${safeContent}</section>
  ${safeAuthor ? `<section style="color:#888; font-size:15px;">${safeAuthor}</section>` : ''}
</section>`
    })
    .join('\n')
})

// 复制功能
const copied = ref(false)
const copyToClipboard = async () => {
  const result = outputHtml.value +=`<section
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
      <section style="text-align: justify;font-size: 12px;color: rgb(160, 160, 160);box-sizing: border-box;">
         关注<span style="color: rgb(255, 172, 170);font-weight: bold;">翻个页先</span>，
         <br>
        <span>
        ${followPrompt.value}
        </span>
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
.btns{
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
.del-btn{
  background: #ff4d4f;
}
.output-html{
  position: fixed;
  right: 100px;
    top: 230px;
}
</style>