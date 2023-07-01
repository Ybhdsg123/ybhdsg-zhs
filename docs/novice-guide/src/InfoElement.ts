import NoviceGuide, { Step } from '../index'
import { prefix, loadImage } from './utils'

export default class infoElement {
  public el: HTMLElement
  constructor(public app: NoviceGuide) {
    this.app = app
    this.el = null
    this.app.on('after-step-change', this.onStepChange.bind(this))
  }

  // 显示信息框
  async show(step: Step) {
    if (this.app.options.useCustomInfo && this.app.options.getCustomInfoEl) {
      // 自定义信息框
      let el = await this.app.options.getCustomInfoEl(step)
      let res = this.getInfoRect(step, el)
      el.style.left = res.left + 'px'
      el.style.top = res.top + 'px'
    } else {
      // 内置信息框
      await this.showInnerInfo(step)
    }
  }

  // 内置信息框
  async showInnerInfo(step: Step) {
    // 没有元素就创建
    if (!this.el) {
      this.createEl()
    }

    if (step.img) {
      try {
        await loadImage(step.img)
      } catch (error) {
        console.error(error)
      }
    }

    // 添加信息框元素,里面的内容
    this.el.innerHTML = this.createHTML(step)
    // 计算信息框的位置
    let res = this.getInfoRect(step, this.el)
    this.el.style.left = res.left + 'px'
    this.el.style.top = res.top + 'px'
  }

  // 创建内置信息框的内容
  // 通过 data-type 来区分点击的元素，通过 data-index 来区分指示器
  createHTML(step: Step) {
    let { prevText, nextText, showIndicator } = this.app.options
    return `
  <div class="${prefix}info-el-header">
    <div class="${prefix}info-el-title">${step.title || ''}</div>
    <div class="${prefix}info-el-close" data-type="close">×</div>
  </div>
  <div class="${prefix}info-el-info">
    ${
      step.img
        ? `<img class="${prefix}info-el-info-img" src="${step.img}" />`
        : ''
    }
    <div class="${prefix}info-el-info-text">${step.text || ''}</div>
  </div>
  <div class="${prefix}info-el-indicator">
    ${
      showIndicator
        ? this.app.steps
            .map((_, index) => {
              return `<div class="${prefix}info-el-indicator-item ${
                index === this.app.currentStepIndex ? 'active' : ''
              }" data-type="indicator" data-index="${index}"></div>`
            })
            .join('\n')
        : ''
    }
  </div>
  <div class="${prefix}info-el-btn-group">
    <div class="${prefix}info-el-btn ${prefix}info-el-btn-prev ${
      this.app.isFirstStep() ? 'disabled' : ''
    }" data-type="prev">${prevText}</div>
    <div class="${prefix}info-el-btn ${prefix}info-el-btn-next" data-type="next">${nextText}</div>
  </div>
