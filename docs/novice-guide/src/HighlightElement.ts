import NoviceGuide, { Step } from '../index'
import { prefix } from './utils'

export default class HighlightElement {
  public el: HTMLElement
  constructor(public app: NoviceGuide) {
    this.app = app
    this.el = null
  }

  // 显示高亮元素
  show(step: Step) {
    // 如果没有 高亮元素，创建一个
    if (!this.el) {
      this.createEl()
    }

    let left = 0,
      top = 0,
      width = 0,
      height = 0

    // 为了跨浏览器兼容性，请使用 window.pageXOffset 代替 window.scrollX
    let x = window.pageXOffset
    let y = window.pageYOffset

    if (step.element) {
      // getBoundingClientRect 返回一个 DOMRect 对象，其提供了元素的大小及其相对于 视口 的位置。
      const rect = step.element.getBoundingClientRect()
      const { padding } = this.app.options
      // 设置定位距离 左边 和 上边 的距离，返回的 rect 宽度包括 padding 和 border-width
      left = rect.left + x - padding
      top = rect.top + y - padding
      width = rect.width + padding * 2
      height = rect.height + padding * 2
    } else {
      // 当前步骤没有元素则宽高设为0，然后窗口居中显示
      left = window.innerWidth / 2 + x
      top = window.innerHeight / 2 + y
      width = 0
      height = 0
    }
    // 设置位置和大小
    this.el.style.left = left + 'px'
    this.el.style.top = top + 'px'
    this.el.style.width = width + 'px'
    this.el.style.height = height + 'px'
  }

  // 创建高亮元素
  createEl() {
    let { boxShadowColor, transition, borderRadius, highlightElClass, zIndex } =
      this.app.options
    this.el = document.createElement('div')
    // 给高亮元素添加 类名(绝对定位)
    this.el.className = `${prefix}highlight-el`
    // 给高亮元素添加样式，行内样式
    this.el.style.cssText = `
        box-shadow: 0 0 0 5000px ${boxShadowColor};
        border-radius: ${borderRadius};
        transition: ${transition};
        z-index: ${zIndex};
    `
    // 配置的有 highlightElClass 的话加上这个类名
    if (highlightElClass) {
      this.el.classList.add(highlightElClass)
    }
    // 添加到 body 上
    document.body.appendChild(this.el)
  }

  // 移除高亮元素
  removeEl() {
    if (this.el) {
      document.body.removeChild(this.el)
      this.el = null
    }
  }
}
