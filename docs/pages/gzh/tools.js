


// 复制文本到剪贴板
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // 降级方案
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
// 头像链接数据
// const avatarLinks = [
//   { name: '头像1', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc7hylVJkrkrzKsr1SajvHlkoshO8hmb2mZ4uiarEaxOfr0tRO6rMw09w/0?wx_fmt=jpeg' },
//   { name: '头像2', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXcg6cGO5coH6iaCz2dC5tRKPLhm9LxpNxqeoB1iboqfEUSjBReC4c7xt4A/0?wx_fmt=jpeg' },
//   { name: '头像3', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXc6lIlaib6HAhyhpjjsFCFIJWN9oQOyia3ibsgd7yLibL1dbPIq80mc9dnhQ/0?wx_fmt=jpeg' },
//   { name: '头像4', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8gulyF5lfGZRGxHCtth0RRMXcmSW00dUY53tgf8icWTvHyQHr2Q1micbLux095fLrBgftdmDgSibzQJV3A/0?wx_fmt=jpeg' },
//   { name: '头像5', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveyiazPxicpkAywbdb4pdfQt2cUyH31iaicSVlqoOvKD9qDzQI64Oq6YAc1A/0?wx_fmt=jpeg' },
//   { name: '头像6', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveCA6ZgGTrZKCzt2tac5bGSbD4Ltr5yclX7FXEBvPeQvYpZl2AicgKE7Q/0?wx_fmt=jpeg' },
//   { name: '头像7', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveGIQTtSlUmEx1pfr1H5z2pgUNicPdtqNOoIouyRTax4r82ha9VgBviczw/0?wx_fmt=jpeg' },
//   { name: '头像8', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveKsZAOibbRJVumXd3uMm6jKTVvqZk1cZOAA2CHPyjerT2f40EzfiaqhOg/0?wx_fmt=jpeg' },
//   { name: '头像9', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveKsZAOibbRJVumXd3uMm6jKTVvqZk1cZOAA2CHPyjerT2f40EzfiaqhOg/0?wx_fmt=jpeg' },
//   { name: '头像10', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/vbAy22U8guk6FpciaGGYLnxu5eicRAYxveUWdESvEGtgImmb0Q1SmWxM8AtgMAXkq59QsFAQ1ELRRbAMicaByudsw/0?wx_fmt=jpeg' },
// ]

// 生成随机但固定的ID 图片，用于头像等 从这个里面 https://picsum.photos
export function generateRandomImages() {
  const imageIds = Math.floor(Math.random() * 1000) + 1;
  return `https://picsum.photos/id/${imageIds}/40/40`;
}

// 中文昵称生成器 (仅 50 行代码，0 依赖)
export function generateChineseNickname() {
  const prefixes =['小', '大', '阿', '老', '', '超', '超级', '萌', '可爱', '帅气', '迷人', '阳光', '温柔'];
  const suffixes =['同学', '宝贝', '丫头', '小子', '仙女', '先生', '小姐姐', '小哥哥', '达人', '专家', '玩家', '爱好者'];
  // 常见中文名（简化版）
  const maleNames = ['强', '伟', '杰', '明', '勇', '军', '刚', '波', '涛', '峰', '宇', '轩', '浩', '然', '凯', '乐'];
  const femaleNames = ['芳', '娜', '敏', '静', '丽', '娟', '艳', '玲', '霞', '婷', '雪', '莹', '燕', '欣', '怡', '悦'];
  const neutralNames = ['星', '月', '风', '云', '阳', '晨', '梦', '然', '言', '墨', '白', '青', '蓝', '橙', '雨', '晴'];

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
