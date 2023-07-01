import EventEmitter from 'eventemitter3'
import HighlightElement from './src/HighlightElement'
import infoElement from './src/InfoElement'
import { addCss, removeCss } from './src/css'
import { scrollAncestorToElement, elementIsInView } from './src/utils'
// 定义单个步骤的接口
export interface Step {
  element: HTMLElement
  title: string | number
  text: string | number
  img: string
}

// 定义自定义提示框的函数类型
type GetCustomInfoEl = (step: Step) => Promise<HTMLElement>

// 定义配置接口
interface Options {
  padding?: number
  margin?: number
  boxShadowColor?: string
  transition?: string
  borderRadius?: string
  highlightElClass?: string
  backgroundColor?: string
  infoElClass?: string
  prevText?: string
  nextText?: string
  completeText?: string
  showIndicator?: boolean
  zIndex?: number
  useCustomInfo?: boolean
  getCustomInfoEl?: GetCustomInfoEl
  steps: Array<Step>
}

type Steps = Array<Step>

// 默认配置的接口
interface DefaultOptions {
  // 高亮元素和信息框元素的内边距
  padding: number
  // 高亮元素和信息框元素之间的间距
  margin: number
  // 高亮元素的box-shadow颜色
  boxShadowColor: string
  // 高亮元素过渡效果
  transition: string
  // 高亮元素和信息框元素的圆角
  borderRadius: string
  // 要添加到高亮元素上的css类名
  highlightElClass: string
  // 信息框元素的背景颜色
  backgroundColor: string
  // 要添加到信息框元素上的css类名
  infoElClass: string
  // 上一步按钮的文字
  prevText: string
  // 下一步按钮的文字
  nextText: string
  // 完成按钮的文字
  completeText: string
  // 是否显示信息框内的指示器
  showIndicator: boolean
  // 高亮元素和信息框的z-index
  zIndex: number
  // 是否使用自定义的信息框，如果开启，需要传递getCustomInfoEl选项
  useCustomInfo: boolean
  // 返回自定义信息框元素
  getCustomInfoEl: GetCustomInfoEl
  // 步骤数据
  steps: Array<Step>
}

// 默认配置
const defaultOptions: DefaultOptions = {
  padding: 10,
  margin: 10,
  boxShadowColor: 'rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease-out',
  borderRadius: '5px',
  highlightElClass: '',
  backgroundColor: '#fff',
  infoElClass: '',
  prevText: '上一步',
  nextText: '下一步',
  completeText: '完成',
  showIndicator: true,
  zIndex: 9999,
  useCustomInfo: false,
  getCustomInfoEl: null,
  steps: []
}

// 入口类
class NoviceGuide extends EventEmitter {
  public steps: Steps
  public currentStepIndex: number
  public infoElement: any
  public highlightElement: HighlightElement
  public addedCss: boolean
  constructor(public options: Options) {
    super()
    // 选项，合并默认配置和传入的配置参数
    this.options = Object.assign(defaultOptions, options)
    // 步骤数据
    this.steps = []
    // 当前步骤
    this.currentStepIndex = -1
    //  实例化辅助类
    this.infoElement = new infoElement(this) // 信息元素框
    this.highlightElement = new HighlightElement(this) // 高亮元素类
    // 初始化步骤数据
    this.initSteps()
  }

  // 初始化步骤数据
  initSteps() {
    this.options.steps.forEach(step => {
      // element为 类名 ｜ id，选择，直接为元素的话，不用处理
      this.steps.push({
        ...step,
        element:
          typeof step.element === 'string'
            ? document.querySelector(step.element)
            : step.element
      })
    })
  }

  // 开始
  start() {
    if (this.steps.length <= 0) return
    // 添加样式到元素上
    if (!this.addedCss) {
      addCss()
      // 第一次添加就行，修改状态
      this.addedCss = true
    }
    this.next()
  }

  // 下一步
  next() {
    this.emit('before-step-change', this.currentStepIndex)
    if (this.currentStepIndex + 1 >= this.steps.length) {
      return this.done()
    }
    this.currentStepIndex++
    this.to(this.currentStepIndex)
  }

  //上一步
  prev() {
    this.emit('before-step-change', this.currentStepIndex)
    if (this.currentStepIndex - 1 < 0) {
      return
    }
    this.currentStepIndex--
    this.to(this.currentStepIndex)
  }

  // 跳转到指定一步
  jump(stepIndex: number) {
    this.currentStepIndex = stepIndex
    this.to(stepIndex)
  }

  // 到某一步
  async to(stepIndex: number) {
    const currentStep = this.steps[stepIndex]
    // 没有元素不需要处理滚动
    if (currentStep.element) {
      scrollAncestorToElement(currentStep.element)
      const rect = currentStep.element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // 如果不在可见区域内，就滚动到可见区域
      if (!elementIsInView(currentStep.element)) {
        window.scrollBy(0, rect.top - (windowHeight - rect.height) / 2)
      }
    }
    this.highlightElement.show(currentStep)
    await this.infoElement.show(currentStep)
    this.emit('after-step-change', stepIndex)
  }

  // 结束
  done() {
    this.emit('before-step-change', this.currentStepIndex)
    // 移除元素
    this.highlightElement.removeEl()
    this.infoElement.removeEl()
    // 移除设置的 类 style元素下的
    removeCss()
    // 重置类名状态
    this.addedCss = false
    // 重置当前元素标签
    this.currentStepIndex = -1
    // this.emit('after-step-change', this.currentStepIndex)
    this.emit('done')
  }

  // 是否是第一步
  isFirstStep() {
    return this.currentStepIndex <= 0
  }

  // 是否是最后一步
  isLastStep() {
    return this.currentStepIndex >= this.steps.length - 1
  }
}

export default NoviceGuide
