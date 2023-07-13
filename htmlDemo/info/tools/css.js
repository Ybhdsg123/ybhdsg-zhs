// 字体样式文件
let styleEl = null;
// iconfont 样式link
let iconfontLink = null;

// 添加css
export function addCss() {
  let cssText = "";
  cssText += `
  :root {
    --success-bg-color: #f0f9eb;
    --success-text-color: #67c23a;
    --warning-bg-color: #e6a23c;
    --danger-text-color: #fefe0f;
    --info-bg-color: #909399;
    --info-text-color: #909399;
    --fs-color: #606266;
  }
  .msg-box {
    position: absolute;
    display: flex;
    align-items: center;
    left: 50%;
    top: 10px;
    transform: translate3d(-50%, 0%, 0);
    background-color: var(--success-bg-color);
    border-radius: 4px;
    padding: 8px 16px;
  }
  .msg-box-icon {
    color: var(--success-text-color);
  }
  .msg-box--text {
    font-size: 12px;
    color: var(--success-text-color);
    padding: 0px 8px;
  }
  .close {
    font-size: 12px;
    color: #c0c4cc;
    cursor: pointer;
  }
  `;
  styleEl = document.createElement("style");
  styleEl.innerHTML = cssText;
  document.head.appendChild(styleEl);
}

// 移除 css 和字体文件
export function removeCss() {
  if (styleEl) {
    document.head.removeChild(styleEl);
    document.head.removeChild(iconfontLink);
  }
}

// 添加 iconfont 字体样式文件
export function addIconfontLink(url) {
  iconfontLink = document.createElement("link");
  // 这里设置 link 标签的 type='text/css'，不然无法正确识别 iconfont 的 MIME
  iconfontLink.type = "text/css";
  iconfontLink.rel = "stylesheet";
  iconfontLink.href = url;
  document.head.appendChild(iconfontLink);
}
