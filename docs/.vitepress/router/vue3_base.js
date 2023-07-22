// vue3学习笔记
export const vue3_study_router = {
  text: "vue3学习笔记📖",
  collapsible: true, // 显示了一个切换按钮来隐藏/显示每个分组
  collapsed: true, //  默认 true 收缩
  items: [
    // 基础
    {
      text: "vue3基础",
      items: [
        { text: "注意点", link: "/pages/vue3-base/basic/note" },
        { text: "reactive", link: "/pages/vue3-base/basic/reactive" },
        { text: "ref", link: "/pages/vue3-base/basic/ref" },
        { text: "v-model", link: "/pages/vue3-base/basic/v-model" },
        { text: "计算属性和侦听器", link: "/pages/vue3-base/basic/computed" },
      ],
    },
    // 组件
    {
      text: "vue3组件",
      items: [
        {
          text: "组件的一些注意点",
          link: "/pages/vue3-base/components/componentNote",
        },
        { text: "组件注册", link: "/pages/vue3-base/components/reg" },
        { text: "组件插槽", link: "/pages/vue3-base/components/slot" },
        { text: "依赖注入", link: "/pages/vue3-base/components/provide" },
      ],
    },
    // 核心
    {
      text: "vue 核心💪",
      items: [
        {
          text: "响应式原理",
          link: "/pages/vue3-base/vueCore/responsivePrinciples",
        },
        {
          text: "虚拟dom",
          link: "/pages/vue3-base/vueCore/virtualDom",
        },
        {
          text: "diff算法",
          link: "/pages/vue3-base/vueCore/diff",
        },
      ],
    },
  ],
};
