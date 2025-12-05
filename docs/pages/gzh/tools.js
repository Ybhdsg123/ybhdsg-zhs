


// 复制文本到剪贴板
function fallbackCopyText(text) {
  // 创建一个临时的 textarea 元素（不可见）
  const textarea = document.createElement("textarea");

  // 设置内容
  textarea.value = text;

  // 避免滚动到底部（如果页面很长）
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "2em";
  textarea.style.height = "2em";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";
  textarea.setAttribute("readonly", "");

  // 插入到 DOM
  document.body.appendChild(textarea);

  try {
    // 选中内容
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length); // 移动端兼容

    // 执行复制命令
    const success = document.execCommand("copy");
    if (!success) {
      throw new Error("execCommand copy failed");
    }
  } catch (err) {
    console.warn("Fallback copy failed:", err);
    // 可选：提示用户手动复制
    alert("复制失败，请手动选择并复制文本。");
  } finally {
    // 清理：移除临时元素
    document.body.removeChild(textarea);
  }
}
export async function copyText(text) {
  if (typeof text !== "string") {
    console.error("copyText: input must be a string");
    return;
  }

  try {
    // 现代 API
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // 降级到 execCommand 方案
    fallbackCopyText(text);
  }
}

// 创建提示元素 - 居中展示，区分状态素
export function showMessage(message, type = "success") {
  // 移除已存在的提示
  const existingMsg = document.querySelector(".message-toast");
  if (existingMsg) {
    existingMsg.remove();
  }

  const msg = document.createElement("div");
  msg.className = "message-toast";
  msg.textContent = message;

  // 根据类型设置样式
  const styles = {
    success: {
      background: "#4CAF50",
      icon: "✓",
    },
    error: {
      background: "#f44336",
      icon: "✕",
    },
    warning: {
      background: "#ff9800",
      icon: "⚠",
    },
    info: {
      background: "#2196F3",
      icon: "ℹ",
    },
  };

  const styleConfig = styles[type] || styles.success;

  msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${styleConfig.background};
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
    `;

  // 添加图标
  const icon = document.createElement("span");
  icon.textContent = styleConfig.icon;
  icon.style.fontSize = "16px";
  msg.prepend(icon);

  document.body.appendChild(msg);

  // 显示动画
  setTimeout(() => {
    msg.style.opacity = "1";
  }, 10);

  // 3秒后自动消失
  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 100);
  }, 1000);
}

// 使用示例
// showMessage('复制成功！', 'success');
// showMessage('复制失败！', 'error');
// showMessage('正在处理...', 'info');
// showMessage('请注意格式', 'warning');


// 生成随机但固定的ID 图片，用于头像等 从这个里面 https://picsum.photos
export function generateRandomImages() {
  const imageIds = Math.floor(Math.random() * 1000) + 1;
  return `https://picsum.photos/id/${imageIds}/40/40`;
}

// 中文昵称生成器 (仅 50 行代码，0 依赖)
export function generateChineseNickname() {
  const prefixes =['小', '大', '阿', '老', '', '超', '超级', '萌', '可爱', '帅气', '迷人', '阳光', '温柔', '酷炫', '乖巧', '聪明', '机灵', '活泼', '安静', '文艺', '幽默', '善良', '勇敢', '坚强', '乐观'];
  const suffixes =['同学', '宝贝', '丫头', '小子', '仙女', '先生', '小姐姐', '小哥哥', '达人', '专家', '玩家', '爱好者', '达人', '小王子', '小公主', '英雄', '女神', '王者', '勇士', '天使', '魔法师', '诗人', '画家', '音乐家'];
  // 常见中文名（简化版）
  const maleNames = ['强', '伟', '杰', '明', '勇', '军', '刚', '波', '涛', '峰', '宇', '轩', '浩', '然', '凯', '乐', '翔', '博', '辰', '睿', '泽', '林', '阳', '辉', '鹏'];
  const femaleNames = ['芳', '娜', '敏', '静', '丽', '娟', '艳', '玲', '霞', '婷', '雪', '莹', '燕', '欣', '怡', '悦', '梅', '琳', '琴', '蓉', '丹', '玉', '慧', '倩', '梦'];
  const neutralNames = ['星', '月', '风', '云', '阳', '晨', '梦', '然', '言', '墨', '白', '青', '蓝', '橙', '雨', '晴', '雪', '竹', '花', '叶', '秋', '冬', '夏', '春', '海', '山'];

  // 随机选择类型 (0: 前缀+名字, 1: 名字+后缀, 2: 纯名字, 3: 叠字)
  const type = Math.floor(Math.random() * 4);
  const isMale = Math.random() > 0.5;
  const namePool = isMale ? maleNames : femaleNames;

  switch (type) {
    case 0: // 前缀+名字
      return (
        prefixes[Math.floor(Math.random() * prefixes.length)] +
        namePool[Math.floor(Math.random() * namePool.length)]
      );

    case 1: // 名字+后缀
      return (
        neutralNames[Math.floor(Math.random() * neutralNames.length)] +
        suffixes[Math.floor(Math.random() * suffixes.length)]
      );

    case 2: // 两个字的组合名字
      return (
        neutralNames[Math.floor(Math.random() * neutralNames.length)] +
        neutralNames[Math.floor(Math.random() * neutralNames.length)]
      );

    case 3: // 叠字昵称 (特别可爱)
      const char =
        neutralNames[Math.floor(Math.random() * neutralNames.length)];
      return char + char;

    default:
      return (
        "小" + neutralNames[Math.floor(Math.random() * neutralNames.length)]
      );
  }
}