`
  }

  // 创建内置信息框元素
  createEl() {
    let { padding, borderRadius, backgroundColor, infoElClass, zIndex } =
      this.app.options
    this.el = document.createElement('div')
    // 添加类名
    this.el.className = prefix + 'info-el'
    // 添加元素样式
    this.el.style.cssText = `
    background-color: ${backgroundColor}; 
    padding: ${padding}px;
    border-radius: ${borderRadius};
    z-index: ${zIndex};
  `
    // 有信息框元素类名，就添加
    if (infoElClass) {
      this.el.classList.add(infoElClass)
    }
    document.body.appendChild(this.el)
    this.el.addEventListener('click', this.onClick.bind(this))
  }

  // 移除内置信息框
  removeEl() {
    if (this.el) {
      document.body.removeChild(this.el)
      this.el = null
    }
  }

  // 更新内置信息框的状态
  onStepChange(stepIndex: number) {
    let { nextText, prevText, completeText, useCustomInfo } = this.app.options
    // 使用自定义的信息框，直接返回
    if (useCustomInfo) return

    // 更新按钮样式和文字
    let prevEl = document.querySelector(`.${prefix}info-el-btn-prev`) // 上一步
    let nextEl = document.querySelector(`.${prefix}info-el-btn-next`) // 下一步

    prevEl.classList.remove('disabled') // 上一步先移除禁用
    prevEl.textContent = prevText // 设置下一步文字
    nextEl.textContent = nextText // 设置下一步文字

    if (this.app.isFirstStep()) {
      // 是第一步的话 禁用 上一步按钮
      prevEl.classList.add('disabled')
    }

    if (this.app.isLastStep()) {
      // 是最后一步的话 改变 下一步按钮文字
      nextEl.textContent = completeText
    }

    // 更新指示器状态，将 元素类数组 变为 数组
    let indicatorEls = Array.from(
      document.querySelectorAll(`.${prefix}info-el-indicator-item`)
    )
    // 循环判断是否存在 类active，存在就全部移除
    indicatorEls.forEach(item => {
      // 通过Element.classList.contains('类名')方法判断是否包含在列表中
      if (item.classList.contains('active')) {
        // 如果存在就移除
        item.classList.remove('active')
      }
    })
    // 为当前步骤指示器添加 类 active （上一步干掉所有，这里留下自己）
    if (indicatorEls[stepIndex]) {
      indicatorEls[stepIndex].classList.add('active')
    }
  }

  // 内置信息框的点击
  onClick(e: MouseEvent) {
    // 拿到自定义数据
    let type = (e.target as HTMLElement).getAttribute('data-type')
    switch (type) {
      case 'close':
        this.app.done()
        break
      case 'prev':
        this.app.prev()
        break
      case 'next':
        this.app.next()
        break
      case 'indicator':
        let index = (e.target as HTMLElement).getAttribute('data-index')
        if (!Number.isNaN(Number(index))) {
          this.app.jump(Number(index))
        }
        break
      default:
        break
    }
  }

  //计算信息框位置
  getInfoRect(step: Step, el: HTMLElement) {
    // 当前有元素
    if (step.element) {
      return this.computeInfoPosition(step, el)
    } else {
      // 没有元素，居中显示
      const rect = el.getBoundingClientRect()
      return {
        left: (window.innerWidth - rect.width) / 2 + window.pageXOffset,
        top: (window.innerHeight - rect.height) / 2 + window.pageYOffset
      }
    }
  }

  // 动态计算信息框的位置
  computeInfoPosition(step: Step, el: HTMLElement) {
    const { padding, margin } = this.app.options
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const windowPageXOffset = window.pageXOffset
    const windowPageYOffset = window.pageYOffset
    // 这里 rect(传进来的step就是高亮元素框)
    const rect = step.element.getBoundingClientRect()
    // 这里 infoRect(传进来的el)是信息框
    const infoRect = el.getBoundingClientRect()
    let left = 0
    let top = 0
    // 这里是 信息框 相对于 高亮框
    const adjustLeft = () => {
      // 优先和高亮框左对齐
      if (windowWidth - rect.left - padding >= infoRect.width) {
        return rect.left - padding + windowPageXOffset
      } else if (rect.right + padding >= infoRect.width) {
        // 次优先和高亮框右对齐
        return rect.right + padding - infoRect.width + windowPageXOffset
      } else {
        // 否则水平居中显示
        return (windowWidth - infoRect.width) / 2 + windowPageXOffset
      }
    }
    const adjustTop = () => {
      // 优先和高亮框上对齐
      if (windowHeight - rect.top - padding >= infoRect.height) {
        return rect.top - padding + windowPageYOffset
      } else if (rect.bottom + padding >= infoRect.height) {
        // 次优先和高亮框下对齐
        return rect.bottom + padding - infoRect.height + windowPageYOffset
      } else {
        // 否则水平居中显示
        return (windowHeight - infoRect.height) / 2 + windowPageYOffset
      }
    }
    if (
      rect.bottom + padding + margin + infoRect.height <= windowHeight && // 下方宽度可以容纳
      infoRect.width <= windowWidth // 信息框宽度比浏览器窗口小
    ) {
      // 可以在下方显示
      left = adjustLeft()
      top = rect.bottom + padding + margin + windowPageYOffset
    } else if (
      rect.top - padding - margin >= infoRect.height &&
      infoRect.width <= windowWidth
    ) {
      // 可以在上方显示
      left = adjustLeft()
      top = rect.top - padding - margin - infoRect.height + windowPageYOffset
    } else if (
      rect.left - padding - margin >= infoRect.width &&
      infoRect.height <= windowHeight
    ) {
      // 可以在左方显示
      left = rect.left - padding - margin - infoRect.width + windowPageXOffset
      top = adjustTop()
    } else if (
      rect.right + padding + margin + infoRect.width <= windowWidth &&
      infoRect.height <= windowHeight
    ) {
      // 可以在右方显示
      left = rect.right + padding + margin + windowPageXOffset
      top = adjustTop()
    } else {
      // 否则检查高亮框高度+信息框高度是否小于窗口高度
      let totalHeightLessThenWindow =
        rect.height + padding * 2 + margin + infoRect.height <= windowHeight
      if (
        totalHeightLessThenWindow &&
        Math.max(rect.width + padding * 2, infoRect.width) <= windowWidth
      ) {
        // 上下排列可以放置
        // 滚动页面，居中显示两者整体
        let newTop =
          (windowHeight -
            (rect.height + padding * 2 + margin + infoRect.height)) /
          2
        window.scrollBy(0, rect.top - newTop)
      } else {
        // 恕我无能为力
        // 回到默认位置
      }
      left = adjustLeft()
      top = rect.bottom + padding + margin + windowPageYOffset
    }
    return {
      left,
      top
    }
  }
}
